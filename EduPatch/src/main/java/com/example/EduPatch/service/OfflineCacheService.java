package com.example.EduPatch.service;

import com.example.EduPatch.entity.OfflineCache;
import com.example.EduPatch.repository.OfflineCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OfflineCacheService {

    @Autowired
    private OfflineCacheRepository offlineCacheRepository;

    public List<OfflineCache> getAllCaches() {
        return offlineCacheRepository.findAll();
    }
    public Optional<OfflineCache> getCacheById(String cacheId) {
        return offlineCacheRepository.findById(cacheId);
    }
    public List<OfflineCache> getCachesByUserId(String userId) {
        return offlineCacheRepository.findByUserId(userId);
    }

    public OfflineCache downloadPage(String userId, String pageId, String content) {
        OfflineCache cache = offlineCacheRepository.findByUserIdAndPageId(userId, pageId);
        if (cache == null) {
            cache = new OfflineCache();
            cache.setUserId(userId);
            cache.setPageId(pageId);
        }
        cache.setDownloadedAt(LocalDateTime.now());
        cache.setContent(content);
        return offlineCacheRepository.save(cache);
    }
    public void deleteCache(String cacheId) {
        offlineCacheRepository.deleteById(cacheId);
    }
}
