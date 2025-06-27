package com.menura.ideaboardbackend.service;

import com.menura.ideaboardbackend.model.Idea;
import com.menura.ideaboardbackend.repository.IdeaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;

    public IdeaService(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    public List<Idea> getAllIdeas(){
        return ideaRepository.findAllByOrderByCreatedAtDesc();
    }

    public Idea createIdea(Idea idea){
        return ideaRepository.save(idea);
    }

    public Idea updateIdea (Long id, Idea updateIdea){
        Idea extintIdea = ideaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Idea not found"));
        extintIdea.setTitle(updateIdea.getTitle());
        extintIdea.setDescription(updateIdea.getDescription());
        extintIdea.setCreatedAt(LocalDateTime.now());
        return  ideaRepository.save(extintIdea);
    }

    public void deleteIdea (Long id){
        ideaRepository.deleteById(id);
    }
}
