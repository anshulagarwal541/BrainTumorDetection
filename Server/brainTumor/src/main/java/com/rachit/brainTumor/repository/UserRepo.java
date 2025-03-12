package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    User findByEmail(String email);
    @Query(value = "SELECT * FROM \"user\" u WHERE u.roles @> ARRAY[:role]::varchar[]", nativeQuery = true)
    List<User> findAllByRoles(@Param("role") String role);
}
