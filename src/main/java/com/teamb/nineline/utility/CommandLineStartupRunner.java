package com.teamb.nineline.utility;

import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@AllArgsConstructor
public class CommandLineStartupRunner implements CommandLineRunner {
    private final RequestRepository requestRepository;

    @Override
    public void run(String... args) throws Exception {
        requestRepository.save(new Request(1L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, "Urgent", "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", new Date()));
        requestRepository.save(new Request(2L, "Osprey 2-5", "43SBR3999691017", "53.80 ThunderStruck 2-1 A6B88", 1, "Urgent", "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Pending", new Date()));
        requestRepository.save(new Request(3L, "Osprey 3-4", "43SBR4999641017", "53.80 ThunderStruck 2-1 A6B88", 1, "Urgent", "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", new Date()));
        requestRepository.save(new Request(4L, "Osprey 4-5", "43SBR6999611017", "53.80 ThunderStruck 2-1 A6B88", 1, "Urgent", "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Assigned", new Date()));
        requestRepository.save(new Request(5L, "Osprey 5-5", "43SBR8289621017", "53.80 ThunderStruck 2-1 A6B88", 1, "Urgent", "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Pending", new Date()));
    }
}
