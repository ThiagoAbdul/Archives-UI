
import './home.css'
import { Toolbar } from "../../components/toolbar/toolbar";
import { SideBar } from "../../components/sidebar/sidebar";
import { useArchive } from '../../hooks/useArchive';
import { useEffect, useState } from 'react';
import { Archive } from '../../components/archive/archive';
import { Modal } from '../../components/modal/modal';
import { Input } from '../../components/input/input';
import { useLoader } from '../../contexts/LoaderContext';
import { useFilesFacade } from '../../hooks/useFilesFacade';
import { UploadFileModal } from '../../modals/upload-file-modal/upload-file-modal';
import { openBlobInNewTab } from '../../utils/file-utils';



export function Home(){
  
  const { listArchives, archives, createFolder } = useArchive()
  const { getFile } = useFilesFacade()

  const [showCreateFolderModal, setCreateFolderModalVisibility ] = useState(false)
  const [showUploadFileModal, setUploadFileModalVisibility ] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const { setLoading } = useLoader()

  useEffect(() => {
      setLoading(true)
      listArchives().then(() => {

      })
      .finally(() => setLoading(false))
    
  }, [])


    return (
      <>
      {  
        showCreateFolderModal && <Modal 
          title='Criar nova pasta' 
          primaryButtonText='Criar' 
          primaryAction={async () => {
            setLoading(true)
            try{
              await createFolder(folderName)
              setFolderName("")
              await listArchives()
  
              setCreateFolderModalVisibility(false)
            }
            catch(error){
              console.log(error)
            }
            finally{
              setLoading(false)
            }
          }}
          secondaryButtonText='Cancelar'
          secondaryAction={() => {
            setCreateFolderModalVisibility(false)
            setFolderName("")
          }
            } >
            <Input label='Nome da pasta' value={folderName} onChange={e => setFolderName(e.target.value)} />
        </Modal>
      }

      { showUploadFileModal && <UploadFileModal 
                                file={fileToUpload!}
                                onFileUploaded={fileId => setUploadFileModalVisibility(false) } 
                                onCancel={() => setUploadFileModalVisibility(false)} /> }

      <div className='background'>
        <Toolbar />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SideBar 
            onClickNewFolder={() => setCreateFolderModalVisibility(true)} 
            onClickUploadFile={file => {
              setFileToUpload(file);
              setUploadFileModalVisibility(true)
            } }
          />
          <div className="main">
            { archives?.map(archive => <Archive 
              key={archive.ArchiveId} 
              onClick={async () => {
                if(archive.Type == 1){
                  setLoading(true)
                  const response = await getFile(archive.ArchiveId)
                  
                  console.log(response)

                  var blob = await new Response(response.Body as ReadableStream, {
                    headers: {
                      "Content-Type": response.ContentType!
                    }
                  }).blob()
                  openBlobInNewTab(blob)
                  setLoading(false)
                }
              }}
              {...archive}   /> ) }
          </div>
        </div>


      </div>
      </>
    )
}