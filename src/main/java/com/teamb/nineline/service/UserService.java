package com.teamb.nineline.service;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private static final String URL = "https://dev-h1uk-ini.us.auth0.com/api/v2/roles/rol_r87x1naigNldzIht/users";
    public static final String KEY = "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBkemZNcW1pQlo4RDJoekVpRldLMSJ9.eyJpc3MiOiJodHRwczovL2Rldi1oMXVrLWluaS51cy5hdXRoMC5jb20vIiwic3ViIjoiYlgwQkR6R1Y1V3BIbDY1ZlQyblpRZ0pDZU42bVJ5VHlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWgxdWstaW5pLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM5MDY4MDI1LCJleHAiOjE2Mzk1MDAwMjUsImF6cCI6ImJYMEJEekdWNVdwSGw2NWZUMm5aUWdKQ2VONm1SeVR5Iiwic2NvcGUiOiJyZWFkOnVzZXJzIHJlYWQ6cm9sZXMgcmVhZDpyb2xlX21lbWJlcnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.lhYolYosnVyPyKNvhBenEkXbktXtMnkeyGXp-H4AgGHExAookABY-hn7RFzzSlBfETV3aQagiWVf0YAJS8SJp3AwMQBPx-MWaZy07qA4g7UGXoepqgXJf67p9KDCUG92sjUMuDygsPK4BEpH6Dk0YFfBE-yzNky0fnF5kpu4fU3Xtjx-C45lDunhDXTlwqslSI4-qkXDl4XlMdMvV8aCRay_MEFb4CVzquKtlUnzct-vvuDqh2rgaLqwal3hv4ZYU7EXjil5LhWP1XoyeYIRFY8foL39Ude4IGWL5G2E6cyPD4Bk4WfNBaUgcTBCVWtJwCLm48Rlel4jWOMwYUUUDQ";

    public String getResponders() {
        try {
            return makeCall();
        } catch (IOException e) {
            System.out.println("Error: cannot access content - " + e.toString());
        } catch (URISyntaxException e) {
            System.out.println("Error: Invalid URL " + e.toString());
        }
        return "";
    }

    private String makeCall() throws URISyntaxException, IOException {
        String response_content = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet request = new HttpGet(new URIBuilder(URL).build());

        // add headers
        request.addHeader(HttpHeaders.ACCEPT, "application/json");
        request.addHeader(HttpHeaders.AUTHORIZATION, KEY);

        try (CloseableHttpResponse response = client.execute(request)) {
            System.out.println(response.getStatusLine());
            HttpEntity entity = response.getEntity();
            response_content = EntityUtils.toString(entity);
            EntityUtils.consume(entity);
        }

        return response_content;
    }
}
