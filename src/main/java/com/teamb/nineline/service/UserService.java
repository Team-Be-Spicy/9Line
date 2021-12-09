package com.teamb.nineline.service;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
public class UserService {

    public static final String TOKEN_URL = "https://dev-h1uk-ini.us.auth0.com/oauth/token";
    private static final String URL = "https://dev-h1uk-ini.us.auth0.com/api/v2/roles/rol_r87x1naigNldzIht/users";
    public static final String API_CLIENT_ID = "bX0BDzGV5WpHl65fT2nZQgJCeN6mRyTy";

    @Value("${auth0.clientSecret}")
    private String CLIENT_SECRET;

    public String getResponders() {
        try {
            return executeGetResponders();
        } catch (IOException e) {
            System.out.println("Error: cannot access content - " + e.toString());
        } catch (URISyntaxException e) {
            System.out.println("Error: Invalid URL " + e.toString());
        }
        return "";
    }

    private String executeGetResponders() throws URISyntaxException, IOException {
        String response_content = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet request = new HttpGet(new URIBuilder(URL).build());

        // add headers
        request.addHeader(HttpHeaders.ACCEPT, "application/json");
        String key = "Bearer " + getManagementApiToken();
        request.addHeader(HttpHeaders.AUTHORIZATION, key);

        try (CloseableHttpResponse response = client.execute(request)) {
            HttpEntity entity = response.getEntity();
            response_content = EntityUtils.toString(entity);
            EntityUtils.consume(entity);
        }

        return response_content;
    }


    private String getManagementApiToken() throws IOException {
        String response_content = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost request = new HttpPost(TOKEN_URL);

        String json = "{\"client_id\":\"" + API_CLIENT_ID + "\"," +
                "\"client_secret\":\"" + CLIENT_SECRET + "\"," +
                "\"audience\":\"https://dev-h1uk-ini.us.auth0.com/api/v2/\"," +
                "\"grant_type\":\"client_credentials\"}";

        StringEntity params = new StringEntity(json);
        params.setContentType("application/json");
        request.setEntity(params);

        // add headers
        request.addHeader(HttpHeaders.ACCEPT, "application/json");

        try (CloseableHttpResponse response = client.execute(request)) {
            HttpEntity entity = response.getEntity();
            response_content = EntityUtils.toString(entity);
            EntityUtils.consume(entity);
        }

        // Trim response to get the actual token
        return response_content.split("\"access_token\":\"")[1].split("\"")[0];
    }

}
