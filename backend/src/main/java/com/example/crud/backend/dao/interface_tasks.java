package com.example.crud.backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.crud.backend.model.Tasks;

public interface interface_tasks extends JpaRepository<Tasks, Long>{
    
}