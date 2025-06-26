package com.menura.ideaboardbackend.controller;

import com.menura.ideaboardbackend.model.Idea;
import com.menura.ideaboardbackend.service.IdeaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
public class IdeaController {
    private final IdeaService ideaService;

    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @GetMapping
    public List<Idea> getAllIdeas (){
        return ideaService.getAllIdeas();
    }

    @PostMapping
    public ResponseEntity<Idea> createIdea (@Valid @RequestBody Idea idea){
        return ResponseEntity.ok(ideaService.createIdea(idea));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idea> updateIdea (@PathVariable Long id, @Valid @RequestBody Idea idea){
        return ResponseEntity.ok(ideaService.updateIdea(id,idea));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIdea (@PathVariable Long id){
        ideaService.deleteIdea(id);
        return ResponseEntity.noContent().build();
    }
}
