
/*
***********************************************************************
***      THIS FILE CONTAINS CURRENTSEA-API TYPES/INTERFACES/DTOS    ***
***                                                                 ***
***              TO UPDATE, RUN "yarn generate-types"               ***
***                                                                 ***
***********************************************************************
*/


/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthRequestDto {
  /** Must be a valid email address */
  email: string;
  /**
   * Password must be 8-24 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
   * @minLength 8
   * @maxLength 24
   */
  password: string;
}

export interface RegisterResponseDto {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
  message: string;
}

export interface User {
  refreshToken?: string | null;
  emailVerificationCode?: string | null;
  /** @format date-time */
  verificationCodeExpires?: string | null;
  stripeCustomerId?: string | null;
  paypalCustomerId?: string | null;
  paypalTransactionId?: string | null;
  paypalAccessToken?: string | null;
  paypalRefreshToken?: string | null;
  tiktokAccessToken?: string | null;
  tiktokRefreshToken?: string | null;
  youtubeAccessToken?: string | null;
  youtubeRefreshToken?: string | null;
  twitchAccessToken?: string | null;
  twitchRefreshToken?: string | null;
  facebookAccessToken?: string | null;
  facebookRefreshToken?: string | null;
  instagramAccessToken?: string | null;
  instagramRefreshToken?: string | null;
  pinterestAccessToken?: string | null;
  pinterestRefreshToken?: string | null;
  xAccessToken?: string | null;
  xRefreshToken?: string | null;
  linkedInToken?: string | null;
  linkedInRefreshToken?: string | null;
  email: string;
  password: string;
  userType?: 'Creator' | 'Agency' | 'Brand';
  emailVerified: boolean;
  snapchatAccessToken?: string;
  snapchatRefreshToken?: string;
  profile: UserProfile;
  /** @default [] */
  socialMediaLinks: object;
  /** @default "b50fff99-ce39-4515-acd7-6d88d894ee75" */
  id: string;
  /** @default "2024-05-13T10:47:49.966Z" */
  createdAt: object;
  /** @default "2024-05-13T10:47:49.966Z" */
  updatedAt: object;
}

export type Collection = object;

export interface UserProfile {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  profilePicturePath?: string | null;
  phoneNumber?: string | null;
  shortBio?: string;
  city: string;
  state: string;
  country: string;
  userProfileCompleted: boolean;
  user: User;
  /** @default [] */
  socialMediaLinks: object;
  /** @default [] */
  pictures: object;
  /** @default [] */
  videos: object;
  /** @default [] */
  rates: object;
  /** @default [] */
  showcaseContent: object;
  /** @default [] */
  industries: Collection;
  /** @default "9b8a90f7-3c82-4b7b-82e2-a20a31588e6f" */
  id: string;
  /** @default "2024-05-13T10:47:49.965Z" */
  createdAt: object;
  /** @default "2024-05-13T10:47:49.965Z" */
  updatedAt: object;
}

export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    userType?: 'Creator' | 'Agency' | 'Brand';
  };
  userProfile?: UserProfile;
  accessToken: string;
  refreshToken: string;
}

export interface ConfirmEmailDto {
  emailVerificationCode: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface MessageResponseDto {
  /**
   * Descriptive message about the operation result.
   * @example "Operation completed successfully"
   */
  message: string;
}

export interface ResetPasswordRequestDto {
  /**
   * Token containing userId
   * @example "12345abcde-token"
   */
  token: string;
  /**
   * The user's new password
   * @minLength 8
   * @maxLength 24
   * @example "SecurePassword123!"
   */
  password: string;
}

export interface CreateUserDto {
  /** Must be a valid email address */
  email: string;
  /**
   * Password must be 8-24 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
   * @minLength 8
   * @maxLength 24
   */
  password: string;
  /** The user profile */
  emailVerified: boolean;
  /**
   * @minLength 6
   * @maxLength 6
   */
  emailVerificationCode?: string | null;
  /** @format date-time */
  verificationCodeExpires?: string | null;
}

export interface UpdateUserDto {
  name?: string;
  /** Must be a valid email address */
  email?: string;
  /**
   * Password must be 8-24 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
   * @minLength 8
   * @maxLength 24
   */
  password?: string;
  /** The type of the user: Creator, Agency, or Brand */
  userType?: 'Creator' | 'Agency' | 'Brand';
  refreshToken?: string;
  /** Is email verified or not ? */
  emailVerified?: boolean;
}

export interface Industry {
  name: string;
  /** @default "3c774a07-c70a-4e4e-936c-2d937c49b71a" */
  id: string;
  /** @default [] */
  userProfile: object;
}

export interface CreateUserProfileDto {
  shortBio?: string;
  city: string;
  state: string;
  country: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
}

export type RateDto = object;

export type ShowcaseContentDto = object;

export interface UpdateUserProfileDto {
  rates?: RateDto[];
  /** List of industry IDs */
  industryIds?: string[];
  content?: ShowcaseContentDto[];
  userProfileCompleted?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor(
    { securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {},
  ) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>(
    { secure, path, type, query, format, body, ...params }: FullRequestParams,
  ): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title CurrentSea API
 * @version Dev
 * @contact
 *
 * CurrentSea API Server
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @description Creates a new user account with the provided details. Validates for unique email and send verification email.
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary Register a new user account
     * @request POST:/auth/register
     */
    authControllerRegister: (data: AuthRequestDto, params: RequestParams = {}) =>
      this.request<RegisterResponseDto, any>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Authenticate a user
     * @request POST:/auth/login
     */
    authControllerLogin: (data: AuthRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Invalidate a user's refresh token.
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Verifies a user email with the provided token. If successful, the user emailVerified field is updated to true.
     *
     * @tags Auth
     * @name AuthControllerVerifyEmail
     * @summary Verify a user email
     * @request GET:/auth/verify-email
     */
    authControllerVerifyEmail: (
      query: {
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/verify-email`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Resends a user verification email to the provided email.
     *
     * @tags Auth
     * @name AuthControllerResendVerificationEmail
     * @summary Resend a user verification email
     * @request GET:/auth/resend-verification-email
     */
    authControllerResendVerificationEmail: (
      query: {
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/resend-verification-email`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Confirm the user email verification code provided in the token.
     *
     * @tags Auth
     * @name AuthControllerConfirmEmailVerificationCode
     * @summary Confirms user email verification code
     * @request POST:/auth/confirm-email-verification-code
     */
    authControllerConfirmEmailVerificationCode: (
      query: {
        email: string;
      },
      data: ConfirmEmailDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/confirm-email-verification-code`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Sends a password reset email to the user.
     *
     * @tags Auth
     * @name AuthControllerForgotPassword
     * @summary Request password reset
     * @request POST:/auth/forgot-password
     */
    authControllerForgotPassword: (data: ForgotPasswordRequestDto, params: RequestParams = {}) =>
      this.request<MessageResponseDto, any>({
        path: `/auth/forgot-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Resets the user password with the provided token.
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @summary Reset user password
     * @request POST:/auth/reset-password
     */
    authControllerResetPassword: (data: ResetPasswordRequestDto, params: RequestParams = {}) =>
      this.request<MessageResponseDto, any>({
        path: `/auth/reset-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreate
     * @summary Create a new User
     * @request POST:/users
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAll
     * @summary Retrieve all Users
     * @request GET:/users
     */
    usersControllerGetAll: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetOne
     * @summary Retrieve a single user by ID
     * @request GET:/users/{id}
     */
    usersControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @summary Update a User's information
     * @request PATCH:/users/{id}
     */
    usersControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDelete
     * @summary Delete a User
     * @request DELETE:/users/{id}
     */
    usersControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetProfile
     * @summary Retrieve a User Profile by User ID
     * @request GET:/users/{id}/profile
     */
    usersControllerGetProfile: (id: string, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${id}/profile`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetSocialMediaConnections
     * @request POST:/users/social-media/access-tokens
     */
    usersControllerGetSocialMediaConnections: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/users/social-media/access-tokens`,
        method: 'POST',
        format: 'json',
        ...params,
      }),
  };
  industries = {
    /**
     * No description
     *
     * @tags Industries
     * @name IndustryControllerGetAll
     * @summary Get all industries
     * @request GET:/industries
     */
    industryControllerGetAll: (params: RequestParams = {}) =>
      this.request<Industry, any>({
        path: `/industries`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  instagram = {
    /**
     * No description
     *
     * @tags Instagram Integration
     * @name InstagramApiControllerAuthorize
     * @request GET:/instagram/auth/api/authorize
     */
    instagramApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/instagram/auth/api/authorize`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instagram Integration
     * @name InstagramApiControllerExchangeCode
     * @request GET:/instagram/auth/api/exchange-code
     */
    instagramApiControllerExchangeCode: (
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/instagram/auth/api/exchange-code`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instagram Integration
     * @name InstagramApiControllerHandleAccessToken
     * @request POST:/instagram/auth/api/handle-access-token
     */
    instagramApiControllerHandleAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/instagram/auth/api/handle-access-token`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instagram Integration
     * @name InstagramApiControllerConnectInstagramAccount
     * @request POST:/instagram/auth/api/connect-instagram-account
     */
    instagramApiControllerConnectInstagramAccount: (
      query: {
        email: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/instagram/auth/api/connect-instagram-account`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instagram Integration
     * @name InstagramApiControllerFetchUserInsights
     * @request GET:/instagram/auth/api/fetch-user-insights
     */
    instagramApiControllerFetchUserInsights: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/instagram/auth/api/fetch-user-insights`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  linkedin = {
    /**
     * No description
     *
     * @name LinkedinApiControllerAuthorize
     * @request POST:/linkedin/auth/api/authorize
     */
    linkedinApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/linkedin/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name LinkedinApiControllerCallback
     * @request GET:/linkedin/auth/api/callback
     */
    linkedinApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/linkedin/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name LinkedinApiControllerGetLifetimeOrganizationPageStatistics
     * @request GET:/linkedin/auth/api/{organizationUrn}/lifetime
     */
    linkedinApiControllerGetLifetimeOrganizationPageStatistics: (
      organizationUrn: string,
      params: RequestParams = {},
    ) =>
      this.request<Collection, any>({
        path: `/linkedin/auth/api/${organizationUrn}/lifetime`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name LinkedinApiControllerGetTimeBoundOrganizationPageStatistics
     * @request GET:/linkedin/auth/api/{organizationUrn}/time-bound/{timeGranularityType}/{startTime}/{endTime}
     */
    linkedinApiControllerGetTimeBoundOrganizationPageStatistics: (
      organizationUrn: string,
      timeGranularityType: string,
      startTime: number,
      endTime: number,
      params: RequestParams = {},
    ) =>
      this.request<Collection, any>({
        path: `/linkedin/auth/api/${organizationUrn}/time-bound/${timeGranularityType}/${startTime}/${endTime}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  paypal = {
    /**
     * No description
     *
     * @tags Paypal Integration
     * @name PaypalApiControllerAuthorize
     * @request POST:/paypal/auth/api/authorize
     */
    paypalApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/paypal/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paypal Integration
     * @name PaypalApiControllerCallback
     * @request GET:/paypal/auth/api/callback
     */
    paypalApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/paypal/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  pinterest = {
    /**
     * No description
     *
     * @name PinterestApiControllerAuthorize
     * @request POST:/pinterest/auth/api/authorize
     */
    pinterestApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/pinterest/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name PinterestApiControllerCallback
     * @request GET:/pinterest/auth/api/callback
     */
    pinterestApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/pinterest/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name PinterestApiControllerHandleAccessToken
     * @request POST:/pinterest/auth/api/handle-access-token
     */
    pinterestApiControllerHandleAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/pinterest/auth/api/handle-access-token`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @name PinterestApiControllerConnectPinterestAccount
     * @request POST:/pinterest/auth/api/connect-pinterest-account
     */
    pinterestApiControllerConnectPinterestAccount: (
      query: {
        email: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/pinterest/auth/api/connect-pinterest-account`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name PinterestApiControllerFetchUserInsights
     * @request GET:/pinterest/auth/api/fetch-user-insights
     */
    pinterestApiControllerFetchUserInsights: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/pinterest/auth/api/fetch-user-insights`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  snapchat = {
    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerAuthorize
     * @request POST:/snapchat/auth/api/authorize
     */
    snapchatApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/snapchat/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerCallback
     * @request GET:/snapchat/auth/api/callback
     */
    snapchatApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/snapchat/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerExchangeCode
     * @request GET:/snapchat/auth/api/exchange-code
     */
    snapchatApiControllerExchangeCode: (
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/snapchat/auth/api/exchange-code`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerHandleAccessToken
     * @request POST:/snapchat/auth/api/handle-access-token
     */
    snapchatApiControllerHandleAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/snapchat/auth/api/handle-access-token`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerConnectSnapchatAccount
     * @request POST:/snapchat/auth/api/connect-snapchat-account
     */
    snapchatApiControllerConnectSnapchatAccount: (
      query: {
        email: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/snapchat/auth/api/connect-snapchat-account`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Snapchat Integration
     * @name SnapchatApiControllerFetchUserData
     * @request GET:/snapchat/auth/api/fetch-user-data
     */
    snapchatApiControllerFetchUserData: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/snapchat/auth/api/fetch-user-data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  stripe = {
    /**
     * No description
     *
     * @name StripeApiControllerCreatePaymentIntent
     * @request POST:/stripe/create-payment-intent
     */
    stripeApiControllerCreatePaymentIntent: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stripe/create-payment-intent`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @name StripeApiControllerPayIntent
     * @request POST:/stripe/pay-intent
     */
    stripeApiControllerPayIntent: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stripe/pay-intent`,
        method: 'POST',
        ...params,
      }),
  };
  tiktok = {
    /**
     * No description
     *
     * @tags TikTok Integration
     * @name TikTokApiControllerAuthorize
     * @request POST:/tiktok/auth/api/authorize
     */
    tikTokApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tiktok/auth/api/authorize`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TikTok Integration
     * @name TikTokApiControllerCallback
     * @request GET:/tiktok/auth/api/callback
     */
    tikTokApiControllerCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tiktok/auth/api/callback`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TikTok Integration
     * @name TikTokApiControllerGetUserInfo
     * @request GET:/tiktok/auth/api/user-info
     */
    tikTokApiControllerGetUserInfo: (
      query: {
        accessToken: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Collection, any>({
        path: `/tiktok/auth/api/user-info`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  twitch = {
    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerAuthorize
     * @request POST:/twitch/auth/api/authorize
     */
    twitchApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/twitch/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerCallback
     * @request GET:/twitch/auth/api/callback
     */
    twitchApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/twitch/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerExchangeCode
     * @request GET:/twitch/auth/api/exchange-code
     */
    twitchApiControllerExchangeCode: (
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/twitch/auth/api/exchange-code`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerHandleAccessToken
     * @request POST:/twitch/auth/api/handle-access-token
     */
    twitchApiControllerHandleAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/twitch/auth/api/handle-access-token`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerConnectTwitchAccount
     * @request POST:/twitch/auth/api/connect-twitch-account
     */
    twitchApiControllerConnectTwitchAccount: (
      query: {
        uuid: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/twitch/auth/api/connect-twitch-account`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerFetchAnalytics
     * @request GET:/twitch/auth/api/fetch-analytics
     */
    twitchApiControllerFetchAnalytics: (
      query: {
        gameId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Collection, any>({
        path: `/twitch/auth/api/fetch-analytics`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Twitch Integration
     * @name TwitchApiControllerFetchChannelAnalytics
     * @request GET:/twitch/auth/api/fetch-channel-analytics
     */
    twitchApiControllerFetchChannelAnalytics: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/twitch/auth/api/fetch-channel-analytics`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  userProfile = {
    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerCreateUserProfile
     * @summary Creates a new User Profile
     * @request POST:/user-profile
     */
    userProfileControllerCreateUserProfile: (
      data: CreateUserProfileDto,
      params: RequestParams = {},
    ) =>
      this.request<UserProfile, any>({
        path: `/user-profile`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerGetAll
     * @summary Retrieve all User Profiles
     * @request GET:/user-profile
     */
    userProfileControllerGetAll: (params: RequestParams = {}) =>
      this.request<UserProfile[], any>({
        path: `/user-profile`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerGetOne
     * @summary Returns a single user profile by ID
     * @request GET:/user-profile/{id}
     */
    userProfileControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/user-profile/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerUpdate
     * @summary Update a User Profile's information
     * @request PATCH:/user-profile/{id}
     */
    userProfileControllerUpdate: (
      id: string,
      data: UpdateUserProfileDto,
      params: RequestParams = {},
    ) =>
      this.request<UserProfile, any>({
        path: `/user-profile/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerDelete
     * @summary Delete a User Profile
     * @request DELETE:/user-profile/{id}
     */
    userProfileControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user-profile/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerUploadProfilePicture
     * @summary Upload a profile picture for a User Profile
     * @request POST:/user-profile/{id}/profile-picture
     */
    userProfileControllerUploadProfilePicture: (id: string, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/user-profile/${id}/profile-picture`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerUploadAndUpdateContent
     * @summary Upload User Profile showcase content
     * @request POST:/user-profile/{id}/showcase-content
     */
    userProfileControllerUploadAndUpdateContent: (
      id: string,
      data: UpdateUserProfileDto,
      params: RequestParams = {},
    ) =>
      this.request<UserProfile, any>({
        path: `/user-profile/${id}/showcase-content`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerGetUserProfileShowcaseContent
     * @summary Returns showcase content of a single user profile by ID
     * @request GET:/user-profile/{id}/show-showcase-content
     */
    userProfileControllerGetUserProfileShowcaseContent: (id: string, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/user-profile/${id}/show-showcase-content`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerDeleteShowcaseContent
     * @summary Deletes a specific showcase content from a user profile
     * @request DELETE:/user-profile/{id}/delete-showcase-content
     */
    userProfileControllerDeleteShowcaseContent: (
      id: string,
      query: {
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/user-profile/${id}/delete-showcase-content`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerSetUserProfileStatus
     * @summary Update user profile completion status
     * @request PUT:/user-profile/{id}/set-user-profile-status
     */
    userProfileControllerSetUserProfileStatus: (id: string, params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/user-profile/${id}/set-user-profile-status`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Profile
     * @name UserProfileControllerGetUserProfileStatus
     * @summary Returns profile completion status of a single user profile by ID
     * @request GET:/user-profile/{id}/get-user-profile-status
     */
    userProfileControllerGetUserProfileStatus: (id: string, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/user-profile/${id}/get-user-profile-status`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  youtube = {
    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerAuthorize
     * @request POST:/youtube/auth/api/authorize
     */
    youtubeApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/youtube/auth/api/authorize`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerCallback
     * @request GET:/youtube/auth/api/callback
     */
    youtubeApiControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/youtube/auth/api/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerExchangeCode
     * @request GET:/youtube/auth/api/exchange-code
     */
    youtubeApiControllerExchangeCode: (
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/youtube/auth/api/exchange-code`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerHandleAccessToken
     * @request POST:/youtube/auth/api/handle-access-token
     */
    youtubeApiControllerHandleAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/youtube/auth/api/handle-access-token`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerConnectYoutubeAccount
     * @request POST:/youtube/auth/api/connect-youtube-account
     */
    youtubeApiControllerConnectYoutubeAccount: (
      query: {
        uuid: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/youtube/auth/api/connect-youtube-account`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerFetchAnalytics
     * @request GET:/youtube/auth/api/fetch-analytics
     */
    youtubeApiControllerFetchAnalytics: (
      query: {
        channelId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Collection, any>({
        path: `/youtube/auth/api/fetch-analytics`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags YouTube Integration
     * @name YoutubeApiControllerFetchChannelData
     * @request GET:/youtube/auth/api/fetch-channel-analytics
     */
    youtubeApiControllerFetchChannelData: (params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/youtube/auth/api/fetch-channel-analytics`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  xTwitter = {
    /**
     * No description
     *
     * @tags X/Twitter Integration
     * @name XTwitterApiControllerAuthorize
     * @request POST:/x-twitter/auth/api/authorize
     */
    xTwitterApiControllerAuthorize: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/x-twitter/auth/api/authorize`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags X/Twitter Integration
     * @name XTwitterApiControllerCallback
     * @request GET:/x-twitter/auth/api/callback
     */
    xTwitterApiControllerCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/x-twitter/auth/api/callback`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags X/Twitter Integration
     * @name XTwitterApiControllerGetUserMetrics
     * @request GET:/x-twitter/auth/api/user/{id}/metrics
     */
    xTwitterApiControllerGetUserMetrics: (id: string, params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/x-twitter/auth/api/user/${id}/metrics`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags X/Twitter Integration
     * @name XTwitterApiControllerGetTweetMetrics
     * @request GET:/x-twitter/auth/api/tweet/{id}/metrics
     */
    xTwitterApiControllerGetTweetMetrics: (id: string, params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/x-twitter/auth/api/tweet/${id}/metrics`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
