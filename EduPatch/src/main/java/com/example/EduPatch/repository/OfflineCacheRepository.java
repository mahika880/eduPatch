package com.example.EduPatch.repository;

import com.example.EduPatch.entity.OfflineCache;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfflineCacheRepository extends MongoRepository<OfflineCache , String> {
    List<OfflineCache> findByUserId(String userId);
    List<OfflineCache> findByPageId(String pageId);
    OfflineCache findByUserIdAndPageId(String userId, String pageId);

}
