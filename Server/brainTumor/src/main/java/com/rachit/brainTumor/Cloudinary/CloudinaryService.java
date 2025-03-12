package com.rachit.brainTumor.Cloudinary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {

    public String uploadFile(MultipartFile file, String folderName);
}
