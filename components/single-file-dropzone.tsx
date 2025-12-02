"use client";
 
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneTrigger,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  InfiniteProgress,
  useDropzone,
} from "@/components/ui/dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { imageUploadRequest } from "@/actions/uploader.action";
import {nanoid} from 'nanoid'
import axios, {Axios} from 'axios'
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";


export function SingleFileDropzone({ currentAvatarSrc }: { currentAvatarSrc: string }) {
  const [avatarSrc, setAvatarSrc] = useState(currentAvatarSrc);
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      
      // Orijinal dosya uzantısını al
      const fileExtension = file.name.split('.').pop() || '';

      
      // Yeni benzersiz dosya adı oluştur
      const newFileName = `${nanoid(6)}.${fileExtension}`;
      
      // Yeni File objesi oluştur (File objesi readonly olduğu için)
      const renamedFile = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });

      
      const {success, error, signedUrl, publicUrl} = await imageUploadRequest({
        imageSize: renamedFile.size,
        imageName: renamedFile.name,
        imageType: renamedFile.type,
      });

      console.log(signedUrl,publicUrl,success)

      if (success){ 
          const promise = axios.put(signedUrl, renamedFile, {
            headers: {
              "Content-Type": renamedFile.type,
            },
          })
          toast.promise(promise, {
            loading: "Yükleniyor...",
            success: () => {
              setAvatarSrc(publicUrl ?? "");
              console.log(avatarSrc)
              return 'Güncellendi...';
            },
            error: "Hata var.."
          })
          
      }


      return {
        status: "success",
        result: URL.createObjectURL(renamedFile),
        fileName: renamedFile.name,
        file: renamedFile,
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 2 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });

  const isPending = dropzone.fileStatuses[0]?.status === "pending";

  return (
    <Dropzone {...dropzone}>
      <div className="flex justify-between">
        <DropzoneMessage />
      </div>
      <DropZoneArea className="flex justify-baseline ">
        <DropzoneTrigger className="flex gap-8 bg-transparent text-sm">
          <Avatar className={cn(isPending && "animate-pulse")}>
            <AvatarImage className="object-cover" src={avatarSrc} />
            <AvatarFallback>NON</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 font-semibold">
            <p>Avatar Resmini değiştir</p>
            <p className="text-xs text-muted-foreground">
              Max:2Mb, Türü: PNG, JPG, JPEG
            </p>
          </div>
        </DropzoneTrigger>
      </DropZoneArea>
    </Dropzone>
  );
}