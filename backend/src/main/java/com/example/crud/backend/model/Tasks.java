package com.example.crud.backend.model;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "tasks")
public class Tasks {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "nome", length = 200, nullable = false)
  private String nome;

  @Column(name = "data_criacao", nullable = false, updatable = false)
  private LocalDateTime dataCriacao;

  public void setId(Long id2) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'setId'");
  }




}