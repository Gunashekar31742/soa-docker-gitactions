package com.klef.soa.bookstore.repository;
import com.klef.soa.bookstore.entity.Bookstore;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookstoreRepository extends JpaRepository<Bookstore,Long> {}