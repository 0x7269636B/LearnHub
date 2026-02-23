package com.learnhub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnhub.model.Course;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // rollback - to not save the test;s dumb data
class LearnHubApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void contextLoads() {
    }

    @Test
    void ReturnDashboardStats() throws Exception {
        mockMvc.perform(get("/api/admin/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.students").exists())
                .andExpect(jsonPath("$.teachers").exists())
                .andExpect(jsonPath("$.courses").exists());
    }

    @Test
    void ReturnAllStudents() throws Exception {
        mockMvc.perform(get("/api/admin/students"))
                .andExpect(status().isOk());
    }

    @Test
    void ReturnAllTeachers() throws Exception {
        mockMvc.perform(get("/api/admin/teachers"))
                .andExpect(status().isOk());
    }

    @Test
    void ReturnAllCourses() throws Exception {
        mockMvc.perform(get("/api/admin/courses"))
                .andExpect(status().isOk());
    }

    @Test
    void CreateNewCourse() throws Exception {
        Course testCourse = new Course();
        testCourse.setTitle("Integration Test Course");
        testCourse.setDescription("Testing POST endpoint");
        testCourse.setCategory("Τεχνολογία");
        testCourse.setHoursPerWeek(2);

        String courseJson = objectMapper.writeValueAsString(testCourse);

        mockMvc.perform(post("/api/admin/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(courseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Integration Test Course"));
    }
    @Test
    void ReturnAllEnrollments() throws Exception {
        mockMvc.perform(get("/api/admin/enrollments"))
                .andExpect(status().isOk());
    }

    @Test
    void ReturnAllPayments() throws Exception {
        mockMvc.perform(get("/api/admin/payments"))
                .andExpect(status().isOk());
    }
}