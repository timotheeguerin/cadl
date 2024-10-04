// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package com.cadl.response;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceClient;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.exception.ClientAuthenticationException;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceModifiedException;
import com.azure.core.exception.ResourceNotFoundException;
import com.azure.core.http.rest.PagedFlux;
import com.azure.core.http.rest.PagedResponse;
import com.azure.core.http.rest.PagedResponseBase;
import com.azure.core.http.rest.RequestOptions;
import com.azure.core.http.rest.Response;
import com.azure.core.util.BinaryData;
import com.azure.core.util.FluxUtil;
import com.azure.core.util.polling.PollerFlux;
import com.azure.core.util.serializer.TypeReference;
import com.cadl.response.implementation.ResponseClientImpl;
import com.cadl.response.models.OperationDetails1;
import com.cadl.response.models.OperationDetails2;
import com.cadl.response.models.Resource;
import java.util.List;
import java.util.stream.Collectors;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Initializes a new instance of the asynchronous ResponseClient type.
 */
@ServiceClient(builder = ResponseClientBuilder.class, isAsync = true)
public final class ResponseAsyncClient {
    @Generated
    private final ResponseClientImpl serviceClient;

    /**
     * Initializes an instance of ResponseAsyncClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    ResponseAsyncClient(ResponseClientImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * The getBinary operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * BinaryData
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> getBinaryWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getBinaryWithResponseAsync(requestOptions);
    }

    /**
     * The getArray operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * [
     *      (Required){
     *         id: String (Required)
     *         name: String (Required)
     *         description: String (Optional)
     *         type: String (Required)
     *     }
     * ]
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> getArrayWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getArrayWithResponseAsync(requestOptions);
    }

    /**
     * The getAnotherArray operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * [
     *      (Required){
     *         id: String (Required)
     *         name: String (Required)
     *         description: String (Optional)
     *         type: String (Required)
     *     }
     * ]
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> getAnotherArrayWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getAnotherArrayWithResponseAsync(requestOptions);
    }

    /**
     * The createWithHeaders operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     id: String (Required)
     *     name: String (Required)
     *     description: String (Optional)
     *     type: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> createWithHeadersWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.createWithHeadersWithResponseAsync(requestOptions);
    }

    /**
     * The deleteWithHeaders operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> deleteWithHeadersWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.deleteWithHeadersWithResponseAsync(requestOptions);
    }

    /**
     * The most basic operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * boolean
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return whether resource exists along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Boolean>> existsWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.existsWithResponseAsync(requestOptions);
    }

    /**
     * The most basic operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     id: String (Required)
     *     name: String (Required)
     *     description: String (Optional)
     *     type: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param request The request parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link PollerFlux} for polling of long-running operation.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.LONG_RUNNING_OPERATION)
    public PollerFlux<BinaryData, BinaryData> beginLroInvalidPollResponse(BinaryData request,
        RequestOptions requestOptions) {
        return this.serviceClient.beginLroInvalidPollResponseAsync(request, requestOptions);
    }

    /**
     * The most basic operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     id: String (Required)
     *     name: String (Required)
     *     description: String (Optional)
     *     type: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param request The request parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link PollerFlux} for polling of long-running operation.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.LONG_RUNNING_OPERATION)
    public PollerFlux<BinaryData, BinaryData> beginLroInvalidResult(BinaryData request, RequestOptions requestOptions) {
        return this.serviceClient.beginLroInvalidResultAsync(request, requestOptions);
    }

    /**
     * The listStrings operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * String
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the paginated response with {@link PagedFlux}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.COLLECTION)
    public PagedFlux<BinaryData> listStrings(RequestOptions requestOptions) {
        return this.serviceClient.listStringsAsync(requestOptions);
    }

    /**
     * The listIntegers operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * int
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the paginated response with {@link PagedFlux}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.COLLECTION)
    public PagedFlux<BinaryData> listIntegers(RequestOptions requestOptions) {
        return this.serviceClient.listIntegersAsync(requestOptions);
    }

    /**
     * The getJsonUtf8Response operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     id: String (Required)
     *     name: String (Required)
     *     description: String (Optional)
     *     type: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> getJsonUtf8ResponseWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getJsonUtf8ResponseWithResponseAsync(requestOptions);
    }

    /**
     * The getPlusJsonResponse operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     id: String (Required)
     *     name: String (Required)
     *     description: String (Optional)
     *     type: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<BinaryData>> getPlusJsonResponseWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getPlusJsonResponseWithResponseAsync(requestOptions);
    }

    /**
     * The getBinary operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<BinaryData> getBinary() {
        // Generated convenience method for getBinaryWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getBinaryWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }

    /**
     * The getArray operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<List<Resource>> getArray() {
        // Generated convenience method for getArrayWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getArrayWithResponse(requestOptions).flatMap(FluxUtil::toMono)
            .map(protocolMethodData -> protocolMethodData.toObject(TYPE_REFERENCE_LIST_RESOURCE));
    }

    /**
     * The getAnotherArray operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<List<Resource>> getAnotherArray() {
        // Generated convenience method for getAnotherArrayWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getAnotherArrayWithResponse(requestOptions).flatMap(FluxUtil::toMono)
            .map(protocolMethodData -> protocolMethodData.toObject(TYPE_REFERENCE_LIST_RESOURCE));
    }

    /**
     * The createWithHeaders operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Resource> createWithHeaders() {
        // Generated convenience method for createWithHeadersWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return createWithHeadersWithResponse(requestOptions).flatMap(FluxUtil::toMono)
            .map(protocolMethodData -> protocolMethodData.toObject(Resource.class));
    }

    /**
     * The deleteWithHeaders operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return A {@link Mono} that completes when a successful response is received.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Void> deleteWithHeaders() {
        // Generated convenience method for deleteWithHeadersWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return deleteWithHeadersWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }

    /**
     * The most basic operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return whether resource exists on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Boolean> exists() {
        // Generated convenience method for existsWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return existsWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }

    /**
     * The most basic operation.
     * 
     * @param request The request parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the {@link PollerFlux} for polling of long-running operation.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.LONG_RUNNING_OPERATION)
    public PollerFlux<OperationDetails1, Resource> beginLroInvalidPollResponse(Resource request) {
        // Generated convenience method for beginLroInvalidPollResponseWithModel
        RequestOptions requestOptions = new RequestOptions();
        return serviceClient.beginLroInvalidPollResponseWithModelAsync(BinaryData.fromObject(request), requestOptions);
    }

    /**
     * The most basic operation.
     * 
     * @param request The request parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the {@link PollerFlux} for polling of long-running operation.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.LONG_RUNNING_OPERATION)
    public PollerFlux<OperationDetails2, Resource> beginLroInvalidResult(Resource request) {
        // Generated convenience method for beginLroInvalidResultWithModel
        RequestOptions requestOptions = new RequestOptions();
        return serviceClient.beginLroInvalidResultWithModelAsync(BinaryData.fromObject(request), requestOptions);
    }

    /**
     * The listStrings operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the paginated response with {@link PagedFlux}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.COLLECTION)
    public PagedFlux<String> listStrings() {
        // Generated convenience method for listStrings
        RequestOptions requestOptions = new RequestOptions();
        PagedFlux<BinaryData> pagedFluxResponse = listStrings(requestOptions);
        return PagedFlux.create(() -> (continuationTokenParam, pageSizeParam) -> {
            Flux<PagedResponse<BinaryData>> flux = (continuationTokenParam == null)
                ? pagedFluxResponse.byPage().take(1)
                : pagedFluxResponse.byPage(continuationTokenParam).take(1);
            return flux.map(pagedResponse -> new PagedResponseBase<Void, String>(pagedResponse.getRequest(),
                pagedResponse.getStatusCode(), pagedResponse.getHeaders(),
                pagedResponse.getValue()
                    .stream()
                    .map(protocolMethodData -> protocolMethodData.toObject(String.class))
                    .collect(Collectors.toList()),
                pagedResponse.getContinuationToken(), null));
        });
    }

    /**
     * The listIntegers operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the paginated response with {@link PagedFlux}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.COLLECTION)
    public PagedFlux<Integer> listIntegers() {
        // Generated convenience method for listIntegers
        RequestOptions requestOptions = new RequestOptions();
        PagedFlux<BinaryData> pagedFluxResponse = listIntegers(requestOptions);
        return PagedFlux.create(() -> (continuationTokenParam, pageSizeParam) -> {
            Flux<PagedResponse<BinaryData>> flux = (continuationTokenParam == null)
                ? pagedFluxResponse.byPage().take(1)
                : pagedFluxResponse.byPage(continuationTokenParam).take(1);
            return flux.map(pagedResponse -> new PagedResponseBase<Void, Integer>(pagedResponse.getRequest(),
                pagedResponse.getStatusCode(), pagedResponse.getHeaders(),
                pagedResponse.getValue()
                    .stream()
                    .map(protocolMethodData -> protocolMethodData.toObject(Integer.class))
                    .collect(Collectors.toList()),
                pagedResponse.getContinuationToken(), null));
        });
    }

    /**
     * The getJsonUtf8Response operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Resource> getJsonUtf8Response() {
        // Generated convenience method for getJsonUtf8ResponseWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getJsonUtf8ResponseWithResponse(requestOptions).flatMap(FluxUtil::toMono)
            .map(protocolMethodData -> protocolMethodData.toObject(Resource.class));
    }

    /**
     * The getPlusJsonResponse operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Resource> getPlusJsonResponse() {
        // Generated convenience method for getPlusJsonResponseWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getPlusJsonResponseWithResponse(requestOptions).flatMap(FluxUtil::toMono)
            .map(protocolMethodData -> protocolMethodData.toObject(Resource.class));
    }

    @Generated
    private static final TypeReference<List<Resource>> TYPE_REFERENCE_LIST_RESOURCE
        = new TypeReference<List<Resource>>() {
        };
}
