
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
import { FileTypes } from '../../consts/file-types';
import { useNavigate, useParams } from 'react-router-dom';



export function Home() {

  const { listArchives, archives, setArchives } = useArchive()
  const { getFile } = useFilesFacade()

  const [showCreateFolderModal, setCreateFolderModalVisibility] = useState(false)
  const [showUploadFileModal, setUploadFileModalVisibility] = useState(false)
  const [showBatchUploadModal, setBatchUploadModalVisibility] = useState(false)
  const [zip, setZip] = useState<Blob | null>(null)

  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const navigate = useNavigate();

  const { setLoading } = useLoader()

  const { folder } = useParams()

  useEffect(() => {
    setLoading(true)
    listArchives(folder).then(() => {

    })
      .finally(() => setLoading(false))

  }, [folder])

  return (
    <>
      {
        showCreateFolderModal && <CreateFolderModal
          parent={folder}
          onCancel={() => setCreateFolderModalVisibility(false)}
          onCreateFolder={folder => {
            setArchives(x => x?.concat({
              ArchiveId: folder.id,
              Name: folder.name,
              Favorite: false,
              Type: FileTypes.FOLDER,
              UserId: ""
            }))
            setCreateFolderModalVisibility(false)
          }}
        />
      }

      {showUploadFileModal && <UploadFileModal
        file={fileToUpload!}
        onFileUploaded={archive => {
          setArchives(x => x?.concat(archive))
          setUploadFileModalVisibility(false)
        }}
        onCancel={() => setUploadFileModalVisibility(false)} />
      }

      {
        showBatchUploadModal
        && <BatchUploadModal
          onCancel={() => setBatchUploadModalVisibility(false)}
          onUpload={archive => {
            setArchives(x => x?.concat(archive))

            setBatchUploadModalVisibility(false)
          }}
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
            }}
            onClickArchiveFiles={zip => {
              setZip(zip)
              setBatchUploadModalVisibility(true)
            }}
          />
          <div className="main">
            {archives?.map(archive => <Archive
              key={archive.ArchiveId}
              onClick={async () => {
                if (archive.Type > 0) {
                  setLoading(true)
                  const response = await getFile(archive.ArchiveId)

                  var blob = await new Response(response.Body as ReadableStream, {
                    headers: {
                      "Content-Type": response.ContentType!
                    }
                  }).blob()

                  if (archive.Type == 1) {
                    openBlobInNewTab(blob)
                  }
                  if (archive.Type == 3) {
                    downloadBlob(blob, archive.Name)
                  }

                  setLoading(false)
                }
                else if (archive.Type == 0) {
                  navigate(`/home/${archive.ArchiveId}`)
                }
              }}
              {...archive} />)}
          </div>
        </div>


      </div>
    </>
  )
}