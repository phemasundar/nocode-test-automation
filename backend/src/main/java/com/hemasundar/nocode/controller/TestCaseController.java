package com.hemasundar.nocode.controller;

import com.hemasundar.nocode.model.TestCase;
import com.hemasundar.nocode.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/v1/testcases")
public class TestCaseController {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @PostMapping("/")
    public TestCase createTestCase(@RequestBody TestCase testCase) {
        testCase.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return testCaseRepository.save(testCase);
    }

    @GetMapping("/")
    public List<TestCase> getAllTestCases() {
        return testCaseRepository.findAll();
    }

    @GetMapping("/{id}")
    public TestCase getTestCaseById(@PathVariable Long id) {
        return testCaseRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteTestCase(@PathVariable Long id) {
        testCaseRepository.deleteById(id);
    }
}
