package com.klef.soa.bookstore.service.impl;
import com.klef.soa.bookstore.entity.Bookstore;
import com.klef.soa.bookstore.repository.BookstoreRepository;
import com.klef.soa.bookstore.service.BookstoreService;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class BookstoreServiceImpl implements BookstoreService {
 private final BookstoreRepository repository;
 public BookstoreServiceImpl(BookstoreRepository repository){this.repository=repository;}
 public Bookstore addBookstore(Bookstore b){b.setId(null);return repository.save(b);}
 public List<Bookstore> getAllBookstores(){return repository.findAll();}
 public Optional<Bookstore> getBookstoreById(Long id){return repository.findById(id);}
 public Optional<Bookstore> updateBookstore(Long id,Bookstore b){return repository.findById(id).map(e->{e.setStoreName(b.getStoreName());e.setLocation(b.getLocation());e.setPhone(b.getPhone());e.setOpen(b.getOpen());return repository.save(e);});}
 public boolean deleteBookstore(Long id){if(!repository.existsById(id))return false;repository.deleteById(id);return true;}
}