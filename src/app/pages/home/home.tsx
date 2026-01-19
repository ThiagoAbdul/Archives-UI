
import './home.css'
import { Toolbar } from "../../components/toolbar/toolbar";
import { SideBar } from "../../components/sidebar/sidebar";
import { useArchive } from '../../hooks/useArchive';
import { useEffect, useState } from 'react';
import { Archive } from '../../components/archive/archive';
import { useLoader } from '../../contexts/LoaderContext';
import { useFilesFacade } from '../../hooks/useFilesFacade';
import { UploadFileModal } from '../../modals/upload-file-modal/upload-file-modal';
import { downloadBlob, openBlobInNewTab } from '../../utils/file-utils';
import { CreateFolderModal } from '../../modals/create-folder-modal/create-folder-modal';
import { BatchUploadModal } from '../../modals/batch-upload-modal/batch-upload-modal';



export function Home(){
  
  const { listArchives, archives } = useArchive()
  const { getFile } = useFilesFacade()

  const [showCreateFolderModal, setCreateFolderModalVisibility ] = useState(false)
  const [showUploadFileModal, setUploadFileModalVisibility ] = useState(false)
  const [showBatchUploadModal, setBatchUploadModalVisibility ] = useState(false)
  const [zip, setZip] = useState<Blob | null>(null)

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
        showCreateFolderModal && <CreateFolderModal 
            onCancel={() => setCreateFolderModalVisibility(false)} 
            onCreateFolder={() => { listArchives(); setCreateFolderModalVisibility(false) }}
            />
      }

      { showUploadFileModal && <UploadFileModal 
                                file={fileToUpload!}
                                onFileUploaded={fileId => setUploadFileModalVisibility(false) } 
                                onCancel={() => setUploadFileModalVisibility(false)} /> 
      }

      {
        showBatchUploadModal 
        && <BatchUploadModal 
          onCancel={() => setBatchUploadModalVisibility(false)}  
          onUpload={() => { listArchives(); setBatchUploadModalVisibility(false) } }
          zip={zip!}
          />
      }        

      <div className='background'>
        <Toolbar />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SideBar 
            onClickNewFolder={() => setCreateFolderModalVisibility(true)} 
            onClickUploadFile={file => {
              setFileToUpload(file);
              setUploadFileModalVisibility(true)
            } }
            onClickArchiveFiles={zip => {
              setZip(zip)
              setBatchUploadModalVisibility(true)
            }}
          />
          <div className="main">
            { archives?.map(archive => <Archive 
              key={archive.ArchiveId} 
              onClick={async () => {
                if(archive.Type > 0){
                  setLoading(true)
                  const response = await getFile(archive.ArchiveId)
                  
                  var blob = await new Response(response.Body as ReadableStream, {
                    headers: {
                      "Content-Type": response.ContentType!
                    }
                  }).blob()

                  if(archive.Type == 1){
                    openBlobInNewTab(blob)
                  }
                  if(archive.Type == 3){
                    downloadBlob(blob, archive.Name)
                  }

                  setLoading(false)
                }
                else if(archive.Type == 0){

                }
              }}
              {...archive}   /> ) }
          </div>
        </div>


      </div>
      </>
    )
}