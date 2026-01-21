import JSZip from "jszip";

export function openBlobInNewTab(blob: Blob){
    const url = URL.createObjectURL(blob)

    window.open(url, "_blank")

    setTimeout(() => URL.revokeObjectURL(url), 20_000)
}

export async function zipFileList(files: FileList): Promise<Blob> {
  const zip = new JSZip();

  Array.from(files).forEach(file => {
    zip.file(file.name, file);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function isVideo(file: File){
  return file.type.startsWith("video")
}

export function isImage(file: File){
  return file.type.startsWith("image")
}