package com.example.crud.backend.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.backend.dao.interface_tasks;
import com.example.crud.backend.model.Tasks;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin("*")
@RequestMapping("/tasks")
public class TasksController {

    @Autowired
    private interface_tasks dao;

    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

        @PostMapping
    @Transactional
    public Tasks criarUsuario (@RequestBody Tasks tasks){
        Tasks newTask = dao.save(tasks);
        return newTask;
    } 

        @PutMapping("/{id}")
    @Transactional
    public Tasks editarUsuario(@PathVariable Long id, @RequestBody Tasks tasks){
      tasks.setId(id);
      return dao.save(tasks);

      }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Tasks> deletarUsuario(@PathVariable Long id){
      Optional<Tasks> tasks = dao.findById(id);

      if (tasks.isEmpty()){
        return ResponseEntity.notFound().build();

      }

      dao.deleteById(id);
      return ResponseEntity.ok(tasks.get());
    }
 }
    

