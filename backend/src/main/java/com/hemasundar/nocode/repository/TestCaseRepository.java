package com.hemasundar.nocode.repository;

import com.hemasundar.nocode.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
}
