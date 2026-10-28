package com.klef.soa.bookstore.service;
import com.klef.soa.bookstore.entity.Bookstore;
import java.util.*;
public interface BookstoreService {
 Bookstore addBookstore(Bookstore b); List<Bookstore> getAllBookstores(); Optional<Bookstore> getBookstoreById(Long id);
 Optional<Bookstore> updateBookstore(Long id,Bookstore b); boolean deleteBookstore(Long id);
}