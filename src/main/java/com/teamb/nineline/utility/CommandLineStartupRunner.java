package com.teamb.nineline.utility;

import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Profile("!test")
@Component
@AllArgsConstructor
public class CommandLineStartupRunner implements CommandLineRunner {
    private final RequestRepository requestRepository;

    private final SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

    @Override
    public void run(String... args) throws Exception {
        requestRepository.save(new Request(1L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", new Date()));
        requestRepository.save(new Request(2L, "Osprey 2-5", "43SBR3999691017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Pending", new Date()));
        requestRepository.save(new Request(3L, "Osprey 3-4", "43SBR4999641017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", new Date()));
        requestRepository.save(new Request(4L, "Osprey 4-5", "43SBR6999611017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Assigned", new Date()));
        requestRepository.save(new Request(5L, "Osprey 5-5", "43SBR8289621017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Pending", new Date()));
        requestRepository.save(new Request(6L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", new Date()));
        requestRepository.save(new Request(7L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(8L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(9L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-02-2021")));
        requestRepository.save(new Request(10L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-02-2021")));
        requestRepository.save(new Request(11L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-02-2021")));
        requestRepository.save(new Request(12L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(13L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("03-03-2021")));
        requestRepository.save(new Request(14L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-04-2021")));
        requestRepository.save(new Request(15L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-04-2021")));
        requestRepository.save(new Request(16L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-04-2021")));
        requestRepository.save(new Request(17L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-04-2021")));
        requestRepository.save(new Request(18L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("03-03-2021")));
        requestRepository.save(new Request(19L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(20L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(21L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-01-2021")));
        requestRepository.save(new Request(22L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-05-2021")));
        requestRepository.save(new Request(23L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-05-2021")));
        requestRepository.save(new Request(24L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-05-2021")));
        requestRepository.save(new Request(25L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-06-2021")));
        requestRepository.save(new Request(26L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("02-06-2021")));
        requestRepository.save(new Request(27L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-07-2021")));
        requestRepository.save(new Request(28L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("03-07-2021")));
        requestRepository.save(new Request(29L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-07-2021")));
        requestRepository.save(new Request(30L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-07-2021")));
        requestRepository.save(new Request(31L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-07-2021")));
        requestRepository.save(new Request(32L, "Osprey 3-4", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("04-08-2021")));
        requestRepository.save(new Request(33L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("03-08-2021")));
        requestRepository.save(new Request(34L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-09-2021")));
        requestRepository.save(new Request(35L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-10-2021")));
        requestRepository.save(new Request(36L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-10-2021")));
        requestRepository.save(new Request(37L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-11-2021")));
        requestRepository.save(new Request(38L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-11-2021")));
        requestRepository.save(new Request(39L, "Osprey 1-2", "43SBR1999651017", "53.80 ThunderStruck 2-1 A6B88", 1, 2, 3, 4, "Hoist", 1, 0, "VS 17 panel", "No enemy troops", "US/Coalition Military", "Nuclear", "Complete", format.parse("01-11-2021")));
    }
}