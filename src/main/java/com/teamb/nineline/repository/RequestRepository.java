package com.teamb.nineline.repository;

import com.teamb.nineline.model.Request;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RequestRepository extends PagingAndSortingRepository <Request, Long> {

    List<Request> findAllByStatus(String status);
    Iterable<Request> findAllByResponder(String responder);
}
