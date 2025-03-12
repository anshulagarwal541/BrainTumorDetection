package com.rachit.brainTumor.Cloudinary;

import com.rachit.brainTumor.models.ImageModel;
import com.rachit.brainTumor.models.MRIScans;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.repository.MRIScansRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private MRIScansRepo imageRepository;


    @Override
    public ResponseEntity<String> uploadImage(ImageModel imageModel, UserInfo userInfo) {
        try {
            if (imageModel.getName().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (imageModel.getFile().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            MRIScans image = new MRIScans();
            image.setName(imageModel.getName());
            image.setUserInfo(userInfo);
            image.setUrl(cloudinaryService.uploadFile(imageModel.getFile(), "BrainTumorDetection"));
            if(image.getUrl() == null) {
                return ResponseEntity.badRequest().build();
            }
            imageRepository.save(image);
            return ResponseEntity.ok().body(image.getUrl());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }
}