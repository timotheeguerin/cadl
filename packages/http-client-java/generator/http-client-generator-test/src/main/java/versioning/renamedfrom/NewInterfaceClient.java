// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package versioning.renamedfrom;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceClient;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.exception.ClientAuthenticationException;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceModifiedException;
import com.azure.core.exception.ResourceNotFoundException;
import com.azure.core.http.rest.RequestOptions;
import com.azure.core.http.rest.Response;
import com.azure.core.util.BinaryData;
import versioning.renamedfrom.implementation.NewInterfacesImpl;
import versioning.renamedfrom.models.NewModel;

/**
 * Initializes a new instance of the synchronous RenamedFromClient type.
 */
@ServiceClient(builder = RenamedFromClientBuilder.class)
public final class NewInterfaceClient {
    @Generated
    private final NewInterfacesImpl serviceClient;

    /**
     * Initializes an instance of NewInterfaceClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    NewInterfaceClient(NewInterfacesImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * The newOpInNewInterface operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     newProp: String (Required)
     *     enumProp: String(newEnumMember) (Required)
     *     unionProp: BinaryData (Required)
     * }
     * }
     * </pre>
     * 
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     newProp: String (Required)
     *     enumProp: String(newEnumMember) (Required)
     *     unionProp: BinaryData (Required)
     * }
     * }
     * </pre>
     * 
     * @param body The body parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<BinaryData> newOpInNewInterfaceWithResponse(BinaryData body, RequestOptions requestOptions) {
        return this.serviceClient.newOpInNewInterfaceWithResponse(body, requestOptions);
    }

    /**
     * The newOpInNewInterface operation.
     * 
     * @param body The body parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public NewModel newOpInNewInterface(NewModel body) {
        // Generated convenience method for newOpInNewInterfaceWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return newOpInNewInterfaceWithResponse(BinaryData.fromObject(body), requestOptions).getValue()
            .toObject(NewModel.class);
    }
}
