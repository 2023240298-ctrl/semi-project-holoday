package com.holoday.api.common.file;

import com.holoday.api.common.exception.FileUploadException;
import com.holoday.api.common.file.dto.FileDTO;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@Slf4j
public class FileUtil {
    private final Path uploadPath;

    public FileUtil(
            @Value("${com.holoday.api.upload.path}") String uploadPath
    ) {
        this.uploadPath = Paths.get(uploadPath).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init(){
        try{
            Files.createDirectories(uploadPath);
        } catch (IOException io){
            throw new IllegalStateException("업로드 디렉터리 초기화에 실패했습니다.", io);
        }
    }

    public FileDTO  saveFile(MultipartFile file){

        if(file == null || file.isEmpty()){
            return null;
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()){
            throw new FileUploadException("업로드할 파일명이 존재하지 않습니다.");
        }

        String cleanFilename = Paths.get(originalFilename).getFileName().toString();
        String savedName = UUID.randomUUID() + "_" + cleanFilename;

        Path savePath = uploadPath.resolve(savedName).normalize();
        if(!savePath.startsWith(uploadPath)){
            throw new FileUploadException("올바르지 않은 파일 저장 경로입니다.");
        }

        String thumbnailName = null;

        try {
            Files.copy(file.getInputStream(),savePath);

            String contentType = file.getContentType();

            if (contentType != null && contentType.startsWith("image/")){
                thumbnailName = "s_" + savedName;

                Path thumbnailPath =
                        uploadPath.resolve(thumbnailName).normalize();

                Thumbnails.of(savePath.toFile())
                        .size(300,200)
                        .toFile(thumbnailPath.toFile());
            }
            return new FileDTO(savedName,thumbnailName);
        } catch (IOException io){
            throw new FileUploadException("파일을 저장하는 중 오류가 발생했습니다." +io);
        }

    }
    public void deleteFile(String fileName) {

        if (fileName == null || fileName.isBlank()) {
            return;
        }

        try {
            Path filePath = uploadPath.resolve(fileName).normalize();

            if (!filePath.startsWith(uploadPath)) {
                throw new FileUploadException(
                        "올바르지 않은 파일 삭제 경로입니다."
                );
            }

            Files.deleteIfExists(filePath);



        } catch (IOException io) {
            throw new FileUploadException(
                    "파일을 삭제하는 중 오류가 발생했습니다." + io
            );
        }
    }





}
