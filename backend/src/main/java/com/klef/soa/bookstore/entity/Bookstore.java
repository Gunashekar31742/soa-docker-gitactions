package com.klef.soa.bookstore.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
@Entity
@Table(name="bookstores")
public class Bookstore {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank(message="Store name is required") private String storeName;
 @NotBlank(message="Location is required") private String location;
 @NotBlank(message="Phone is required") @Pattern(regexp="^[0-9+()\\- ]{7,20}$", message="Enter a valid phone number") private String phone;
 private Boolean open;
 public Bookstore() {}
 public Bookstore(Long id,String storeName,String location,String phone,Boolean open) { this.id=id; this.storeName=storeName; this.location=location; this.phone=phone; this.open=open; }
 public Long getId(){return id;} public void setId(Long id){this.id=id;}
 public String getStoreName(){return storeName;} public void setStoreName(String storeName){this.storeName=storeName;}
 public String getLocation(){return location;} public void setLocation(String location){this.location=location;}
 public String getPhone(){return phone;} public void setPhone(String phone){this.phone=phone;}
 public Boolean getOpen(){return open;} public void setOpen(Boolean open){this.open=open;}
}