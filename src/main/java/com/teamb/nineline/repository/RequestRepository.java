package com.teamb.nineline.repository;

import com.teamb.nineline.model.Request;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RequestRepository extends PagingAndSortingRepository <Request, Long> {

    Iterable<Request> findAllByResponder(String responder);
}
