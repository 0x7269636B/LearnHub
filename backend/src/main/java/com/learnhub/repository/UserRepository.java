package com.learnhub.repository;

import com.learnhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ΣΩΣΤΟ: Δηλώνουμε Τύπο Επιστροφής - Όνομα Μεθόδου - (Τύπο Παραμέτρου Όνομα Παραμέτρου)
    Optional<User> findByEmail(String email);

    // ΣΩΣΤΟ: Ελέγχει αν υπάρχει
    boolean existsByEmail(String email);
}