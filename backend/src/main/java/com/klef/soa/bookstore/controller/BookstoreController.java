package com.klef.soa.bookstore.controller;
import com.klef.soa.bookstore.entity.Bookstore;
import com.klef.soa.bookstore.service.BookstoreService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/bookstores") @CrossOrigin(origins="*")
public class BookstoreController {
 private final BookstoreService service;
 public BookstoreController(BookstoreService service){this.service=service;}
 @PostMapping public ResponseEntity<Bookstore> add(@Valid @RequestBody Bookstore b){return ResponseEntity.status(HttpStatus.CREATED).body(service.addBookstore(b));}
 @GetMapping public List<Bookstore> all(){return service.getAllBookstores();}
 @GetMapping("/{id}") public ResponseEntity<Bookstore> one(@PathVariable Long id){return service.getBookstoreById(id).map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());}
 @PutMapping("/{id}") public ResponseEntity<Bookstore> update(@PathVariable Long id,@Valid @RequestBody Bookstore b){return service.updateBookstore(id,b).map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());}
 @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){return service.deleteBookstore(id)?ResponseEntity.noContent().build():ResponseEntity.notFound().build();}
}