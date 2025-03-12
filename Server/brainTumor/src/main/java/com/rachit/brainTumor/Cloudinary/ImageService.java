package com.rachit.brainTumor.Cloudinary;

import com.rachit.brainTumor.models.ImageModel;
import com.rachit.brainTumor.models.UserInfo;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ImageService {

    public ResponseEntity<String> uploadImage(ImageModel imageModel, UserInfo userInfo);
}