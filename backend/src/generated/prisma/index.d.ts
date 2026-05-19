
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Symptom
 * 
 */
export type Symptom = $Result.DefaultSelection<Prisma.$SymptomPayload>
/**
 * Model Examination
 * 
 */
export type Examination = $Result.DefaultSelection<Prisma.$ExaminationPayload>
/**
 * Model ConsultationSymptom
 * 
 */
export type ConsultationSymptom = $Result.DefaultSelection<Prisma.$ConsultationSymptomPayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Investigation
 * 
 */
export type Investigation = $Result.DefaultSelection<Prisma.$InvestigationPayload>
/**
 * Model PatientInstruction
 * 
 */
export type PatientInstruction = $Result.DefaultSelection<Prisma.$PatientInstructionPayload>
/**
 * Model Diagnosis
 * 
 */
export type Diagnosis = $Result.DefaultSelection<Prisma.$DiagnosisPayload>
/**
 * Model PatientGuardian
 * 
 */
export type PatientGuardian = $Result.DefaultSelection<Prisma.$PatientGuardianPayload>
/**
 * Model PatientAllergy
 * 
 */
export type PatientAllergy = $Result.DefaultSelection<Prisma.$PatientAllergyPayload>
/**
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
  DISPENSER: 'DISPENSER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.symptom`: Exposes CRUD operations for the **Symptom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Symptoms
    * const symptoms = await prisma.symptom.findMany()
    * ```
    */
  get symptom(): Prisma.SymptomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.examination`: Exposes CRUD operations for the **Examination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Examinations
    * const examinations = await prisma.examination.findMany()
    * ```
    */
  get examination(): Prisma.ExaminationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultationSymptom`: Exposes CRUD operations for the **ConsultationSymptom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConsultationSymptoms
    * const consultationSymptoms = await prisma.consultationSymptom.findMany()
    * ```
    */
  get consultationSymptom(): Prisma.ConsultationSymptomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.investigation`: Exposes CRUD operations for the **Investigation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investigations
    * const investigations = await prisma.investigation.findMany()
    * ```
    */
  get investigation(): Prisma.InvestigationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientInstruction`: Exposes CRUD operations for the **PatientInstruction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientInstructions
    * const patientInstructions = await prisma.patientInstruction.findMany()
    * ```
    */
  get patientInstruction(): Prisma.PatientInstructionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.diagnosis`: Exposes CRUD operations for the **Diagnosis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Diagnoses
    * const diagnoses = await prisma.diagnosis.findMany()
    * ```
    */
  get diagnosis(): Prisma.DiagnosisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientGuardian`: Exposes CRUD operations for the **PatientGuardian** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientGuardians
    * const patientGuardians = await prisma.patientGuardian.findMany()
    * ```
    */
  get patientGuardian(): Prisma.PatientGuardianDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientAllergy`: Exposes CRUD operations for the **PatientAllergy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientAllergies
    * const patientAllergies = await prisma.patientAllergy.findMany()
    * ```
    */
  get patientAllergy(): Prisma.PatientAllergyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Patient: 'Patient',
    Symptom: 'Symptom',
    Examination: 'Examination',
    ConsultationSymptom: 'ConsultationSymptom',
    Consultation: 'Consultation',
    Investigation: 'Investigation',
    PatientInstruction: 'PatientInstruction',
    Diagnosis: 'Diagnosis',
    PatientGuardian: 'PatientGuardian',
    PatientAllergy: 'PatientAllergy',
    Prescription: 'Prescription'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "patient" | "symptom" | "examination" | "consultationSymptom" | "consultation" | "investigation" | "patientInstruction" | "diagnosis" | "patientGuardian" | "patientAllergy" | "prescription"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Symptom: {
        payload: Prisma.$SymptomPayload<ExtArgs>
        fields: Prisma.SymptomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SymptomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SymptomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          findFirst: {
            args: Prisma.SymptomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SymptomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          findMany: {
            args: Prisma.SymptomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>[]
          }
          create: {
            args: Prisma.SymptomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          createMany: {
            args: Prisma.SymptomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SymptomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          update: {
            args: Prisma.SymptomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          deleteMany: {
            args: Prisma.SymptomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SymptomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SymptomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomPayload>
          }
          aggregate: {
            args: Prisma.SymptomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSymptom>
          }
          groupBy: {
            args: Prisma.SymptomGroupByArgs<ExtArgs>
            result: $Utils.Optional<SymptomGroupByOutputType>[]
          }
          count: {
            args: Prisma.SymptomCountArgs<ExtArgs>
            result: $Utils.Optional<SymptomCountAggregateOutputType> | number
          }
        }
      }
      Examination: {
        payload: Prisma.$ExaminationPayload<ExtArgs>
        fields: Prisma.ExaminationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExaminationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExaminationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          findFirst: {
            args: Prisma.ExaminationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExaminationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          findMany: {
            args: Prisma.ExaminationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>[]
          }
          create: {
            args: Prisma.ExaminationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          createMany: {
            args: Prisma.ExaminationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExaminationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          update: {
            args: Prisma.ExaminationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          deleteMany: {
            args: Prisma.ExaminationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExaminationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExaminationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExaminationPayload>
          }
          aggregate: {
            args: Prisma.ExaminationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamination>
          }
          groupBy: {
            args: Prisma.ExaminationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExaminationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExaminationCountArgs<ExtArgs>
            result: $Utils.Optional<ExaminationCountAggregateOutputType> | number
          }
        }
      }
      ConsultationSymptom: {
        payload: Prisma.$ConsultationSymptomPayload<ExtArgs>
        fields: Prisma.ConsultationSymptomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationSymptomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationSymptomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          findFirst: {
            args: Prisma.ConsultationSymptomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationSymptomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          findMany: {
            args: Prisma.ConsultationSymptomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>[]
          }
          create: {
            args: Prisma.ConsultationSymptomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          createMany: {
            args: Prisma.ConsultationSymptomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConsultationSymptomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          update: {
            args: Prisma.ConsultationSymptomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationSymptomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationSymptomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConsultationSymptomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationSymptomPayload>
          }
          aggregate: {
            args: Prisma.ConsultationSymptomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultationSymptom>
          }
          groupBy: {
            args: Prisma.ConsultationSymptomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationSymptomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationSymptomCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationSymptomCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Investigation: {
        payload: Prisma.$InvestigationPayload<ExtArgs>
        fields: Prisma.InvestigationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestigationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestigationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          findFirst: {
            args: Prisma.InvestigationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestigationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          findMany: {
            args: Prisma.InvestigationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>[]
          }
          create: {
            args: Prisma.InvestigationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          createMany: {
            args: Prisma.InvestigationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvestigationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          update: {
            args: Prisma.InvestigationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          deleteMany: {
            args: Prisma.InvestigationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestigationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvestigationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestigationPayload>
          }
          aggregate: {
            args: Prisma.InvestigationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestigation>
          }
          groupBy: {
            args: Prisma.InvestigationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestigationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestigationCountArgs<ExtArgs>
            result: $Utils.Optional<InvestigationCountAggregateOutputType> | number
          }
        }
      }
      PatientInstruction: {
        payload: Prisma.$PatientInstructionPayload<ExtArgs>
        fields: Prisma.PatientInstructionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientInstructionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientInstructionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          findFirst: {
            args: Prisma.PatientInstructionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientInstructionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          findMany: {
            args: Prisma.PatientInstructionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>[]
          }
          create: {
            args: Prisma.PatientInstructionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          createMany: {
            args: Prisma.PatientInstructionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PatientInstructionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          update: {
            args: Prisma.PatientInstructionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          deleteMany: {
            args: Prisma.PatientInstructionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientInstructionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientInstructionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInstructionPayload>
          }
          aggregate: {
            args: Prisma.PatientInstructionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientInstruction>
          }
          groupBy: {
            args: Prisma.PatientInstructionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientInstructionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientInstructionCountArgs<ExtArgs>
            result: $Utils.Optional<PatientInstructionCountAggregateOutputType> | number
          }
        }
      }
      Diagnosis: {
        payload: Prisma.$DiagnosisPayload<ExtArgs>
        fields: Prisma.DiagnosisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiagnosisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiagnosisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          findFirst: {
            args: Prisma.DiagnosisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiagnosisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          findMany: {
            args: Prisma.DiagnosisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>[]
          }
          create: {
            args: Prisma.DiagnosisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          createMany: {
            args: Prisma.DiagnosisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DiagnosisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          update: {
            args: Prisma.DiagnosisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          deleteMany: {
            args: Prisma.DiagnosisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiagnosisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DiagnosisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiagnosisPayload>
          }
          aggregate: {
            args: Prisma.DiagnosisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiagnosis>
          }
          groupBy: {
            args: Prisma.DiagnosisGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiagnosisGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiagnosisCountArgs<ExtArgs>
            result: $Utils.Optional<DiagnosisCountAggregateOutputType> | number
          }
        }
      }
      PatientGuardian: {
        payload: Prisma.$PatientGuardianPayload<ExtArgs>
        fields: Prisma.PatientGuardianFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientGuardianFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientGuardianFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          findFirst: {
            args: Prisma.PatientGuardianFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientGuardianFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          findMany: {
            args: Prisma.PatientGuardianFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>[]
          }
          create: {
            args: Prisma.PatientGuardianCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          createMany: {
            args: Prisma.PatientGuardianCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PatientGuardianDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          update: {
            args: Prisma.PatientGuardianUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          deleteMany: {
            args: Prisma.PatientGuardianDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientGuardianUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientGuardianUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientGuardianPayload>
          }
          aggregate: {
            args: Prisma.PatientGuardianAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientGuardian>
          }
          groupBy: {
            args: Prisma.PatientGuardianGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGuardianGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientGuardianCountArgs<ExtArgs>
            result: $Utils.Optional<PatientGuardianCountAggregateOutputType> | number
          }
        }
      }
      PatientAllergy: {
        payload: Prisma.$PatientAllergyPayload<ExtArgs>
        fields: Prisma.PatientAllergyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientAllergyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientAllergyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          findFirst: {
            args: Prisma.PatientAllergyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientAllergyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          findMany: {
            args: Prisma.PatientAllergyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>[]
          }
          create: {
            args: Prisma.PatientAllergyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          createMany: {
            args: Prisma.PatientAllergyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PatientAllergyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          update: {
            args: Prisma.PatientAllergyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          deleteMany: {
            args: Prisma.PatientAllergyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientAllergyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientAllergyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAllergyPayload>
          }
          aggregate: {
            args: Prisma.PatientAllergyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientAllergy>
          }
          groupBy: {
            args: Prisma.PatientAllergyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientAllergyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientAllergyCountArgs<ExtArgs>
            result: $Utils.Optional<PatientAllergyCountAggregateOutputType> | number
          }
        }
      }
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    patient?: PatientOmit
    symptom?: SymptomOmit
    examination?: ExaminationOmit
    consultationSymptom?: ConsultationSymptomOmit
    consultation?: ConsultationOmit
    investigation?: InvestigationOmit
    patientInstruction?: PatientInstructionOmit
    diagnosis?: DiagnosisOmit
    patientGuardian?: PatientGuardianOmit
    patientAllergy?: PatientAllergyOmit
    prescription?: PrescriptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    consultations: number
    guardians: number
    allergies: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | PatientCountOutputTypeCountConsultationsArgs
    guardians?: boolean | PatientCountOutputTypeCountGuardiansArgs
    allergies?: boolean | PatientCountOutputTypeCountAllergiesArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountGuardiansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientGuardianWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAllergiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientAllergyWhereInput
  }


  /**
   * Count Type SymptomCountOutputType
   */

  export type SymptomCountOutputType = {
    consultationSymptoms: number
  }

  export type SymptomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultationSymptoms?: boolean | SymptomCountOutputTypeCountConsultationSymptomsArgs
  }

  // Custom InputTypes
  /**
   * SymptomCountOutputType without action
   */
  export type SymptomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomCountOutputType
     */
    select?: SymptomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SymptomCountOutputType without action
   */
  export type SymptomCountOutputTypeCountConsultationSymptomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationSymptomWhereInput
  }


  /**
   * Count Type ConsultationCountOutputType
   */

  export type ConsultationCountOutputType = {
    prescriptions: number
    examinations: number
    consultationSymptoms: number
    investigations: number
    instructions: number
    diagnoses: number
  }

  export type ConsultationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescriptions?: boolean | ConsultationCountOutputTypeCountPrescriptionsArgs
    examinations?: boolean | ConsultationCountOutputTypeCountExaminationsArgs
    consultationSymptoms?: boolean | ConsultationCountOutputTypeCountConsultationSymptomsArgs
    investigations?: boolean | ConsultationCountOutputTypeCountInvestigationsArgs
    instructions?: boolean | ConsultationCountOutputTypeCountInstructionsArgs
    diagnoses?: boolean | ConsultationCountOutputTypeCountDiagnosesArgs
  }

  // Custom InputTypes
  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationCountOutputType
     */
    select?: ConsultationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountExaminationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExaminationWhereInput
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountConsultationSymptomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationSymptomWhereInput
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountInvestigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestigationWhereInput
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountInstructionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientInstructionWhereInput
  }

  /**
   * ConsultationCountOutputType without action
   */
  export type ConsultationCountOutputTypeCountDiagnosesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiagnosisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    is_first_login: boolean | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    is_first_login: boolean | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    name: number
    email: number
    password: number
    role: number
    is_first_login: number
    created_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    is_first_login?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    is_first_login?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    is_first_login?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    is_first_login: boolean
    created_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    is_first_login?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    user_id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    is_first_login?: boolean
    created_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "name" | "email" | "password" | "role" | "is_first_login" | "created_at", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      name: string
      email: string
      password: string
      role: $Enums.Role
      is_first_login: boolean
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly is_first_login: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    patient_id: number | null
    created_by: number | null
  }

  export type PatientSumAggregateOutputType = {
    patient_id: number | null
    created_by: number | null
  }

  export type PatientMinAggregateOutputType = {
    patient_id: number | null
    patient_code: string | null
    name: string | null
    gender: string | null
    date_of_birth: Date | null
    address: string | null
    nic: string | null
    phone: string | null
    is_profile_completed: boolean | null
    created_by: number | null
    created_at: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    patient_id: number | null
    patient_code: string | null
    name: string | null
    gender: string | null
    date_of_birth: Date | null
    address: string | null
    nic: string | null
    phone: string | null
    is_profile_completed: boolean | null
    created_by: number | null
    created_at: Date | null
  }

  export type PatientCountAggregateOutputType = {
    patient_id: number
    patient_code: number
    name: number
    gender: number
    date_of_birth: number
    address: number
    nic: number
    phone: number
    is_profile_completed: number
    created_by: number
    created_at: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    patient_id?: true
    created_by?: true
  }

  export type PatientSumAggregateInputType = {
    patient_id?: true
    created_by?: true
  }

  export type PatientMinAggregateInputType = {
    patient_id?: true
    patient_code?: true
    name?: true
    gender?: true
    date_of_birth?: true
    address?: true
    nic?: true
    phone?: true
    is_profile_completed?: true
    created_by?: true
    created_at?: true
  }

  export type PatientMaxAggregateInputType = {
    patient_id?: true
    patient_code?: true
    name?: true
    gender?: true
    date_of_birth?: true
    address?: true
    nic?: true
    phone?: true
    is_profile_completed?: true
    created_by?: true
    created_at?: true
  }

  export type PatientCountAggregateInputType = {
    patient_id?: true
    patient_code?: true
    name?: true
    gender?: true
    date_of_birth?: true
    address?: true
    nic?: true
    phone?: true
    is_profile_completed?: true
    created_by?: true
    created_at?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    patient_id: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date
    address: string | null
    nic: string | null
    phone: string | null
    is_profile_completed: boolean
    created_by: number
    created_at: Date
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    patient_code?: boolean
    name?: boolean
    gender?: boolean
    date_of_birth?: boolean
    address?: boolean
    nic?: boolean
    phone?: boolean
    is_profile_completed?: boolean
    created_by?: boolean
    created_at?: boolean
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    guardians?: boolean | Patient$guardiansArgs<ExtArgs>
    allergies?: boolean | Patient$allergiesArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>



  export type PatientSelectScalar = {
    patient_id?: boolean
    patient_code?: boolean
    name?: boolean
    gender?: boolean
    date_of_birth?: boolean
    address?: boolean
    nic?: boolean
    phone?: boolean
    is_profile_completed?: boolean
    created_by?: boolean
    created_at?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"patient_id" | "patient_code" | "name" | "gender" | "date_of_birth" | "address" | "nic" | "phone" | "is_profile_completed" | "created_by" | "created_at", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultations?: boolean | Patient$consultationsArgs<ExtArgs>
    guardians?: boolean | Patient$guardiansArgs<ExtArgs>
    allergies?: boolean | Patient$allergiesArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
      guardians: Prisma.$PatientGuardianPayload<ExtArgs>[]
      allergies: Prisma.$PatientAllergyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      patient_id: number
      patient_code: string
      name: string
      gender: string
      date_of_birth: Date
      address: string | null
      nic: string | null
      phone: string | null
      is_profile_completed: boolean
      created_by: number
      created_at: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `patient_id`
     * const patientWithPatient_idOnly = await prisma.patient.findMany({ select: { patient_id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultations<T extends Patient$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guardians<T extends Patient$guardiansArgs<ExtArgs> = {}>(args?: Subset<T, Patient$guardiansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allergies<T extends Patient$allergiesArgs<ExtArgs> = {}>(args?: Subset<T, Patient$allergiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly patient_id: FieldRef<"Patient", 'Int'>
    readonly patient_code: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly gender: FieldRef<"Patient", 'String'>
    readonly date_of_birth: FieldRef<"Patient", 'DateTime'>
    readonly address: FieldRef<"Patient", 'String'>
    readonly nic: FieldRef<"Patient", 'String'>
    readonly phone: FieldRef<"Patient", 'String'>
    readonly is_profile_completed: FieldRef<"Patient", 'Boolean'>
    readonly created_by: FieldRef<"Patient", 'Int'>
    readonly created_at: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.consultations
   */
  export type Patient$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Patient.guardians
   */
  export type Patient$guardiansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    where?: PatientGuardianWhereInput
    orderBy?: PatientGuardianOrderByWithRelationInput | PatientGuardianOrderByWithRelationInput[]
    cursor?: PatientGuardianWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientGuardianScalarFieldEnum | PatientGuardianScalarFieldEnum[]
  }

  /**
   * Patient.allergies
   */
  export type Patient$allergiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    where?: PatientAllergyWhereInput
    orderBy?: PatientAllergyOrderByWithRelationInput | PatientAllergyOrderByWithRelationInput[]
    cursor?: PatientAllergyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientAllergyScalarFieldEnum | PatientAllergyScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Symptom
   */

  export type AggregateSymptom = {
    _count: SymptomCountAggregateOutputType | null
    _avg: SymptomAvgAggregateOutputType | null
    _sum: SymptomSumAggregateOutputType | null
    _min: SymptomMinAggregateOutputType | null
    _max: SymptomMaxAggregateOutputType | null
  }

  export type SymptomAvgAggregateOutputType = {
    symptom_id: number | null
  }

  export type SymptomSumAggregateOutputType = {
    symptom_id: number | null
  }

  export type SymptomMinAggregateOutputType = {
    symptom_id: number | null
    name: string | null
  }

  export type SymptomMaxAggregateOutputType = {
    symptom_id: number | null
    name: string | null
  }

  export type SymptomCountAggregateOutputType = {
    symptom_id: number
    name: number
    _all: number
  }


  export type SymptomAvgAggregateInputType = {
    symptom_id?: true
  }

  export type SymptomSumAggregateInputType = {
    symptom_id?: true
  }

  export type SymptomMinAggregateInputType = {
    symptom_id?: true
    name?: true
  }

  export type SymptomMaxAggregateInputType = {
    symptom_id?: true
    name?: true
  }

  export type SymptomCountAggregateInputType = {
    symptom_id?: true
    name?: true
    _all?: true
  }

  export type SymptomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Symptom to aggregate.
     */
    where?: SymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Symptoms to fetch.
     */
    orderBy?: SymptomOrderByWithRelationInput | SymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Symptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Symptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Symptoms
    **/
    _count?: true | SymptomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SymptomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SymptomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SymptomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SymptomMaxAggregateInputType
  }

  export type GetSymptomAggregateType<T extends SymptomAggregateArgs> = {
        [P in keyof T & keyof AggregateSymptom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSymptom[P]>
      : GetScalarType<T[P], AggregateSymptom[P]>
  }




  export type SymptomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SymptomWhereInput
    orderBy?: SymptomOrderByWithAggregationInput | SymptomOrderByWithAggregationInput[]
    by: SymptomScalarFieldEnum[] | SymptomScalarFieldEnum
    having?: SymptomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SymptomCountAggregateInputType | true
    _avg?: SymptomAvgAggregateInputType
    _sum?: SymptomSumAggregateInputType
    _min?: SymptomMinAggregateInputType
    _max?: SymptomMaxAggregateInputType
  }

  export type SymptomGroupByOutputType = {
    symptom_id: number
    name: string
    _count: SymptomCountAggregateOutputType | null
    _avg: SymptomAvgAggregateOutputType | null
    _sum: SymptomSumAggregateOutputType | null
    _min: SymptomMinAggregateOutputType | null
    _max: SymptomMaxAggregateOutputType | null
  }

  type GetSymptomGroupByPayload<T extends SymptomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SymptomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SymptomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SymptomGroupByOutputType[P]>
            : GetScalarType<T[P], SymptomGroupByOutputType[P]>
        }
      >
    >


  export type SymptomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symptom_id?: boolean
    name?: boolean
    consultationSymptoms?: boolean | Symptom$consultationSymptomsArgs<ExtArgs>
    _count?: boolean | SymptomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["symptom"]>



  export type SymptomSelectScalar = {
    symptom_id?: boolean
    name?: boolean
  }

  export type SymptomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"symptom_id" | "name", ExtArgs["result"]["symptom"]>
  export type SymptomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultationSymptoms?: boolean | Symptom$consultationSymptomsArgs<ExtArgs>
    _count?: boolean | SymptomCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SymptomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Symptom"
    objects: {
      consultationSymptoms: Prisma.$ConsultationSymptomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      symptom_id: number
      name: string
    }, ExtArgs["result"]["symptom"]>
    composites: {}
  }

  type SymptomGetPayload<S extends boolean | null | undefined | SymptomDefaultArgs> = $Result.GetResult<Prisma.$SymptomPayload, S>

  type SymptomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SymptomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SymptomCountAggregateInputType | true
    }

  export interface SymptomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Symptom'], meta: { name: 'Symptom' } }
    /**
     * Find zero or one Symptom that matches the filter.
     * @param {SymptomFindUniqueArgs} args - Arguments to find a Symptom
     * @example
     * // Get one Symptom
     * const symptom = await prisma.symptom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SymptomFindUniqueArgs>(args: SelectSubset<T, SymptomFindUniqueArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Symptom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SymptomFindUniqueOrThrowArgs} args - Arguments to find a Symptom
     * @example
     * // Get one Symptom
     * const symptom = await prisma.symptom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SymptomFindUniqueOrThrowArgs>(args: SelectSubset<T, SymptomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Symptom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomFindFirstArgs} args - Arguments to find a Symptom
     * @example
     * // Get one Symptom
     * const symptom = await prisma.symptom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SymptomFindFirstArgs>(args?: SelectSubset<T, SymptomFindFirstArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Symptom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomFindFirstOrThrowArgs} args - Arguments to find a Symptom
     * @example
     * // Get one Symptom
     * const symptom = await prisma.symptom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SymptomFindFirstOrThrowArgs>(args?: SelectSubset<T, SymptomFindFirstOrThrowArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Symptoms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Symptoms
     * const symptoms = await prisma.symptom.findMany()
     * 
     * // Get first 10 Symptoms
     * const symptoms = await prisma.symptom.findMany({ take: 10 })
     * 
     * // Only select the `symptom_id`
     * const symptomWithSymptom_idOnly = await prisma.symptom.findMany({ select: { symptom_id: true } })
     * 
     */
    findMany<T extends SymptomFindManyArgs>(args?: SelectSubset<T, SymptomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Symptom.
     * @param {SymptomCreateArgs} args - Arguments to create a Symptom.
     * @example
     * // Create one Symptom
     * const Symptom = await prisma.symptom.create({
     *   data: {
     *     // ... data to create a Symptom
     *   }
     * })
     * 
     */
    create<T extends SymptomCreateArgs>(args: SelectSubset<T, SymptomCreateArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Symptoms.
     * @param {SymptomCreateManyArgs} args - Arguments to create many Symptoms.
     * @example
     * // Create many Symptoms
     * const symptom = await prisma.symptom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SymptomCreateManyArgs>(args?: SelectSubset<T, SymptomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Symptom.
     * @param {SymptomDeleteArgs} args - Arguments to delete one Symptom.
     * @example
     * // Delete one Symptom
     * const Symptom = await prisma.symptom.delete({
     *   where: {
     *     // ... filter to delete one Symptom
     *   }
     * })
     * 
     */
    delete<T extends SymptomDeleteArgs>(args: SelectSubset<T, SymptomDeleteArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Symptom.
     * @param {SymptomUpdateArgs} args - Arguments to update one Symptom.
     * @example
     * // Update one Symptom
     * const symptom = await prisma.symptom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SymptomUpdateArgs>(args: SelectSubset<T, SymptomUpdateArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Symptoms.
     * @param {SymptomDeleteManyArgs} args - Arguments to filter Symptoms to delete.
     * @example
     * // Delete a few Symptoms
     * const { count } = await prisma.symptom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SymptomDeleteManyArgs>(args?: SelectSubset<T, SymptomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Symptoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Symptoms
     * const symptom = await prisma.symptom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SymptomUpdateManyArgs>(args: SelectSubset<T, SymptomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Symptom.
     * @param {SymptomUpsertArgs} args - Arguments to update or create a Symptom.
     * @example
     * // Update or create a Symptom
     * const symptom = await prisma.symptom.upsert({
     *   create: {
     *     // ... data to create a Symptom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Symptom we want to update
     *   }
     * })
     */
    upsert<T extends SymptomUpsertArgs>(args: SelectSubset<T, SymptomUpsertArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Symptoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomCountArgs} args - Arguments to filter Symptoms to count.
     * @example
     * // Count the number of Symptoms
     * const count = await prisma.symptom.count({
     *   where: {
     *     // ... the filter for the Symptoms we want to count
     *   }
     * })
    **/
    count<T extends SymptomCountArgs>(
      args?: Subset<T, SymptomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SymptomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Symptom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SymptomAggregateArgs>(args: Subset<T, SymptomAggregateArgs>): Prisma.PrismaPromise<GetSymptomAggregateType<T>>

    /**
     * Group by Symptom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SymptomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SymptomGroupByArgs['orderBy'] }
        : { orderBy?: SymptomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SymptomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSymptomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Symptom model
   */
  readonly fields: SymptomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Symptom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SymptomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultationSymptoms<T extends Symptom$consultationSymptomsArgs<ExtArgs> = {}>(args?: Subset<T, Symptom$consultationSymptomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Symptom model
   */
  interface SymptomFieldRefs {
    readonly symptom_id: FieldRef<"Symptom", 'Int'>
    readonly name: FieldRef<"Symptom", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Symptom findUnique
   */
  export type SymptomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter, which Symptom to fetch.
     */
    where: SymptomWhereUniqueInput
  }

  /**
   * Symptom findUniqueOrThrow
   */
  export type SymptomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter, which Symptom to fetch.
     */
    where: SymptomWhereUniqueInput
  }

  /**
   * Symptom findFirst
   */
  export type SymptomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter, which Symptom to fetch.
     */
    where?: SymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Symptoms to fetch.
     */
    orderBy?: SymptomOrderByWithRelationInput | SymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Symptoms.
     */
    cursor?: SymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Symptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Symptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Symptoms.
     */
    distinct?: SymptomScalarFieldEnum | SymptomScalarFieldEnum[]
  }

  /**
   * Symptom findFirstOrThrow
   */
  export type SymptomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter, which Symptom to fetch.
     */
    where?: SymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Symptoms to fetch.
     */
    orderBy?: SymptomOrderByWithRelationInput | SymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Symptoms.
     */
    cursor?: SymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Symptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Symptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Symptoms.
     */
    distinct?: SymptomScalarFieldEnum | SymptomScalarFieldEnum[]
  }

  /**
   * Symptom findMany
   */
  export type SymptomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter, which Symptoms to fetch.
     */
    where?: SymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Symptoms to fetch.
     */
    orderBy?: SymptomOrderByWithRelationInput | SymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Symptoms.
     */
    cursor?: SymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Symptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Symptoms.
     */
    skip?: number
    distinct?: SymptomScalarFieldEnum | SymptomScalarFieldEnum[]
  }

  /**
   * Symptom create
   */
  export type SymptomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * The data needed to create a Symptom.
     */
    data: XOR<SymptomCreateInput, SymptomUncheckedCreateInput>
  }

  /**
   * Symptom createMany
   */
  export type SymptomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Symptoms.
     */
    data: SymptomCreateManyInput | SymptomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Symptom update
   */
  export type SymptomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * The data needed to update a Symptom.
     */
    data: XOR<SymptomUpdateInput, SymptomUncheckedUpdateInput>
    /**
     * Choose, which Symptom to update.
     */
    where: SymptomWhereUniqueInput
  }

  /**
   * Symptom updateMany
   */
  export type SymptomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Symptoms.
     */
    data: XOR<SymptomUpdateManyMutationInput, SymptomUncheckedUpdateManyInput>
    /**
     * Filter which Symptoms to update
     */
    where?: SymptomWhereInput
    /**
     * Limit how many Symptoms to update.
     */
    limit?: number
  }

  /**
   * Symptom upsert
   */
  export type SymptomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * The filter to search for the Symptom to update in case it exists.
     */
    where: SymptomWhereUniqueInput
    /**
     * In case the Symptom found by the `where` argument doesn't exist, create a new Symptom with this data.
     */
    create: XOR<SymptomCreateInput, SymptomUncheckedCreateInput>
    /**
     * In case the Symptom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SymptomUpdateInput, SymptomUncheckedUpdateInput>
  }

  /**
   * Symptom delete
   */
  export type SymptomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
    /**
     * Filter which Symptom to delete.
     */
    where: SymptomWhereUniqueInput
  }

  /**
   * Symptom deleteMany
   */
  export type SymptomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Symptoms to delete
     */
    where?: SymptomWhereInput
    /**
     * Limit how many Symptoms to delete.
     */
    limit?: number
  }

  /**
   * Symptom.consultationSymptoms
   */
  export type Symptom$consultationSymptomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    where?: ConsultationSymptomWhereInput
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    cursor?: ConsultationSymptomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationSymptomScalarFieldEnum | ConsultationSymptomScalarFieldEnum[]
  }

  /**
   * Symptom without action
   */
  export type SymptomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Symptom
     */
    select?: SymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Symptom
     */
    omit?: SymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SymptomInclude<ExtArgs> | null
  }


  /**
   * Model Examination
   */

  export type AggregateExamination = {
    _count: ExaminationCountAggregateOutputType | null
    _avg: ExaminationAvgAggregateOutputType | null
    _sum: ExaminationSumAggregateOutputType | null
    _min: ExaminationMinAggregateOutputType | null
    _max: ExaminationMaxAggregateOutputType | null
  }

  export type ExaminationAvgAggregateOutputType = {
    examination_id: number | null
    consultation_id: number | null
  }

  export type ExaminationSumAggregateOutputType = {
    examination_id: number | null
    consultation_id: number | null
  }

  export type ExaminationMinAggregateOutputType = {
    examination_id: number | null
    consultation_id: number | null
    title: string | null
    result: string | null
  }

  export type ExaminationMaxAggregateOutputType = {
    examination_id: number | null
    consultation_id: number | null
    title: string | null
    result: string | null
  }

  export type ExaminationCountAggregateOutputType = {
    examination_id: number
    consultation_id: number
    title: number
    result: number
    _all: number
  }


  export type ExaminationAvgAggregateInputType = {
    examination_id?: true
    consultation_id?: true
  }

  export type ExaminationSumAggregateInputType = {
    examination_id?: true
    consultation_id?: true
  }

  export type ExaminationMinAggregateInputType = {
    examination_id?: true
    consultation_id?: true
    title?: true
    result?: true
  }

  export type ExaminationMaxAggregateInputType = {
    examination_id?: true
    consultation_id?: true
    title?: true
    result?: true
  }

  export type ExaminationCountAggregateInputType = {
    examination_id?: true
    consultation_id?: true
    title?: true
    result?: true
    _all?: true
  }

  export type ExaminationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Examination to aggregate.
     */
    where?: ExaminationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examinations to fetch.
     */
    orderBy?: ExaminationOrderByWithRelationInput | ExaminationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExaminationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Examinations
    **/
    _count?: true | ExaminationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExaminationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExaminationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExaminationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExaminationMaxAggregateInputType
  }

  export type GetExaminationAggregateType<T extends ExaminationAggregateArgs> = {
        [P in keyof T & keyof AggregateExamination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamination[P]>
      : GetScalarType<T[P], AggregateExamination[P]>
  }




  export type ExaminationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExaminationWhereInput
    orderBy?: ExaminationOrderByWithAggregationInput | ExaminationOrderByWithAggregationInput[]
    by: ExaminationScalarFieldEnum[] | ExaminationScalarFieldEnum
    having?: ExaminationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExaminationCountAggregateInputType | true
    _avg?: ExaminationAvgAggregateInputType
    _sum?: ExaminationSumAggregateInputType
    _min?: ExaminationMinAggregateInputType
    _max?: ExaminationMaxAggregateInputType
  }

  export type ExaminationGroupByOutputType = {
    examination_id: number
    consultation_id: number
    title: string
    result: string
    _count: ExaminationCountAggregateOutputType | null
    _avg: ExaminationAvgAggregateOutputType | null
    _sum: ExaminationSumAggregateOutputType | null
    _min: ExaminationMinAggregateOutputType | null
    _max: ExaminationMaxAggregateOutputType | null
  }

  type GetExaminationGroupByPayload<T extends ExaminationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExaminationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExaminationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExaminationGroupByOutputType[P]>
            : GetScalarType<T[P], ExaminationGroupByOutputType[P]>
        }
      >
    >


  export type ExaminationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    examination_id?: boolean
    consultation_id?: boolean
    title?: boolean
    result?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examination"]>



  export type ExaminationSelectScalar = {
    examination_id?: boolean
    consultation_id?: boolean
    title?: boolean
    result?: boolean
  }

  export type ExaminationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"examination_id" | "consultation_id" | "title" | "result", ExtArgs["result"]["examination"]>
  export type ExaminationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $ExaminationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Examination"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      examination_id: number
      consultation_id: number
      title: string
      result: string
    }, ExtArgs["result"]["examination"]>
    composites: {}
  }

  type ExaminationGetPayload<S extends boolean | null | undefined | ExaminationDefaultArgs> = $Result.GetResult<Prisma.$ExaminationPayload, S>

  type ExaminationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExaminationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExaminationCountAggregateInputType | true
    }

  export interface ExaminationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Examination'], meta: { name: 'Examination' } }
    /**
     * Find zero or one Examination that matches the filter.
     * @param {ExaminationFindUniqueArgs} args - Arguments to find a Examination
     * @example
     * // Get one Examination
     * const examination = await prisma.examination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExaminationFindUniqueArgs>(args: SelectSubset<T, ExaminationFindUniqueArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Examination that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExaminationFindUniqueOrThrowArgs} args - Arguments to find a Examination
     * @example
     * // Get one Examination
     * const examination = await prisma.examination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExaminationFindUniqueOrThrowArgs>(args: SelectSubset<T, ExaminationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Examination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationFindFirstArgs} args - Arguments to find a Examination
     * @example
     * // Get one Examination
     * const examination = await prisma.examination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExaminationFindFirstArgs>(args?: SelectSubset<T, ExaminationFindFirstArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Examination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationFindFirstOrThrowArgs} args - Arguments to find a Examination
     * @example
     * // Get one Examination
     * const examination = await prisma.examination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExaminationFindFirstOrThrowArgs>(args?: SelectSubset<T, ExaminationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Examinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Examinations
     * const examinations = await prisma.examination.findMany()
     * 
     * // Get first 10 Examinations
     * const examinations = await prisma.examination.findMany({ take: 10 })
     * 
     * // Only select the `examination_id`
     * const examinationWithExamination_idOnly = await prisma.examination.findMany({ select: { examination_id: true } })
     * 
     */
    findMany<T extends ExaminationFindManyArgs>(args?: SelectSubset<T, ExaminationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Examination.
     * @param {ExaminationCreateArgs} args - Arguments to create a Examination.
     * @example
     * // Create one Examination
     * const Examination = await prisma.examination.create({
     *   data: {
     *     // ... data to create a Examination
     *   }
     * })
     * 
     */
    create<T extends ExaminationCreateArgs>(args: SelectSubset<T, ExaminationCreateArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Examinations.
     * @param {ExaminationCreateManyArgs} args - Arguments to create many Examinations.
     * @example
     * // Create many Examinations
     * const examination = await prisma.examination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExaminationCreateManyArgs>(args?: SelectSubset<T, ExaminationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Examination.
     * @param {ExaminationDeleteArgs} args - Arguments to delete one Examination.
     * @example
     * // Delete one Examination
     * const Examination = await prisma.examination.delete({
     *   where: {
     *     // ... filter to delete one Examination
     *   }
     * })
     * 
     */
    delete<T extends ExaminationDeleteArgs>(args: SelectSubset<T, ExaminationDeleteArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Examination.
     * @param {ExaminationUpdateArgs} args - Arguments to update one Examination.
     * @example
     * // Update one Examination
     * const examination = await prisma.examination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExaminationUpdateArgs>(args: SelectSubset<T, ExaminationUpdateArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Examinations.
     * @param {ExaminationDeleteManyArgs} args - Arguments to filter Examinations to delete.
     * @example
     * // Delete a few Examinations
     * const { count } = await prisma.examination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExaminationDeleteManyArgs>(args?: SelectSubset<T, ExaminationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Examinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Examinations
     * const examination = await prisma.examination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExaminationUpdateManyArgs>(args: SelectSubset<T, ExaminationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Examination.
     * @param {ExaminationUpsertArgs} args - Arguments to update or create a Examination.
     * @example
     * // Update or create a Examination
     * const examination = await prisma.examination.upsert({
     *   create: {
     *     // ... data to create a Examination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Examination we want to update
     *   }
     * })
     */
    upsert<T extends ExaminationUpsertArgs>(args: SelectSubset<T, ExaminationUpsertArgs<ExtArgs>>): Prisma__ExaminationClient<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Examinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationCountArgs} args - Arguments to filter Examinations to count.
     * @example
     * // Count the number of Examinations
     * const count = await prisma.examination.count({
     *   where: {
     *     // ... the filter for the Examinations we want to count
     *   }
     * })
    **/
    count<T extends ExaminationCountArgs>(
      args?: Subset<T, ExaminationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExaminationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Examination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExaminationAggregateArgs>(args: Subset<T, ExaminationAggregateArgs>): Prisma.PrismaPromise<GetExaminationAggregateType<T>>

    /**
     * Group by Examination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExaminationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExaminationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExaminationGroupByArgs['orderBy'] }
        : { orderBy?: ExaminationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExaminationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExaminationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Examination model
   */
  readonly fields: ExaminationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Examination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExaminationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Examination model
   */
  interface ExaminationFieldRefs {
    readonly examination_id: FieldRef<"Examination", 'Int'>
    readonly consultation_id: FieldRef<"Examination", 'Int'>
    readonly title: FieldRef<"Examination", 'String'>
    readonly result: FieldRef<"Examination", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Examination findUnique
   */
  export type ExaminationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter, which Examination to fetch.
     */
    where: ExaminationWhereUniqueInput
  }

  /**
   * Examination findUniqueOrThrow
   */
  export type ExaminationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter, which Examination to fetch.
     */
    where: ExaminationWhereUniqueInput
  }

  /**
   * Examination findFirst
   */
  export type ExaminationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter, which Examination to fetch.
     */
    where?: ExaminationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examinations to fetch.
     */
    orderBy?: ExaminationOrderByWithRelationInput | ExaminationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Examinations.
     */
    cursor?: ExaminationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Examinations.
     */
    distinct?: ExaminationScalarFieldEnum | ExaminationScalarFieldEnum[]
  }

  /**
   * Examination findFirstOrThrow
   */
  export type ExaminationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter, which Examination to fetch.
     */
    where?: ExaminationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examinations to fetch.
     */
    orderBy?: ExaminationOrderByWithRelationInput | ExaminationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Examinations.
     */
    cursor?: ExaminationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Examinations.
     */
    distinct?: ExaminationScalarFieldEnum | ExaminationScalarFieldEnum[]
  }

  /**
   * Examination findMany
   */
  export type ExaminationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter, which Examinations to fetch.
     */
    where?: ExaminationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examinations to fetch.
     */
    orderBy?: ExaminationOrderByWithRelationInput | ExaminationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Examinations.
     */
    cursor?: ExaminationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examinations.
     */
    skip?: number
    distinct?: ExaminationScalarFieldEnum | ExaminationScalarFieldEnum[]
  }

  /**
   * Examination create
   */
  export type ExaminationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * The data needed to create a Examination.
     */
    data: XOR<ExaminationCreateInput, ExaminationUncheckedCreateInput>
  }

  /**
   * Examination createMany
   */
  export type ExaminationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Examinations.
     */
    data: ExaminationCreateManyInput | ExaminationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Examination update
   */
  export type ExaminationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * The data needed to update a Examination.
     */
    data: XOR<ExaminationUpdateInput, ExaminationUncheckedUpdateInput>
    /**
     * Choose, which Examination to update.
     */
    where: ExaminationWhereUniqueInput
  }

  /**
   * Examination updateMany
   */
  export type ExaminationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Examinations.
     */
    data: XOR<ExaminationUpdateManyMutationInput, ExaminationUncheckedUpdateManyInput>
    /**
     * Filter which Examinations to update
     */
    where?: ExaminationWhereInput
    /**
     * Limit how many Examinations to update.
     */
    limit?: number
  }

  /**
   * Examination upsert
   */
  export type ExaminationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * The filter to search for the Examination to update in case it exists.
     */
    where: ExaminationWhereUniqueInput
    /**
     * In case the Examination found by the `where` argument doesn't exist, create a new Examination with this data.
     */
    create: XOR<ExaminationCreateInput, ExaminationUncheckedCreateInput>
    /**
     * In case the Examination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExaminationUpdateInput, ExaminationUncheckedUpdateInput>
  }

  /**
   * Examination delete
   */
  export type ExaminationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    /**
     * Filter which Examination to delete.
     */
    where: ExaminationWhereUniqueInput
  }

  /**
   * Examination deleteMany
   */
  export type ExaminationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Examinations to delete
     */
    where?: ExaminationWhereInput
    /**
     * Limit how many Examinations to delete.
     */
    limit?: number
  }

  /**
   * Examination without action
   */
  export type ExaminationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
  }


  /**
   * Model ConsultationSymptom
   */

  export type AggregateConsultationSymptom = {
    _count: ConsultationSymptomCountAggregateOutputType | null
    _avg: ConsultationSymptomAvgAggregateOutputType | null
    _sum: ConsultationSymptomSumAggregateOutputType | null
    _min: ConsultationSymptomMinAggregateOutputType | null
    _max: ConsultationSymptomMaxAggregateOutputType | null
  }

  export type ConsultationSymptomAvgAggregateOutputType = {
    consultation_symptom_id: number | null
    consultation_id: number | null
    symptom_id: number | null
    severity: number | null
    duration_value: number | null
  }

  export type ConsultationSymptomSumAggregateOutputType = {
    consultation_symptom_id: number | null
    consultation_id: number | null
    symptom_id: number | null
    severity: number | null
    duration_value: number | null
  }

  export type ConsultationSymptomMinAggregateOutputType = {
    consultation_symptom_id: number | null
    consultation_id: number | null
    symptom_id: number | null
    severity: number | null
    duration_value: number | null
    duration_unit: string | null
  }

  export type ConsultationSymptomMaxAggregateOutputType = {
    consultation_symptom_id: number | null
    consultation_id: number | null
    symptom_id: number | null
    severity: number | null
    duration_value: number | null
    duration_unit: string | null
  }

  export type ConsultationSymptomCountAggregateOutputType = {
    consultation_symptom_id: number
    consultation_id: number
    symptom_id: number
    severity: number
    duration_value: number
    duration_unit: number
    _all: number
  }


  export type ConsultationSymptomAvgAggregateInputType = {
    consultation_symptom_id?: true
    consultation_id?: true
    symptom_id?: true
    severity?: true
    duration_value?: true
  }

  export type ConsultationSymptomSumAggregateInputType = {
    consultation_symptom_id?: true
    consultation_id?: true
    symptom_id?: true
    severity?: true
    duration_value?: true
  }

  export type ConsultationSymptomMinAggregateInputType = {
    consultation_symptom_id?: true
    consultation_id?: true
    symptom_id?: true
    severity?: true
    duration_value?: true
    duration_unit?: true
  }

  export type ConsultationSymptomMaxAggregateInputType = {
    consultation_symptom_id?: true
    consultation_id?: true
    symptom_id?: true
    severity?: true
    duration_value?: true
    duration_unit?: true
  }

  export type ConsultationSymptomCountAggregateInputType = {
    consultation_symptom_id?: true
    consultation_id?: true
    symptom_id?: true
    severity?: true
    duration_value?: true
    duration_unit?: true
    _all?: true
  }

  export type ConsultationSymptomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationSymptom to aggregate.
     */
    where?: ConsultationSymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationSymptoms to fetch.
     */
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationSymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationSymptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationSymptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConsultationSymptoms
    **/
    _count?: true | ConsultationSymptomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultationSymptomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultationSymptomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationSymptomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationSymptomMaxAggregateInputType
  }

  export type GetConsultationSymptomAggregateType<T extends ConsultationSymptomAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultationSymptom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultationSymptom[P]>
      : GetScalarType<T[P], AggregateConsultationSymptom[P]>
  }




  export type ConsultationSymptomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationSymptomWhereInput
    orderBy?: ConsultationSymptomOrderByWithAggregationInput | ConsultationSymptomOrderByWithAggregationInput[]
    by: ConsultationSymptomScalarFieldEnum[] | ConsultationSymptomScalarFieldEnum
    having?: ConsultationSymptomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationSymptomCountAggregateInputType | true
    _avg?: ConsultationSymptomAvgAggregateInputType
    _sum?: ConsultationSymptomSumAggregateInputType
    _min?: ConsultationSymptomMinAggregateInputType
    _max?: ConsultationSymptomMaxAggregateInputType
  }

  export type ConsultationSymptomGroupByOutputType = {
    consultation_symptom_id: number
    consultation_id: number
    symptom_id: number
    severity: number | null
    duration_value: number | null
    duration_unit: string | null
    _count: ConsultationSymptomCountAggregateOutputType | null
    _avg: ConsultationSymptomAvgAggregateOutputType | null
    _sum: ConsultationSymptomSumAggregateOutputType | null
    _min: ConsultationSymptomMinAggregateOutputType | null
    _max: ConsultationSymptomMaxAggregateOutputType | null
  }

  type GetConsultationSymptomGroupByPayload<T extends ConsultationSymptomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationSymptomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationSymptomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationSymptomGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationSymptomGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSymptomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consultation_symptom_id?: boolean
    consultation_id?: boolean
    symptom_id?: boolean
    severity?: boolean
    duration_value?: boolean
    duration_unit?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    symptom?: boolean | SymptomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultationSymptom"]>



  export type ConsultationSymptomSelectScalar = {
    consultation_symptom_id?: boolean
    consultation_id?: boolean
    symptom_id?: boolean
    severity?: boolean
    duration_value?: boolean
    duration_unit?: boolean
  }

  export type ConsultationSymptomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"consultation_symptom_id" | "consultation_id" | "symptom_id" | "severity" | "duration_value" | "duration_unit", ExtArgs["result"]["consultationSymptom"]>
  export type ConsultationSymptomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
    symptom?: boolean | SymptomDefaultArgs<ExtArgs>
  }

  export type $ConsultationSymptomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConsultationSymptom"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
      symptom: Prisma.$SymptomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      consultation_symptom_id: number
      consultation_id: number
      symptom_id: number
      severity: number | null
      duration_value: number | null
      duration_unit: string | null
    }, ExtArgs["result"]["consultationSymptom"]>
    composites: {}
  }

  type ConsultationSymptomGetPayload<S extends boolean | null | undefined | ConsultationSymptomDefaultArgs> = $Result.GetResult<Prisma.$ConsultationSymptomPayload, S>

  type ConsultationSymptomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationSymptomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationSymptomCountAggregateInputType | true
    }

  export interface ConsultationSymptomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConsultationSymptom'], meta: { name: 'ConsultationSymptom' } }
    /**
     * Find zero or one ConsultationSymptom that matches the filter.
     * @param {ConsultationSymptomFindUniqueArgs} args - Arguments to find a ConsultationSymptom
     * @example
     * // Get one ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationSymptomFindUniqueArgs>(args: SelectSubset<T, ConsultationSymptomFindUniqueArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConsultationSymptom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationSymptomFindUniqueOrThrowArgs} args - Arguments to find a ConsultationSymptom
     * @example
     * // Get one ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationSymptomFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationSymptomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsultationSymptom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomFindFirstArgs} args - Arguments to find a ConsultationSymptom
     * @example
     * // Get one ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationSymptomFindFirstArgs>(args?: SelectSubset<T, ConsultationSymptomFindFirstArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsultationSymptom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomFindFirstOrThrowArgs} args - Arguments to find a ConsultationSymptom
     * @example
     * // Get one ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationSymptomFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationSymptomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConsultationSymptoms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConsultationSymptoms
     * const consultationSymptoms = await prisma.consultationSymptom.findMany()
     * 
     * // Get first 10 ConsultationSymptoms
     * const consultationSymptoms = await prisma.consultationSymptom.findMany({ take: 10 })
     * 
     * // Only select the `consultation_symptom_id`
     * const consultationSymptomWithConsultation_symptom_idOnly = await prisma.consultationSymptom.findMany({ select: { consultation_symptom_id: true } })
     * 
     */
    findMany<T extends ConsultationSymptomFindManyArgs>(args?: SelectSubset<T, ConsultationSymptomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConsultationSymptom.
     * @param {ConsultationSymptomCreateArgs} args - Arguments to create a ConsultationSymptom.
     * @example
     * // Create one ConsultationSymptom
     * const ConsultationSymptom = await prisma.consultationSymptom.create({
     *   data: {
     *     // ... data to create a ConsultationSymptom
     *   }
     * })
     * 
     */
    create<T extends ConsultationSymptomCreateArgs>(args: SelectSubset<T, ConsultationSymptomCreateArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConsultationSymptoms.
     * @param {ConsultationSymptomCreateManyArgs} args - Arguments to create many ConsultationSymptoms.
     * @example
     * // Create many ConsultationSymptoms
     * const consultationSymptom = await prisma.consultationSymptom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationSymptomCreateManyArgs>(args?: SelectSubset<T, ConsultationSymptomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ConsultationSymptom.
     * @param {ConsultationSymptomDeleteArgs} args - Arguments to delete one ConsultationSymptom.
     * @example
     * // Delete one ConsultationSymptom
     * const ConsultationSymptom = await prisma.consultationSymptom.delete({
     *   where: {
     *     // ... filter to delete one ConsultationSymptom
     *   }
     * })
     * 
     */
    delete<T extends ConsultationSymptomDeleteArgs>(args: SelectSubset<T, ConsultationSymptomDeleteArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConsultationSymptom.
     * @param {ConsultationSymptomUpdateArgs} args - Arguments to update one ConsultationSymptom.
     * @example
     * // Update one ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationSymptomUpdateArgs>(args: SelectSubset<T, ConsultationSymptomUpdateArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConsultationSymptoms.
     * @param {ConsultationSymptomDeleteManyArgs} args - Arguments to filter ConsultationSymptoms to delete.
     * @example
     * // Delete a few ConsultationSymptoms
     * const { count } = await prisma.consultationSymptom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationSymptomDeleteManyArgs>(args?: SelectSubset<T, ConsultationSymptomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsultationSymptoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConsultationSymptoms
     * const consultationSymptom = await prisma.consultationSymptom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationSymptomUpdateManyArgs>(args: SelectSubset<T, ConsultationSymptomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ConsultationSymptom.
     * @param {ConsultationSymptomUpsertArgs} args - Arguments to update or create a ConsultationSymptom.
     * @example
     * // Update or create a ConsultationSymptom
     * const consultationSymptom = await prisma.consultationSymptom.upsert({
     *   create: {
     *     // ... data to create a ConsultationSymptom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConsultationSymptom we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationSymptomUpsertArgs>(args: SelectSubset<T, ConsultationSymptomUpsertArgs<ExtArgs>>): Prisma__ConsultationSymptomClient<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConsultationSymptoms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomCountArgs} args - Arguments to filter ConsultationSymptoms to count.
     * @example
     * // Count the number of ConsultationSymptoms
     * const count = await prisma.consultationSymptom.count({
     *   where: {
     *     // ... the filter for the ConsultationSymptoms we want to count
     *   }
     * })
    **/
    count<T extends ConsultationSymptomCountArgs>(
      args?: Subset<T, ConsultationSymptomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationSymptomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConsultationSymptom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationSymptomAggregateArgs>(args: Subset<T, ConsultationSymptomAggregateArgs>): Prisma.PrismaPromise<GetConsultationSymptomAggregateType<T>>

    /**
     * Group by ConsultationSymptom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationSymptomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationSymptomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationSymptomGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationSymptomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationSymptomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationSymptomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConsultationSymptom model
   */
  readonly fields: ConsultationSymptomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConsultationSymptom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationSymptomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    symptom<T extends SymptomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SymptomDefaultArgs<ExtArgs>>): Prisma__SymptomClient<$Result.GetResult<Prisma.$SymptomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConsultationSymptom model
   */
  interface ConsultationSymptomFieldRefs {
    readonly consultation_symptom_id: FieldRef<"ConsultationSymptom", 'Int'>
    readonly consultation_id: FieldRef<"ConsultationSymptom", 'Int'>
    readonly symptom_id: FieldRef<"ConsultationSymptom", 'Int'>
    readonly severity: FieldRef<"ConsultationSymptom", 'Float'>
    readonly duration_value: FieldRef<"ConsultationSymptom", 'Float'>
    readonly duration_unit: FieldRef<"ConsultationSymptom", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConsultationSymptom findUnique
   */
  export type ConsultationSymptomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationSymptom to fetch.
     */
    where: ConsultationSymptomWhereUniqueInput
  }

  /**
   * ConsultationSymptom findUniqueOrThrow
   */
  export type ConsultationSymptomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationSymptom to fetch.
     */
    where: ConsultationSymptomWhereUniqueInput
  }

  /**
   * ConsultationSymptom findFirst
   */
  export type ConsultationSymptomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationSymptom to fetch.
     */
    where?: ConsultationSymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationSymptoms to fetch.
     */
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationSymptoms.
     */
    cursor?: ConsultationSymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationSymptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationSymptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationSymptoms.
     */
    distinct?: ConsultationSymptomScalarFieldEnum | ConsultationSymptomScalarFieldEnum[]
  }

  /**
   * ConsultationSymptom findFirstOrThrow
   */
  export type ConsultationSymptomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationSymptom to fetch.
     */
    where?: ConsultationSymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationSymptoms to fetch.
     */
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationSymptoms.
     */
    cursor?: ConsultationSymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationSymptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationSymptoms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationSymptoms.
     */
    distinct?: ConsultationSymptomScalarFieldEnum | ConsultationSymptomScalarFieldEnum[]
  }

  /**
   * ConsultationSymptom findMany
   */
  export type ConsultationSymptomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationSymptoms to fetch.
     */
    where?: ConsultationSymptomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationSymptoms to fetch.
     */
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConsultationSymptoms.
     */
    cursor?: ConsultationSymptomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationSymptoms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationSymptoms.
     */
    skip?: number
    distinct?: ConsultationSymptomScalarFieldEnum | ConsultationSymptomScalarFieldEnum[]
  }

  /**
   * ConsultationSymptom create
   */
  export type ConsultationSymptomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * The data needed to create a ConsultationSymptom.
     */
    data: XOR<ConsultationSymptomCreateInput, ConsultationSymptomUncheckedCreateInput>
  }

  /**
   * ConsultationSymptom createMany
   */
  export type ConsultationSymptomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConsultationSymptoms.
     */
    data: ConsultationSymptomCreateManyInput | ConsultationSymptomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConsultationSymptom update
   */
  export type ConsultationSymptomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * The data needed to update a ConsultationSymptom.
     */
    data: XOR<ConsultationSymptomUpdateInput, ConsultationSymptomUncheckedUpdateInput>
    /**
     * Choose, which ConsultationSymptom to update.
     */
    where: ConsultationSymptomWhereUniqueInput
  }

  /**
   * ConsultationSymptom updateMany
   */
  export type ConsultationSymptomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConsultationSymptoms.
     */
    data: XOR<ConsultationSymptomUpdateManyMutationInput, ConsultationSymptomUncheckedUpdateManyInput>
    /**
     * Filter which ConsultationSymptoms to update
     */
    where?: ConsultationSymptomWhereInput
    /**
     * Limit how many ConsultationSymptoms to update.
     */
    limit?: number
  }

  /**
   * ConsultationSymptom upsert
   */
  export type ConsultationSymptomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * The filter to search for the ConsultationSymptom to update in case it exists.
     */
    where: ConsultationSymptomWhereUniqueInput
    /**
     * In case the ConsultationSymptom found by the `where` argument doesn't exist, create a new ConsultationSymptom with this data.
     */
    create: XOR<ConsultationSymptomCreateInput, ConsultationSymptomUncheckedCreateInput>
    /**
     * In case the ConsultationSymptom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationSymptomUpdateInput, ConsultationSymptomUncheckedUpdateInput>
  }

  /**
   * ConsultationSymptom delete
   */
  export type ConsultationSymptomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    /**
     * Filter which ConsultationSymptom to delete.
     */
    where: ConsultationSymptomWhereUniqueInput
  }

  /**
   * ConsultationSymptom deleteMany
   */
  export type ConsultationSymptomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationSymptoms to delete
     */
    where?: ConsultationSymptomWhereInput
    /**
     * Limit how many ConsultationSymptoms to delete.
     */
    limit?: number
  }

  /**
   * ConsultationSymptom without action
   */
  export type ConsultationSymptomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationAvgAggregateOutputType = {
    consultation_id: number | null
    patient_id: number | null
    doctor_id: number | null
  }

  export type ConsultationSumAggregateOutputType = {
    consultation_id: number | null
    patient_id: number | null
    doctor_id: number | null
  }

  export type ConsultationMinAggregateOutputType = {
    consultation_id: number | null
    patient_id: number | null
    doctor_id: number | null
    visit_date: Date | null
    notes: string | null
    created_at: Date | null
  }

  export type ConsultationMaxAggregateOutputType = {
    consultation_id: number | null
    patient_id: number | null
    doctor_id: number | null
    visit_date: Date | null
    notes: string | null
    created_at: Date | null
  }

  export type ConsultationCountAggregateOutputType = {
    consultation_id: number
    patient_id: number
    doctor_id: number
    visit_date: number
    notes: number
    created_at: number
    _all: number
  }


  export type ConsultationAvgAggregateInputType = {
    consultation_id?: true
    patient_id?: true
    doctor_id?: true
  }

  export type ConsultationSumAggregateInputType = {
    consultation_id?: true
    patient_id?: true
    doctor_id?: true
  }

  export type ConsultationMinAggregateInputType = {
    consultation_id?: true
    patient_id?: true
    doctor_id?: true
    visit_date?: true
    notes?: true
    created_at?: true
  }

  export type ConsultationMaxAggregateInputType = {
    consultation_id?: true
    patient_id?: true
    doctor_id?: true
    visit_date?: true
    notes?: true
    created_at?: true
  }

  export type ConsultationCountAggregateInputType = {
    consultation_id?: true
    patient_id?: true
    doctor_id?: true
    visit_date?: true
    notes?: true
    created_at?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _avg?: ConsultationAvgAggregateInputType
    _sum?: ConsultationSumAggregateInputType
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    consultation_id: number
    patient_id: number
    doctor_id: number
    visit_date: Date
    notes: string | null
    created_at: Date
    _count: ConsultationCountAggregateOutputType | null
    _avg: ConsultationAvgAggregateOutputType | null
    _sum: ConsultationSumAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consultation_id?: boolean
    patient_id?: boolean
    doctor_id?: boolean
    visit_date?: boolean
    notes?: boolean
    created_at?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    prescriptions?: boolean | Consultation$prescriptionsArgs<ExtArgs>
    examinations?: boolean | Consultation$examinationsArgs<ExtArgs>
    consultationSymptoms?: boolean | Consultation$consultationSymptomsArgs<ExtArgs>
    investigations?: boolean | Consultation$investigationsArgs<ExtArgs>
    instructions?: boolean | Consultation$instructionsArgs<ExtArgs>
    diagnoses?: boolean | Consultation$diagnosesArgs<ExtArgs>
    _count?: boolean | ConsultationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>



  export type ConsultationSelectScalar = {
    consultation_id?: boolean
    patient_id?: boolean
    doctor_id?: boolean
    visit_date?: boolean
    notes?: boolean
    created_at?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"consultation_id" | "patient_id" | "doctor_id" | "visit_date" | "notes" | "created_at", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    prescriptions?: boolean | Consultation$prescriptionsArgs<ExtArgs>
    examinations?: boolean | Consultation$examinationsArgs<ExtArgs>
    consultationSymptoms?: boolean | Consultation$consultationSymptomsArgs<ExtArgs>
    investigations?: boolean | Consultation$investigationsArgs<ExtArgs>
    instructions?: boolean | Consultation$instructionsArgs<ExtArgs>
    diagnoses?: boolean | Consultation$diagnosesArgs<ExtArgs>
    _count?: boolean | ConsultationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      examinations: Prisma.$ExaminationPayload<ExtArgs>[]
      consultationSymptoms: Prisma.$ConsultationSymptomPayload<ExtArgs>[]
      investigations: Prisma.$InvestigationPayload<ExtArgs>[]
      instructions: Prisma.$PatientInstructionPayload<ExtArgs>[]
      diagnoses: Prisma.$DiagnosisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      consultation_id: number
      patient_id: number
      doctor_id: number
      visit_date: Date
      notes: string | null
      created_at: Date
    }, ExtArgs["result"]["consultation"]>
    composites: {}
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `consultation_id`
     * const consultationWithConsultation_idOnly = await prisma.consultation.findMany({ select: { consultation_id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prescriptions<T extends Consultation$prescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    examinations<T extends Consultation$examinationsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$examinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExaminationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultationSymptoms<T extends Consultation$consultationSymptomsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$consultationSymptomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationSymptomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    investigations<T extends Consultation$investigationsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$investigationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    instructions<T extends Consultation$instructionsArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$instructionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    diagnoses<T extends Consultation$diagnosesArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$diagnosesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly consultation_id: FieldRef<"Consultation", 'Int'>
    readonly patient_id: FieldRef<"Consultation", 'Int'>
    readonly doctor_id: FieldRef<"Consultation", 'Int'>
    readonly visit_date: FieldRef<"Consultation", 'DateTime'>
    readonly notes: FieldRef<"Consultation", 'String'>
    readonly created_at: FieldRef<"Consultation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation.prescriptions
   */
  export type Consultation$prescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Consultation.examinations
   */
  export type Consultation$examinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Examination
     */
    select?: ExaminationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Examination
     */
    omit?: ExaminationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExaminationInclude<ExtArgs> | null
    where?: ExaminationWhereInput
    orderBy?: ExaminationOrderByWithRelationInput | ExaminationOrderByWithRelationInput[]
    cursor?: ExaminationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExaminationScalarFieldEnum | ExaminationScalarFieldEnum[]
  }

  /**
   * Consultation.consultationSymptoms
   */
  export type Consultation$consultationSymptomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationSymptom
     */
    select?: ConsultationSymptomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationSymptom
     */
    omit?: ConsultationSymptomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationSymptomInclude<ExtArgs> | null
    where?: ConsultationSymptomWhereInput
    orderBy?: ConsultationSymptomOrderByWithRelationInput | ConsultationSymptomOrderByWithRelationInput[]
    cursor?: ConsultationSymptomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationSymptomScalarFieldEnum | ConsultationSymptomScalarFieldEnum[]
  }

  /**
   * Consultation.investigations
   */
  export type Consultation$investigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    where?: InvestigationWhereInput
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    cursor?: InvestigationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Consultation.instructions
   */
  export type Consultation$instructionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    where?: PatientInstructionWhereInput
    orderBy?: PatientInstructionOrderByWithRelationInput | PatientInstructionOrderByWithRelationInput[]
    cursor?: PatientInstructionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientInstructionScalarFieldEnum | PatientInstructionScalarFieldEnum[]
  }

  /**
   * Consultation.diagnoses
   */
  export type Consultation$diagnosesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    where?: DiagnosisWhereInput
    orderBy?: DiagnosisOrderByWithRelationInput | DiagnosisOrderByWithRelationInput[]
    cursor?: DiagnosisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiagnosisScalarFieldEnum | DiagnosisScalarFieldEnum[]
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Investigation
   */

  export type AggregateInvestigation = {
    _count: InvestigationCountAggregateOutputType | null
    _avg: InvestigationAvgAggregateOutputType | null
    _sum: InvestigationSumAggregateOutputType | null
    _min: InvestigationMinAggregateOutputType | null
    _max: InvestigationMaxAggregateOutputType | null
  }

  export type InvestigationAvgAggregateOutputType = {
    investigation_id: number | null
    consultation_id: number | null
  }

  export type InvestigationSumAggregateOutputType = {
    investigation_id: number | null
    consultation_id: number | null
  }

  export type InvestigationMinAggregateOutputType = {
    investigation_id: number | null
    consultation_id: number | null
    title: string | null
    description: string | null
  }

  export type InvestigationMaxAggregateOutputType = {
    investigation_id: number | null
    consultation_id: number | null
    title: string | null
    description: string | null
  }

  export type InvestigationCountAggregateOutputType = {
    investigation_id: number
    consultation_id: number
    title: number
    description: number
    _all: number
  }


  export type InvestigationAvgAggregateInputType = {
    investigation_id?: true
    consultation_id?: true
  }

  export type InvestigationSumAggregateInputType = {
    investigation_id?: true
    consultation_id?: true
  }

  export type InvestigationMinAggregateInputType = {
    investigation_id?: true
    consultation_id?: true
    title?: true
    description?: true
  }

  export type InvestigationMaxAggregateInputType = {
    investigation_id?: true
    consultation_id?: true
    title?: true
    description?: true
  }

  export type InvestigationCountAggregateInputType = {
    investigation_id?: true
    consultation_id?: true
    title?: true
    description?: true
    _all?: true
  }

  export type InvestigationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investigation to aggregate.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investigations
    **/
    _count?: true | InvestigationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestigationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestigationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestigationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestigationMaxAggregateInputType
  }

  export type GetInvestigationAggregateType<T extends InvestigationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestigation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestigation[P]>
      : GetScalarType<T[P], AggregateInvestigation[P]>
  }




  export type InvestigationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestigationWhereInput
    orderBy?: InvestigationOrderByWithAggregationInput | InvestigationOrderByWithAggregationInput[]
    by: InvestigationScalarFieldEnum[] | InvestigationScalarFieldEnum
    having?: InvestigationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestigationCountAggregateInputType | true
    _avg?: InvestigationAvgAggregateInputType
    _sum?: InvestigationSumAggregateInputType
    _min?: InvestigationMinAggregateInputType
    _max?: InvestigationMaxAggregateInputType
  }

  export type InvestigationGroupByOutputType = {
    investigation_id: number
    consultation_id: number
    title: string
    description: string | null
    _count: InvestigationCountAggregateOutputType | null
    _avg: InvestigationAvgAggregateOutputType | null
    _sum: InvestigationSumAggregateOutputType | null
    _min: InvestigationMinAggregateOutputType | null
    _max: InvestigationMaxAggregateOutputType | null
  }

  type GetInvestigationGroupByPayload<T extends InvestigationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestigationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestigationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestigationGroupByOutputType[P]>
            : GetScalarType<T[P], InvestigationGroupByOutputType[P]>
        }
      >
    >


  export type InvestigationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    investigation_id?: boolean
    consultation_id?: boolean
    title?: boolean
    description?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investigation"]>



  export type InvestigationSelectScalar = {
    investigation_id?: boolean
    consultation_id?: boolean
    title?: boolean
    description?: boolean
  }

  export type InvestigationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"investigation_id" | "consultation_id" | "title" | "description", ExtArgs["result"]["investigation"]>
  export type InvestigationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $InvestigationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investigation"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      investigation_id: number
      consultation_id: number
      title: string
      description: string | null
    }, ExtArgs["result"]["investigation"]>
    composites: {}
  }

  type InvestigationGetPayload<S extends boolean | null | undefined | InvestigationDefaultArgs> = $Result.GetResult<Prisma.$InvestigationPayload, S>

  type InvestigationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvestigationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestigationCountAggregateInputType | true
    }

  export interface InvestigationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investigation'], meta: { name: 'Investigation' } }
    /**
     * Find zero or one Investigation that matches the filter.
     * @param {InvestigationFindUniqueArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestigationFindUniqueArgs>(args: SelectSubset<T, InvestigationFindUniqueArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investigation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestigationFindUniqueOrThrowArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestigationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestigationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investigation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindFirstArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestigationFindFirstArgs>(args?: SelectSubset<T, InvestigationFindFirstArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investigation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindFirstOrThrowArgs} args - Arguments to find a Investigation
     * @example
     * // Get one Investigation
     * const investigation = await prisma.investigation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestigationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestigationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investigations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investigations
     * const investigations = await prisma.investigation.findMany()
     * 
     * // Get first 10 Investigations
     * const investigations = await prisma.investigation.findMany({ take: 10 })
     * 
     * // Only select the `investigation_id`
     * const investigationWithInvestigation_idOnly = await prisma.investigation.findMany({ select: { investigation_id: true } })
     * 
     */
    findMany<T extends InvestigationFindManyArgs>(args?: SelectSubset<T, InvestigationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investigation.
     * @param {InvestigationCreateArgs} args - Arguments to create a Investigation.
     * @example
     * // Create one Investigation
     * const Investigation = await prisma.investigation.create({
     *   data: {
     *     // ... data to create a Investigation
     *   }
     * })
     * 
     */
    create<T extends InvestigationCreateArgs>(args: SelectSubset<T, InvestigationCreateArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investigations.
     * @param {InvestigationCreateManyArgs} args - Arguments to create many Investigations.
     * @example
     * // Create many Investigations
     * const investigation = await prisma.investigation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestigationCreateManyArgs>(args?: SelectSubset<T, InvestigationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Investigation.
     * @param {InvestigationDeleteArgs} args - Arguments to delete one Investigation.
     * @example
     * // Delete one Investigation
     * const Investigation = await prisma.investigation.delete({
     *   where: {
     *     // ... filter to delete one Investigation
     *   }
     * })
     * 
     */
    delete<T extends InvestigationDeleteArgs>(args: SelectSubset<T, InvestigationDeleteArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investigation.
     * @param {InvestigationUpdateArgs} args - Arguments to update one Investigation.
     * @example
     * // Update one Investigation
     * const investigation = await prisma.investigation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestigationUpdateArgs>(args: SelectSubset<T, InvestigationUpdateArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investigations.
     * @param {InvestigationDeleteManyArgs} args - Arguments to filter Investigations to delete.
     * @example
     * // Delete a few Investigations
     * const { count } = await prisma.investigation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestigationDeleteManyArgs>(args?: SelectSubset<T, InvestigationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investigations
     * const investigation = await prisma.investigation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestigationUpdateManyArgs>(args: SelectSubset<T, InvestigationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Investigation.
     * @param {InvestigationUpsertArgs} args - Arguments to update or create a Investigation.
     * @example
     * // Update or create a Investigation
     * const investigation = await prisma.investigation.upsert({
     *   create: {
     *     // ... data to create a Investigation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investigation we want to update
     *   }
     * })
     */
    upsert<T extends InvestigationUpsertArgs>(args: SelectSubset<T, InvestigationUpsertArgs<ExtArgs>>): Prisma__InvestigationClient<$Result.GetResult<Prisma.$InvestigationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationCountArgs} args - Arguments to filter Investigations to count.
     * @example
     * // Count the number of Investigations
     * const count = await prisma.investigation.count({
     *   where: {
     *     // ... the filter for the Investigations we want to count
     *   }
     * })
    **/
    count<T extends InvestigationCountArgs>(
      args?: Subset<T, InvestigationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestigationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvestigationAggregateArgs>(args: Subset<T, InvestigationAggregateArgs>): Prisma.PrismaPromise<GetInvestigationAggregateType<T>>

    /**
     * Group by Investigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestigationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvestigationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestigationGroupByArgs['orderBy'] }
        : { orderBy?: InvestigationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvestigationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestigationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investigation model
   */
  readonly fields: InvestigationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investigation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestigationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Investigation model
   */
  interface InvestigationFieldRefs {
    readonly investigation_id: FieldRef<"Investigation", 'Int'>
    readonly consultation_id: FieldRef<"Investigation", 'Int'>
    readonly title: FieldRef<"Investigation", 'String'>
    readonly description: FieldRef<"Investigation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Investigation findUnique
   */
  export type InvestigationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation findUniqueOrThrow
   */
  export type InvestigationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation findFirst
   */
  export type InvestigationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investigations.
     */
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation findFirstOrThrow
   */
  export type InvestigationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigation to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investigations.
     */
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation findMany
   */
  export type InvestigationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter, which Investigations to fetch.
     */
    where?: InvestigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investigations to fetch.
     */
    orderBy?: InvestigationOrderByWithRelationInput | InvestigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investigations.
     */
    cursor?: InvestigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investigations.
     */
    skip?: number
    distinct?: InvestigationScalarFieldEnum | InvestigationScalarFieldEnum[]
  }

  /**
   * Investigation create
   */
  export type InvestigationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The data needed to create a Investigation.
     */
    data: XOR<InvestigationCreateInput, InvestigationUncheckedCreateInput>
  }

  /**
   * Investigation createMany
   */
  export type InvestigationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investigations.
     */
    data: InvestigationCreateManyInput | InvestigationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Investigation update
   */
  export type InvestigationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The data needed to update a Investigation.
     */
    data: XOR<InvestigationUpdateInput, InvestigationUncheckedUpdateInput>
    /**
     * Choose, which Investigation to update.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation updateMany
   */
  export type InvestigationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investigations.
     */
    data: XOR<InvestigationUpdateManyMutationInput, InvestigationUncheckedUpdateManyInput>
    /**
     * Filter which Investigations to update
     */
    where?: InvestigationWhereInput
    /**
     * Limit how many Investigations to update.
     */
    limit?: number
  }

  /**
   * Investigation upsert
   */
  export type InvestigationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * The filter to search for the Investigation to update in case it exists.
     */
    where: InvestigationWhereUniqueInput
    /**
     * In case the Investigation found by the `where` argument doesn't exist, create a new Investigation with this data.
     */
    create: XOR<InvestigationCreateInput, InvestigationUncheckedCreateInput>
    /**
     * In case the Investigation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestigationUpdateInput, InvestigationUncheckedUpdateInput>
  }

  /**
   * Investigation delete
   */
  export type InvestigationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
    /**
     * Filter which Investigation to delete.
     */
    where: InvestigationWhereUniqueInput
  }

  /**
   * Investigation deleteMany
   */
  export type InvestigationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investigations to delete
     */
    where?: InvestigationWhereInput
    /**
     * Limit how many Investigations to delete.
     */
    limit?: number
  }

  /**
   * Investigation without action
   */
  export type InvestigationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investigation
     */
    select?: InvestigationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investigation
     */
    omit?: InvestigationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestigationInclude<ExtArgs> | null
  }


  /**
   * Model PatientInstruction
   */

  export type AggregatePatientInstruction = {
    _count: PatientInstructionCountAggregateOutputType | null
    _avg: PatientInstructionAvgAggregateOutputType | null
    _sum: PatientInstructionSumAggregateOutputType | null
    _min: PatientInstructionMinAggregateOutputType | null
    _max: PatientInstructionMaxAggregateOutputType | null
  }

  export type PatientInstructionAvgAggregateOutputType = {
    instruction_id: number | null
    consultation_id: number | null
  }

  export type PatientInstructionSumAggregateOutputType = {
    instruction_id: number | null
    consultation_id: number | null
  }

  export type PatientInstructionMinAggregateOutputType = {
    instruction_id: number | null
    consultation_id: number | null
    instruction: string | null
  }

  export type PatientInstructionMaxAggregateOutputType = {
    instruction_id: number | null
    consultation_id: number | null
    instruction: string | null
  }

  export type PatientInstructionCountAggregateOutputType = {
    instruction_id: number
    consultation_id: number
    instruction: number
    _all: number
  }


  export type PatientInstructionAvgAggregateInputType = {
    instruction_id?: true
    consultation_id?: true
  }

  export type PatientInstructionSumAggregateInputType = {
    instruction_id?: true
    consultation_id?: true
  }

  export type PatientInstructionMinAggregateInputType = {
    instruction_id?: true
    consultation_id?: true
    instruction?: true
  }

  export type PatientInstructionMaxAggregateInputType = {
    instruction_id?: true
    consultation_id?: true
    instruction?: true
  }

  export type PatientInstructionCountAggregateInputType = {
    instruction_id?: true
    consultation_id?: true
    instruction?: true
    _all?: true
  }

  export type PatientInstructionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientInstruction to aggregate.
     */
    where?: PatientInstructionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInstructions to fetch.
     */
    orderBy?: PatientInstructionOrderByWithRelationInput | PatientInstructionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientInstructionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInstructions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInstructions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientInstructions
    **/
    _count?: true | PatientInstructionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientInstructionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientInstructionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientInstructionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientInstructionMaxAggregateInputType
  }

  export type GetPatientInstructionAggregateType<T extends PatientInstructionAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientInstruction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientInstruction[P]>
      : GetScalarType<T[P], AggregatePatientInstruction[P]>
  }




  export type PatientInstructionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientInstructionWhereInput
    orderBy?: PatientInstructionOrderByWithAggregationInput | PatientInstructionOrderByWithAggregationInput[]
    by: PatientInstructionScalarFieldEnum[] | PatientInstructionScalarFieldEnum
    having?: PatientInstructionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientInstructionCountAggregateInputType | true
    _avg?: PatientInstructionAvgAggregateInputType
    _sum?: PatientInstructionSumAggregateInputType
    _min?: PatientInstructionMinAggregateInputType
    _max?: PatientInstructionMaxAggregateInputType
  }

  export type PatientInstructionGroupByOutputType = {
    instruction_id: number
    consultation_id: number
    instruction: string
    _count: PatientInstructionCountAggregateOutputType | null
    _avg: PatientInstructionAvgAggregateOutputType | null
    _sum: PatientInstructionSumAggregateOutputType | null
    _min: PatientInstructionMinAggregateOutputType | null
    _max: PatientInstructionMaxAggregateOutputType | null
  }

  type GetPatientInstructionGroupByPayload<T extends PatientInstructionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientInstructionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientInstructionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientInstructionGroupByOutputType[P]>
            : GetScalarType<T[P], PatientInstructionGroupByOutputType[P]>
        }
      >
    >


  export type PatientInstructionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    instruction_id?: boolean
    consultation_id?: boolean
    instruction?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientInstruction"]>



  export type PatientInstructionSelectScalar = {
    instruction_id?: boolean
    consultation_id?: boolean
    instruction?: boolean
  }

  export type PatientInstructionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"instruction_id" | "consultation_id" | "instruction", ExtArgs["result"]["patientInstruction"]>
  export type PatientInstructionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $PatientInstructionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientInstruction"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      instruction_id: number
      consultation_id: number
      instruction: string
    }, ExtArgs["result"]["patientInstruction"]>
    composites: {}
  }

  type PatientInstructionGetPayload<S extends boolean | null | undefined | PatientInstructionDefaultArgs> = $Result.GetResult<Prisma.$PatientInstructionPayload, S>

  type PatientInstructionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientInstructionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientInstructionCountAggregateInputType | true
    }

  export interface PatientInstructionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientInstruction'], meta: { name: 'PatientInstruction' } }
    /**
     * Find zero or one PatientInstruction that matches the filter.
     * @param {PatientInstructionFindUniqueArgs} args - Arguments to find a PatientInstruction
     * @example
     * // Get one PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientInstructionFindUniqueArgs>(args: SelectSubset<T, PatientInstructionFindUniqueArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientInstruction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientInstructionFindUniqueOrThrowArgs} args - Arguments to find a PatientInstruction
     * @example
     * // Get one PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientInstructionFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientInstructionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientInstruction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionFindFirstArgs} args - Arguments to find a PatientInstruction
     * @example
     * // Get one PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientInstructionFindFirstArgs>(args?: SelectSubset<T, PatientInstructionFindFirstArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientInstruction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionFindFirstOrThrowArgs} args - Arguments to find a PatientInstruction
     * @example
     * // Get one PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientInstructionFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientInstructionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientInstructions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientInstructions
     * const patientInstructions = await prisma.patientInstruction.findMany()
     * 
     * // Get first 10 PatientInstructions
     * const patientInstructions = await prisma.patientInstruction.findMany({ take: 10 })
     * 
     * // Only select the `instruction_id`
     * const patientInstructionWithInstruction_idOnly = await prisma.patientInstruction.findMany({ select: { instruction_id: true } })
     * 
     */
    findMany<T extends PatientInstructionFindManyArgs>(args?: SelectSubset<T, PatientInstructionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientInstruction.
     * @param {PatientInstructionCreateArgs} args - Arguments to create a PatientInstruction.
     * @example
     * // Create one PatientInstruction
     * const PatientInstruction = await prisma.patientInstruction.create({
     *   data: {
     *     // ... data to create a PatientInstruction
     *   }
     * })
     * 
     */
    create<T extends PatientInstructionCreateArgs>(args: SelectSubset<T, PatientInstructionCreateArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientInstructions.
     * @param {PatientInstructionCreateManyArgs} args - Arguments to create many PatientInstructions.
     * @example
     * // Create many PatientInstructions
     * const patientInstruction = await prisma.patientInstruction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientInstructionCreateManyArgs>(args?: SelectSubset<T, PatientInstructionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PatientInstruction.
     * @param {PatientInstructionDeleteArgs} args - Arguments to delete one PatientInstruction.
     * @example
     * // Delete one PatientInstruction
     * const PatientInstruction = await prisma.patientInstruction.delete({
     *   where: {
     *     // ... filter to delete one PatientInstruction
     *   }
     * })
     * 
     */
    delete<T extends PatientInstructionDeleteArgs>(args: SelectSubset<T, PatientInstructionDeleteArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientInstruction.
     * @param {PatientInstructionUpdateArgs} args - Arguments to update one PatientInstruction.
     * @example
     * // Update one PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientInstructionUpdateArgs>(args: SelectSubset<T, PatientInstructionUpdateArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientInstructions.
     * @param {PatientInstructionDeleteManyArgs} args - Arguments to filter PatientInstructions to delete.
     * @example
     * // Delete a few PatientInstructions
     * const { count } = await prisma.patientInstruction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientInstructionDeleteManyArgs>(args?: SelectSubset<T, PatientInstructionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientInstructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientInstructions
     * const patientInstruction = await prisma.patientInstruction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientInstructionUpdateManyArgs>(args: SelectSubset<T, PatientInstructionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PatientInstruction.
     * @param {PatientInstructionUpsertArgs} args - Arguments to update or create a PatientInstruction.
     * @example
     * // Update or create a PatientInstruction
     * const patientInstruction = await prisma.patientInstruction.upsert({
     *   create: {
     *     // ... data to create a PatientInstruction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientInstruction we want to update
     *   }
     * })
     */
    upsert<T extends PatientInstructionUpsertArgs>(args: SelectSubset<T, PatientInstructionUpsertArgs<ExtArgs>>): Prisma__PatientInstructionClient<$Result.GetResult<Prisma.$PatientInstructionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientInstructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionCountArgs} args - Arguments to filter PatientInstructions to count.
     * @example
     * // Count the number of PatientInstructions
     * const count = await prisma.patientInstruction.count({
     *   where: {
     *     // ... the filter for the PatientInstructions we want to count
     *   }
     * })
    **/
    count<T extends PatientInstructionCountArgs>(
      args?: Subset<T, PatientInstructionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientInstructionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientInstruction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientInstructionAggregateArgs>(args: Subset<T, PatientInstructionAggregateArgs>): Prisma.PrismaPromise<GetPatientInstructionAggregateType<T>>

    /**
     * Group by PatientInstruction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInstructionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientInstructionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientInstructionGroupByArgs['orderBy'] }
        : { orderBy?: PatientInstructionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientInstructionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientInstructionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientInstruction model
   */
  readonly fields: PatientInstructionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientInstruction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientInstructionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientInstruction model
   */
  interface PatientInstructionFieldRefs {
    readonly instruction_id: FieldRef<"PatientInstruction", 'Int'>
    readonly consultation_id: FieldRef<"PatientInstruction", 'Int'>
    readonly instruction: FieldRef<"PatientInstruction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatientInstruction findUnique
   */
  export type PatientInstructionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter, which PatientInstruction to fetch.
     */
    where: PatientInstructionWhereUniqueInput
  }

  /**
   * PatientInstruction findUniqueOrThrow
   */
  export type PatientInstructionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter, which PatientInstruction to fetch.
     */
    where: PatientInstructionWhereUniqueInput
  }

  /**
   * PatientInstruction findFirst
   */
  export type PatientInstructionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter, which PatientInstruction to fetch.
     */
    where?: PatientInstructionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInstructions to fetch.
     */
    orderBy?: PatientInstructionOrderByWithRelationInput | PatientInstructionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientInstructions.
     */
    cursor?: PatientInstructionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInstructions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInstructions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientInstructions.
     */
    distinct?: PatientInstructionScalarFieldEnum | PatientInstructionScalarFieldEnum[]
  }

  /**
   * PatientInstruction findFirstOrThrow
   */
  export type PatientInstructionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter, which PatientInstruction to fetch.
     */
    where?: PatientInstructionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInstructions to fetch.
     */
    orderBy?: PatientInstructionOrderByWithRelationInput | PatientInstructionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientInstructions.
     */
    cursor?: PatientInstructionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInstructions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInstructions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientInstructions.
     */
    distinct?: PatientInstructionScalarFieldEnum | PatientInstructionScalarFieldEnum[]
  }

  /**
   * PatientInstruction findMany
   */
  export type PatientInstructionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter, which PatientInstructions to fetch.
     */
    where?: PatientInstructionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInstructions to fetch.
     */
    orderBy?: PatientInstructionOrderByWithRelationInput | PatientInstructionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientInstructions.
     */
    cursor?: PatientInstructionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInstructions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInstructions.
     */
    skip?: number
    distinct?: PatientInstructionScalarFieldEnum | PatientInstructionScalarFieldEnum[]
  }

  /**
   * PatientInstruction create
   */
  export type PatientInstructionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientInstruction.
     */
    data: XOR<PatientInstructionCreateInput, PatientInstructionUncheckedCreateInput>
  }

  /**
   * PatientInstruction createMany
   */
  export type PatientInstructionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientInstructions.
     */
    data: PatientInstructionCreateManyInput | PatientInstructionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientInstruction update
   */
  export type PatientInstructionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientInstruction.
     */
    data: XOR<PatientInstructionUpdateInput, PatientInstructionUncheckedUpdateInput>
    /**
     * Choose, which PatientInstruction to update.
     */
    where: PatientInstructionWhereUniqueInput
  }

  /**
   * PatientInstruction updateMany
   */
  export type PatientInstructionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientInstructions.
     */
    data: XOR<PatientInstructionUpdateManyMutationInput, PatientInstructionUncheckedUpdateManyInput>
    /**
     * Filter which PatientInstructions to update
     */
    where?: PatientInstructionWhereInput
    /**
     * Limit how many PatientInstructions to update.
     */
    limit?: number
  }

  /**
   * PatientInstruction upsert
   */
  export type PatientInstructionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientInstruction to update in case it exists.
     */
    where: PatientInstructionWhereUniqueInput
    /**
     * In case the PatientInstruction found by the `where` argument doesn't exist, create a new PatientInstruction with this data.
     */
    create: XOR<PatientInstructionCreateInput, PatientInstructionUncheckedCreateInput>
    /**
     * In case the PatientInstruction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientInstructionUpdateInput, PatientInstructionUncheckedUpdateInput>
  }

  /**
   * PatientInstruction delete
   */
  export type PatientInstructionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
    /**
     * Filter which PatientInstruction to delete.
     */
    where: PatientInstructionWhereUniqueInput
  }

  /**
   * PatientInstruction deleteMany
   */
  export type PatientInstructionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientInstructions to delete
     */
    where?: PatientInstructionWhereInput
    /**
     * Limit how many PatientInstructions to delete.
     */
    limit?: number
  }

  /**
   * PatientInstruction without action
   */
  export type PatientInstructionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInstruction
     */
    select?: PatientInstructionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInstruction
     */
    omit?: PatientInstructionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInstructionInclude<ExtArgs> | null
  }


  /**
   * Model Diagnosis
   */

  export type AggregateDiagnosis = {
    _count: DiagnosisCountAggregateOutputType | null
    _avg: DiagnosisAvgAggregateOutputType | null
    _sum: DiagnosisSumAggregateOutputType | null
    _min: DiagnosisMinAggregateOutputType | null
    _max: DiagnosisMaxAggregateOutputType | null
  }

  export type DiagnosisAvgAggregateOutputType = {
    diagnosis_id: number | null
    consultation_id: number | null
  }

  export type DiagnosisSumAggregateOutputType = {
    diagnosis_id: number | null
    consultation_id: number | null
  }

  export type DiagnosisMinAggregateOutputType = {
    diagnosis_id: number | null
    consultation_id: number | null
    diagnosis_name: string | null
    notes: string | null
  }

  export type DiagnosisMaxAggregateOutputType = {
    diagnosis_id: number | null
    consultation_id: number | null
    diagnosis_name: string | null
    notes: string | null
  }

  export type DiagnosisCountAggregateOutputType = {
    diagnosis_id: number
    consultation_id: number
    diagnosis_name: number
    notes: number
    _all: number
  }


  export type DiagnosisAvgAggregateInputType = {
    diagnosis_id?: true
    consultation_id?: true
  }

  export type DiagnosisSumAggregateInputType = {
    diagnosis_id?: true
    consultation_id?: true
  }

  export type DiagnosisMinAggregateInputType = {
    diagnosis_id?: true
    consultation_id?: true
    diagnosis_name?: true
    notes?: true
  }

  export type DiagnosisMaxAggregateInputType = {
    diagnosis_id?: true
    consultation_id?: true
    diagnosis_name?: true
    notes?: true
  }

  export type DiagnosisCountAggregateInputType = {
    diagnosis_id?: true
    consultation_id?: true
    diagnosis_name?: true
    notes?: true
    _all?: true
  }

  export type DiagnosisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Diagnosis to aggregate.
     */
    where?: DiagnosisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diagnoses to fetch.
     */
    orderBy?: DiagnosisOrderByWithRelationInput | DiagnosisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiagnosisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diagnoses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diagnoses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Diagnoses
    **/
    _count?: true | DiagnosisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiagnosisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiagnosisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiagnosisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiagnosisMaxAggregateInputType
  }

  export type GetDiagnosisAggregateType<T extends DiagnosisAggregateArgs> = {
        [P in keyof T & keyof AggregateDiagnosis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiagnosis[P]>
      : GetScalarType<T[P], AggregateDiagnosis[P]>
  }




  export type DiagnosisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiagnosisWhereInput
    orderBy?: DiagnosisOrderByWithAggregationInput | DiagnosisOrderByWithAggregationInput[]
    by: DiagnosisScalarFieldEnum[] | DiagnosisScalarFieldEnum
    having?: DiagnosisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiagnosisCountAggregateInputType | true
    _avg?: DiagnosisAvgAggregateInputType
    _sum?: DiagnosisSumAggregateInputType
    _min?: DiagnosisMinAggregateInputType
    _max?: DiagnosisMaxAggregateInputType
  }

  export type DiagnosisGroupByOutputType = {
    diagnosis_id: number
    consultation_id: number
    diagnosis_name: string
    notes: string | null
    _count: DiagnosisCountAggregateOutputType | null
    _avg: DiagnosisAvgAggregateOutputType | null
    _sum: DiagnosisSumAggregateOutputType | null
    _min: DiagnosisMinAggregateOutputType | null
    _max: DiagnosisMaxAggregateOutputType | null
  }

  type GetDiagnosisGroupByPayload<T extends DiagnosisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiagnosisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiagnosisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiagnosisGroupByOutputType[P]>
            : GetScalarType<T[P], DiagnosisGroupByOutputType[P]>
        }
      >
    >


  export type DiagnosisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    diagnosis_id?: boolean
    consultation_id?: boolean
    diagnosis_name?: boolean
    notes?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diagnosis"]>



  export type DiagnosisSelectScalar = {
    diagnosis_id?: boolean
    consultation_id?: boolean
    diagnosis_name?: boolean
    notes?: boolean
  }

  export type DiagnosisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"diagnosis_id" | "consultation_id" | "diagnosis_name" | "notes", ExtArgs["result"]["diagnosis"]>
  export type DiagnosisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $DiagnosisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Diagnosis"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      diagnosis_id: number
      consultation_id: number
      diagnosis_name: string
      notes: string | null
    }, ExtArgs["result"]["diagnosis"]>
    composites: {}
  }

  type DiagnosisGetPayload<S extends boolean | null | undefined | DiagnosisDefaultArgs> = $Result.GetResult<Prisma.$DiagnosisPayload, S>

  type DiagnosisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiagnosisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiagnosisCountAggregateInputType | true
    }

  export interface DiagnosisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Diagnosis'], meta: { name: 'Diagnosis' } }
    /**
     * Find zero or one Diagnosis that matches the filter.
     * @param {DiagnosisFindUniqueArgs} args - Arguments to find a Diagnosis
     * @example
     * // Get one Diagnosis
     * const diagnosis = await prisma.diagnosis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiagnosisFindUniqueArgs>(args: SelectSubset<T, DiagnosisFindUniqueArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Diagnosis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiagnosisFindUniqueOrThrowArgs} args - Arguments to find a Diagnosis
     * @example
     * // Get one Diagnosis
     * const diagnosis = await prisma.diagnosis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiagnosisFindUniqueOrThrowArgs>(args: SelectSubset<T, DiagnosisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Diagnosis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisFindFirstArgs} args - Arguments to find a Diagnosis
     * @example
     * // Get one Diagnosis
     * const diagnosis = await prisma.diagnosis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiagnosisFindFirstArgs>(args?: SelectSubset<T, DiagnosisFindFirstArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Diagnosis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisFindFirstOrThrowArgs} args - Arguments to find a Diagnosis
     * @example
     * // Get one Diagnosis
     * const diagnosis = await prisma.diagnosis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiagnosisFindFirstOrThrowArgs>(args?: SelectSubset<T, DiagnosisFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Diagnoses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Diagnoses
     * const diagnoses = await prisma.diagnosis.findMany()
     * 
     * // Get first 10 Diagnoses
     * const diagnoses = await prisma.diagnosis.findMany({ take: 10 })
     * 
     * // Only select the `diagnosis_id`
     * const diagnosisWithDiagnosis_idOnly = await prisma.diagnosis.findMany({ select: { diagnosis_id: true } })
     * 
     */
    findMany<T extends DiagnosisFindManyArgs>(args?: SelectSubset<T, DiagnosisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Diagnosis.
     * @param {DiagnosisCreateArgs} args - Arguments to create a Diagnosis.
     * @example
     * // Create one Diagnosis
     * const Diagnosis = await prisma.diagnosis.create({
     *   data: {
     *     // ... data to create a Diagnosis
     *   }
     * })
     * 
     */
    create<T extends DiagnosisCreateArgs>(args: SelectSubset<T, DiagnosisCreateArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Diagnoses.
     * @param {DiagnosisCreateManyArgs} args - Arguments to create many Diagnoses.
     * @example
     * // Create many Diagnoses
     * const diagnosis = await prisma.diagnosis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiagnosisCreateManyArgs>(args?: SelectSubset<T, DiagnosisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Diagnosis.
     * @param {DiagnosisDeleteArgs} args - Arguments to delete one Diagnosis.
     * @example
     * // Delete one Diagnosis
     * const Diagnosis = await prisma.diagnosis.delete({
     *   where: {
     *     // ... filter to delete one Diagnosis
     *   }
     * })
     * 
     */
    delete<T extends DiagnosisDeleteArgs>(args: SelectSubset<T, DiagnosisDeleteArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Diagnosis.
     * @param {DiagnosisUpdateArgs} args - Arguments to update one Diagnosis.
     * @example
     * // Update one Diagnosis
     * const diagnosis = await prisma.diagnosis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiagnosisUpdateArgs>(args: SelectSubset<T, DiagnosisUpdateArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Diagnoses.
     * @param {DiagnosisDeleteManyArgs} args - Arguments to filter Diagnoses to delete.
     * @example
     * // Delete a few Diagnoses
     * const { count } = await prisma.diagnosis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiagnosisDeleteManyArgs>(args?: SelectSubset<T, DiagnosisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diagnoses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Diagnoses
     * const diagnosis = await prisma.diagnosis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiagnosisUpdateManyArgs>(args: SelectSubset<T, DiagnosisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Diagnosis.
     * @param {DiagnosisUpsertArgs} args - Arguments to update or create a Diagnosis.
     * @example
     * // Update or create a Diagnosis
     * const diagnosis = await prisma.diagnosis.upsert({
     *   create: {
     *     // ... data to create a Diagnosis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Diagnosis we want to update
     *   }
     * })
     */
    upsert<T extends DiagnosisUpsertArgs>(args: SelectSubset<T, DiagnosisUpsertArgs<ExtArgs>>): Prisma__DiagnosisClient<$Result.GetResult<Prisma.$DiagnosisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Diagnoses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisCountArgs} args - Arguments to filter Diagnoses to count.
     * @example
     * // Count the number of Diagnoses
     * const count = await prisma.diagnosis.count({
     *   where: {
     *     // ... the filter for the Diagnoses we want to count
     *   }
     * })
    **/
    count<T extends DiagnosisCountArgs>(
      args?: Subset<T, DiagnosisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiagnosisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Diagnosis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiagnosisAggregateArgs>(args: Subset<T, DiagnosisAggregateArgs>): Prisma.PrismaPromise<GetDiagnosisAggregateType<T>>

    /**
     * Group by Diagnosis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiagnosisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiagnosisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiagnosisGroupByArgs['orderBy'] }
        : { orderBy?: DiagnosisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiagnosisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiagnosisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Diagnosis model
   */
  readonly fields: DiagnosisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Diagnosis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiagnosisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Diagnosis model
   */
  interface DiagnosisFieldRefs {
    readonly diagnosis_id: FieldRef<"Diagnosis", 'Int'>
    readonly consultation_id: FieldRef<"Diagnosis", 'Int'>
    readonly diagnosis_name: FieldRef<"Diagnosis", 'String'>
    readonly notes: FieldRef<"Diagnosis", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Diagnosis findUnique
   */
  export type DiagnosisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter, which Diagnosis to fetch.
     */
    where: DiagnosisWhereUniqueInput
  }

  /**
   * Diagnosis findUniqueOrThrow
   */
  export type DiagnosisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter, which Diagnosis to fetch.
     */
    where: DiagnosisWhereUniqueInput
  }

  /**
   * Diagnosis findFirst
   */
  export type DiagnosisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter, which Diagnosis to fetch.
     */
    where?: DiagnosisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diagnoses to fetch.
     */
    orderBy?: DiagnosisOrderByWithRelationInput | DiagnosisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diagnoses.
     */
    cursor?: DiagnosisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diagnoses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diagnoses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diagnoses.
     */
    distinct?: DiagnosisScalarFieldEnum | DiagnosisScalarFieldEnum[]
  }

  /**
   * Diagnosis findFirstOrThrow
   */
  export type DiagnosisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter, which Diagnosis to fetch.
     */
    where?: DiagnosisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diagnoses to fetch.
     */
    orderBy?: DiagnosisOrderByWithRelationInput | DiagnosisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diagnoses.
     */
    cursor?: DiagnosisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diagnoses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diagnoses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diagnoses.
     */
    distinct?: DiagnosisScalarFieldEnum | DiagnosisScalarFieldEnum[]
  }

  /**
   * Diagnosis findMany
   */
  export type DiagnosisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter, which Diagnoses to fetch.
     */
    where?: DiagnosisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diagnoses to fetch.
     */
    orderBy?: DiagnosisOrderByWithRelationInput | DiagnosisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Diagnoses.
     */
    cursor?: DiagnosisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diagnoses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diagnoses.
     */
    skip?: number
    distinct?: DiagnosisScalarFieldEnum | DiagnosisScalarFieldEnum[]
  }

  /**
   * Diagnosis create
   */
  export type DiagnosisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * The data needed to create a Diagnosis.
     */
    data: XOR<DiagnosisCreateInput, DiagnosisUncheckedCreateInput>
  }

  /**
   * Diagnosis createMany
   */
  export type DiagnosisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Diagnoses.
     */
    data: DiagnosisCreateManyInput | DiagnosisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Diagnosis update
   */
  export type DiagnosisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * The data needed to update a Diagnosis.
     */
    data: XOR<DiagnosisUpdateInput, DiagnosisUncheckedUpdateInput>
    /**
     * Choose, which Diagnosis to update.
     */
    where: DiagnosisWhereUniqueInput
  }

  /**
   * Diagnosis updateMany
   */
  export type DiagnosisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Diagnoses.
     */
    data: XOR<DiagnosisUpdateManyMutationInput, DiagnosisUncheckedUpdateManyInput>
    /**
     * Filter which Diagnoses to update
     */
    where?: DiagnosisWhereInput
    /**
     * Limit how many Diagnoses to update.
     */
    limit?: number
  }

  /**
   * Diagnosis upsert
   */
  export type DiagnosisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * The filter to search for the Diagnosis to update in case it exists.
     */
    where: DiagnosisWhereUniqueInput
    /**
     * In case the Diagnosis found by the `where` argument doesn't exist, create a new Diagnosis with this data.
     */
    create: XOR<DiagnosisCreateInput, DiagnosisUncheckedCreateInput>
    /**
     * In case the Diagnosis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiagnosisUpdateInput, DiagnosisUncheckedUpdateInput>
  }

  /**
   * Diagnosis delete
   */
  export type DiagnosisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
    /**
     * Filter which Diagnosis to delete.
     */
    where: DiagnosisWhereUniqueInput
  }

  /**
   * Diagnosis deleteMany
   */
  export type DiagnosisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Diagnoses to delete
     */
    where?: DiagnosisWhereInput
    /**
     * Limit how many Diagnoses to delete.
     */
    limit?: number
  }

  /**
   * Diagnosis without action
   */
  export type DiagnosisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Diagnosis
     */
    select?: DiagnosisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Diagnosis
     */
    omit?: DiagnosisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiagnosisInclude<ExtArgs> | null
  }


  /**
   * Model PatientGuardian
   */

  export type AggregatePatientGuardian = {
    _count: PatientGuardianCountAggregateOutputType | null
    _avg: PatientGuardianAvgAggregateOutputType | null
    _sum: PatientGuardianSumAggregateOutputType | null
    _min: PatientGuardianMinAggregateOutputType | null
    _max: PatientGuardianMaxAggregateOutputType | null
  }

  export type PatientGuardianAvgAggregateOutputType = {
    guardian_id: number | null
    patient_id: number | null
  }

  export type PatientGuardianSumAggregateOutputType = {
    guardian_id: number | null
    patient_id: number | null
  }

  export type PatientGuardianMinAggregateOutputType = {
    guardian_id: number | null
    patient_id: number | null
    guardian_name: string | null
    guardian_nic: string | null
    guardian_phone: string | null
    guardian_address: string | null
    relationship: string | null
  }

  export type PatientGuardianMaxAggregateOutputType = {
    guardian_id: number | null
    patient_id: number | null
    guardian_name: string | null
    guardian_nic: string | null
    guardian_phone: string | null
    guardian_address: string | null
    relationship: string | null
  }

  export type PatientGuardianCountAggregateOutputType = {
    guardian_id: number
    patient_id: number
    guardian_name: number
    guardian_nic: number
    guardian_phone: number
    guardian_address: number
    relationship: number
    _all: number
  }


  export type PatientGuardianAvgAggregateInputType = {
    guardian_id?: true
    patient_id?: true
  }

  export type PatientGuardianSumAggregateInputType = {
    guardian_id?: true
    patient_id?: true
  }

  export type PatientGuardianMinAggregateInputType = {
    guardian_id?: true
    patient_id?: true
    guardian_name?: true
    guardian_nic?: true
    guardian_phone?: true
    guardian_address?: true
    relationship?: true
  }

  export type PatientGuardianMaxAggregateInputType = {
    guardian_id?: true
    patient_id?: true
    guardian_name?: true
    guardian_nic?: true
    guardian_phone?: true
    guardian_address?: true
    relationship?: true
  }

  export type PatientGuardianCountAggregateInputType = {
    guardian_id?: true
    patient_id?: true
    guardian_name?: true
    guardian_nic?: true
    guardian_phone?: true
    guardian_address?: true
    relationship?: true
    _all?: true
  }

  export type PatientGuardianAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientGuardian to aggregate.
     */
    where?: PatientGuardianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientGuardians to fetch.
     */
    orderBy?: PatientGuardianOrderByWithRelationInput | PatientGuardianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientGuardianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientGuardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientGuardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientGuardians
    **/
    _count?: true | PatientGuardianCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientGuardianAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientGuardianSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientGuardianMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientGuardianMaxAggregateInputType
  }

  export type GetPatientGuardianAggregateType<T extends PatientGuardianAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientGuardian]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientGuardian[P]>
      : GetScalarType<T[P], AggregatePatientGuardian[P]>
  }




  export type PatientGuardianGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientGuardianWhereInput
    orderBy?: PatientGuardianOrderByWithAggregationInput | PatientGuardianOrderByWithAggregationInput[]
    by: PatientGuardianScalarFieldEnum[] | PatientGuardianScalarFieldEnum
    having?: PatientGuardianScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientGuardianCountAggregateInputType | true
    _avg?: PatientGuardianAvgAggregateInputType
    _sum?: PatientGuardianSumAggregateInputType
    _min?: PatientGuardianMinAggregateInputType
    _max?: PatientGuardianMaxAggregateInputType
  }

  export type PatientGuardianGroupByOutputType = {
    guardian_id: number
    patient_id: number
    guardian_name: string
    guardian_nic: string | null
    guardian_phone: string | null
    guardian_address: string | null
    relationship: string
    _count: PatientGuardianCountAggregateOutputType | null
    _avg: PatientGuardianAvgAggregateOutputType | null
    _sum: PatientGuardianSumAggregateOutputType | null
    _min: PatientGuardianMinAggregateOutputType | null
    _max: PatientGuardianMaxAggregateOutputType | null
  }

  type GetPatientGuardianGroupByPayload<T extends PatientGuardianGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGuardianGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGuardianGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGuardianGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGuardianGroupByOutputType[P]>
        }
      >
    >


  export type PatientGuardianSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guardian_id?: boolean
    patient_id?: boolean
    guardian_name?: boolean
    guardian_nic?: boolean
    guardian_phone?: boolean
    guardian_address?: boolean
    relationship?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientGuardian"]>



  export type PatientGuardianSelectScalar = {
    guardian_id?: boolean
    patient_id?: boolean
    guardian_name?: boolean
    guardian_nic?: boolean
    guardian_phone?: boolean
    guardian_address?: boolean
    relationship?: boolean
  }

  export type PatientGuardianOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"guardian_id" | "patient_id" | "guardian_name" | "guardian_nic" | "guardian_phone" | "guardian_address" | "relationship", ExtArgs["result"]["patientGuardian"]>
  export type PatientGuardianInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientGuardianPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientGuardian"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      guardian_id: number
      patient_id: number
      guardian_name: string
      guardian_nic: string | null
      guardian_phone: string | null
      guardian_address: string | null
      relationship: string
    }, ExtArgs["result"]["patientGuardian"]>
    composites: {}
  }

  type PatientGuardianGetPayload<S extends boolean | null | undefined | PatientGuardianDefaultArgs> = $Result.GetResult<Prisma.$PatientGuardianPayload, S>

  type PatientGuardianCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientGuardianFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientGuardianCountAggregateInputType | true
    }

  export interface PatientGuardianDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientGuardian'], meta: { name: 'PatientGuardian' } }
    /**
     * Find zero or one PatientGuardian that matches the filter.
     * @param {PatientGuardianFindUniqueArgs} args - Arguments to find a PatientGuardian
     * @example
     * // Get one PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientGuardianFindUniqueArgs>(args: SelectSubset<T, PatientGuardianFindUniqueArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientGuardian that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientGuardianFindUniqueOrThrowArgs} args - Arguments to find a PatientGuardian
     * @example
     * // Get one PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientGuardianFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientGuardianFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientGuardian that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianFindFirstArgs} args - Arguments to find a PatientGuardian
     * @example
     * // Get one PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientGuardianFindFirstArgs>(args?: SelectSubset<T, PatientGuardianFindFirstArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientGuardian that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianFindFirstOrThrowArgs} args - Arguments to find a PatientGuardian
     * @example
     * // Get one PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientGuardianFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientGuardianFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientGuardians that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientGuardians
     * const patientGuardians = await prisma.patientGuardian.findMany()
     * 
     * // Get first 10 PatientGuardians
     * const patientGuardians = await prisma.patientGuardian.findMany({ take: 10 })
     * 
     * // Only select the `guardian_id`
     * const patientGuardianWithGuardian_idOnly = await prisma.patientGuardian.findMany({ select: { guardian_id: true } })
     * 
     */
    findMany<T extends PatientGuardianFindManyArgs>(args?: SelectSubset<T, PatientGuardianFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientGuardian.
     * @param {PatientGuardianCreateArgs} args - Arguments to create a PatientGuardian.
     * @example
     * // Create one PatientGuardian
     * const PatientGuardian = await prisma.patientGuardian.create({
     *   data: {
     *     // ... data to create a PatientGuardian
     *   }
     * })
     * 
     */
    create<T extends PatientGuardianCreateArgs>(args: SelectSubset<T, PatientGuardianCreateArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientGuardians.
     * @param {PatientGuardianCreateManyArgs} args - Arguments to create many PatientGuardians.
     * @example
     * // Create many PatientGuardians
     * const patientGuardian = await prisma.patientGuardian.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientGuardianCreateManyArgs>(args?: SelectSubset<T, PatientGuardianCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PatientGuardian.
     * @param {PatientGuardianDeleteArgs} args - Arguments to delete one PatientGuardian.
     * @example
     * // Delete one PatientGuardian
     * const PatientGuardian = await prisma.patientGuardian.delete({
     *   where: {
     *     // ... filter to delete one PatientGuardian
     *   }
     * })
     * 
     */
    delete<T extends PatientGuardianDeleteArgs>(args: SelectSubset<T, PatientGuardianDeleteArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientGuardian.
     * @param {PatientGuardianUpdateArgs} args - Arguments to update one PatientGuardian.
     * @example
     * // Update one PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientGuardianUpdateArgs>(args: SelectSubset<T, PatientGuardianUpdateArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientGuardians.
     * @param {PatientGuardianDeleteManyArgs} args - Arguments to filter PatientGuardians to delete.
     * @example
     * // Delete a few PatientGuardians
     * const { count } = await prisma.patientGuardian.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientGuardianDeleteManyArgs>(args?: SelectSubset<T, PatientGuardianDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientGuardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientGuardians
     * const patientGuardian = await prisma.patientGuardian.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientGuardianUpdateManyArgs>(args: SelectSubset<T, PatientGuardianUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PatientGuardian.
     * @param {PatientGuardianUpsertArgs} args - Arguments to update or create a PatientGuardian.
     * @example
     * // Update or create a PatientGuardian
     * const patientGuardian = await prisma.patientGuardian.upsert({
     *   create: {
     *     // ... data to create a PatientGuardian
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientGuardian we want to update
     *   }
     * })
     */
    upsert<T extends PatientGuardianUpsertArgs>(args: SelectSubset<T, PatientGuardianUpsertArgs<ExtArgs>>): Prisma__PatientGuardianClient<$Result.GetResult<Prisma.$PatientGuardianPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientGuardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianCountArgs} args - Arguments to filter PatientGuardians to count.
     * @example
     * // Count the number of PatientGuardians
     * const count = await prisma.patientGuardian.count({
     *   where: {
     *     // ... the filter for the PatientGuardians we want to count
     *   }
     * })
    **/
    count<T extends PatientGuardianCountArgs>(
      args?: Subset<T, PatientGuardianCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientGuardianCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientGuardian.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientGuardianAggregateArgs>(args: Subset<T, PatientGuardianAggregateArgs>): Prisma.PrismaPromise<GetPatientGuardianAggregateType<T>>

    /**
     * Group by PatientGuardian.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGuardianGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGuardianGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGuardianGroupByArgs['orderBy'] }
        : { orderBy?: PatientGuardianGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGuardianGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGuardianGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientGuardian model
   */
  readonly fields: PatientGuardianFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientGuardian.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientGuardianClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientGuardian model
   */
  interface PatientGuardianFieldRefs {
    readonly guardian_id: FieldRef<"PatientGuardian", 'Int'>
    readonly patient_id: FieldRef<"PatientGuardian", 'Int'>
    readonly guardian_name: FieldRef<"PatientGuardian", 'String'>
    readonly guardian_nic: FieldRef<"PatientGuardian", 'String'>
    readonly guardian_phone: FieldRef<"PatientGuardian", 'String'>
    readonly guardian_address: FieldRef<"PatientGuardian", 'String'>
    readonly relationship: FieldRef<"PatientGuardian", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatientGuardian findUnique
   */
  export type PatientGuardianFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter, which PatientGuardian to fetch.
     */
    where: PatientGuardianWhereUniqueInput
  }

  /**
   * PatientGuardian findUniqueOrThrow
   */
  export type PatientGuardianFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter, which PatientGuardian to fetch.
     */
    where: PatientGuardianWhereUniqueInput
  }

  /**
   * PatientGuardian findFirst
   */
  export type PatientGuardianFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter, which PatientGuardian to fetch.
     */
    where?: PatientGuardianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientGuardians to fetch.
     */
    orderBy?: PatientGuardianOrderByWithRelationInput | PatientGuardianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientGuardians.
     */
    cursor?: PatientGuardianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientGuardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientGuardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientGuardians.
     */
    distinct?: PatientGuardianScalarFieldEnum | PatientGuardianScalarFieldEnum[]
  }

  /**
   * PatientGuardian findFirstOrThrow
   */
  export type PatientGuardianFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter, which PatientGuardian to fetch.
     */
    where?: PatientGuardianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientGuardians to fetch.
     */
    orderBy?: PatientGuardianOrderByWithRelationInput | PatientGuardianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientGuardians.
     */
    cursor?: PatientGuardianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientGuardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientGuardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientGuardians.
     */
    distinct?: PatientGuardianScalarFieldEnum | PatientGuardianScalarFieldEnum[]
  }

  /**
   * PatientGuardian findMany
   */
  export type PatientGuardianFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter, which PatientGuardians to fetch.
     */
    where?: PatientGuardianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientGuardians to fetch.
     */
    orderBy?: PatientGuardianOrderByWithRelationInput | PatientGuardianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientGuardians.
     */
    cursor?: PatientGuardianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientGuardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientGuardians.
     */
    skip?: number
    distinct?: PatientGuardianScalarFieldEnum | PatientGuardianScalarFieldEnum[]
  }

  /**
   * PatientGuardian create
   */
  export type PatientGuardianCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientGuardian.
     */
    data: XOR<PatientGuardianCreateInput, PatientGuardianUncheckedCreateInput>
  }

  /**
   * PatientGuardian createMany
   */
  export type PatientGuardianCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientGuardians.
     */
    data: PatientGuardianCreateManyInput | PatientGuardianCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientGuardian update
   */
  export type PatientGuardianUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientGuardian.
     */
    data: XOR<PatientGuardianUpdateInput, PatientGuardianUncheckedUpdateInput>
    /**
     * Choose, which PatientGuardian to update.
     */
    where: PatientGuardianWhereUniqueInput
  }

  /**
   * PatientGuardian updateMany
   */
  export type PatientGuardianUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientGuardians.
     */
    data: XOR<PatientGuardianUpdateManyMutationInput, PatientGuardianUncheckedUpdateManyInput>
    /**
     * Filter which PatientGuardians to update
     */
    where?: PatientGuardianWhereInput
    /**
     * Limit how many PatientGuardians to update.
     */
    limit?: number
  }

  /**
   * PatientGuardian upsert
   */
  export type PatientGuardianUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientGuardian to update in case it exists.
     */
    where: PatientGuardianWhereUniqueInput
    /**
     * In case the PatientGuardian found by the `where` argument doesn't exist, create a new PatientGuardian with this data.
     */
    create: XOR<PatientGuardianCreateInput, PatientGuardianUncheckedCreateInput>
    /**
     * In case the PatientGuardian was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientGuardianUpdateInput, PatientGuardianUncheckedUpdateInput>
  }

  /**
   * PatientGuardian delete
   */
  export type PatientGuardianDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
    /**
     * Filter which PatientGuardian to delete.
     */
    where: PatientGuardianWhereUniqueInput
  }

  /**
   * PatientGuardian deleteMany
   */
  export type PatientGuardianDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientGuardians to delete
     */
    where?: PatientGuardianWhereInput
    /**
     * Limit how many PatientGuardians to delete.
     */
    limit?: number
  }

  /**
   * PatientGuardian without action
   */
  export type PatientGuardianDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientGuardian
     */
    select?: PatientGuardianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientGuardian
     */
    omit?: PatientGuardianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientGuardianInclude<ExtArgs> | null
  }


  /**
   * Model PatientAllergy
   */

  export type AggregatePatientAllergy = {
    _count: PatientAllergyCountAggregateOutputType | null
    _avg: PatientAllergyAvgAggregateOutputType | null
    _sum: PatientAllergySumAggregateOutputType | null
    _min: PatientAllergyMinAggregateOutputType | null
    _max: PatientAllergyMaxAggregateOutputType | null
  }

  export type PatientAllergyAvgAggregateOutputType = {
    allergy_id: number | null
    patient_id: number | null
  }

  export type PatientAllergySumAggregateOutputType = {
    allergy_id: number | null
    patient_id: number | null
  }

  export type PatientAllergyMinAggregateOutputType = {
    allergy_id: number | null
    patient_id: number | null
    allergy_name: string | null
  }

  export type PatientAllergyMaxAggregateOutputType = {
    allergy_id: number | null
    patient_id: number | null
    allergy_name: string | null
  }

  export type PatientAllergyCountAggregateOutputType = {
    allergy_id: number
    patient_id: number
    allergy_name: number
    _all: number
  }


  export type PatientAllergyAvgAggregateInputType = {
    allergy_id?: true
    patient_id?: true
  }

  export type PatientAllergySumAggregateInputType = {
    allergy_id?: true
    patient_id?: true
  }

  export type PatientAllergyMinAggregateInputType = {
    allergy_id?: true
    patient_id?: true
    allergy_name?: true
  }

  export type PatientAllergyMaxAggregateInputType = {
    allergy_id?: true
    patient_id?: true
    allergy_name?: true
  }

  export type PatientAllergyCountAggregateInputType = {
    allergy_id?: true
    patient_id?: true
    allergy_name?: true
    _all?: true
  }

  export type PatientAllergyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientAllergy to aggregate.
     */
    where?: PatientAllergyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAllergies to fetch.
     */
    orderBy?: PatientAllergyOrderByWithRelationInput | PatientAllergyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientAllergyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAllergies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAllergies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientAllergies
    **/
    _count?: true | PatientAllergyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAllergyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientAllergySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientAllergyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientAllergyMaxAggregateInputType
  }

  export type GetPatientAllergyAggregateType<T extends PatientAllergyAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientAllergy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientAllergy[P]>
      : GetScalarType<T[P], AggregatePatientAllergy[P]>
  }




  export type PatientAllergyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientAllergyWhereInput
    orderBy?: PatientAllergyOrderByWithAggregationInput | PatientAllergyOrderByWithAggregationInput[]
    by: PatientAllergyScalarFieldEnum[] | PatientAllergyScalarFieldEnum
    having?: PatientAllergyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientAllergyCountAggregateInputType | true
    _avg?: PatientAllergyAvgAggregateInputType
    _sum?: PatientAllergySumAggregateInputType
    _min?: PatientAllergyMinAggregateInputType
    _max?: PatientAllergyMaxAggregateInputType
  }

  export type PatientAllergyGroupByOutputType = {
    allergy_id: number
    patient_id: number
    allergy_name: string
    _count: PatientAllergyCountAggregateOutputType | null
    _avg: PatientAllergyAvgAggregateOutputType | null
    _sum: PatientAllergySumAggregateOutputType | null
    _min: PatientAllergyMinAggregateOutputType | null
    _max: PatientAllergyMaxAggregateOutputType | null
  }

  type GetPatientAllergyGroupByPayload<T extends PatientAllergyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientAllergyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientAllergyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientAllergyGroupByOutputType[P]>
            : GetScalarType<T[P], PatientAllergyGroupByOutputType[P]>
        }
      >
    >


  export type PatientAllergySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    allergy_id?: boolean
    patient_id?: boolean
    allergy_name?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientAllergy"]>



  export type PatientAllergySelectScalar = {
    allergy_id?: boolean
    patient_id?: boolean
    allergy_name?: boolean
  }

  export type PatientAllergyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"allergy_id" | "patient_id" | "allergy_name", ExtArgs["result"]["patientAllergy"]>
  export type PatientAllergyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientAllergyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientAllergy"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      allergy_id: number
      patient_id: number
      allergy_name: string
    }, ExtArgs["result"]["patientAllergy"]>
    composites: {}
  }

  type PatientAllergyGetPayload<S extends boolean | null | undefined | PatientAllergyDefaultArgs> = $Result.GetResult<Prisma.$PatientAllergyPayload, S>

  type PatientAllergyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientAllergyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientAllergyCountAggregateInputType | true
    }

  export interface PatientAllergyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientAllergy'], meta: { name: 'PatientAllergy' } }
    /**
     * Find zero or one PatientAllergy that matches the filter.
     * @param {PatientAllergyFindUniqueArgs} args - Arguments to find a PatientAllergy
     * @example
     * // Get one PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientAllergyFindUniqueArgs>(args: SelectSubset<T, PatientAllergyFindUniqueArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientAllergy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientAllergyFindUniqueOrThrowArgs} args - Arguments to find a PatientAllergy
     * @example
     * // Get one PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientAllergyFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientAllergyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientAllergy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyFindFirstArgs} args - Arguments to find a PatientAllergy
     * @example
     * // Get one PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientAllergyFindFirstArgs>(args?: SelectSubset<T, PatientAllergyFindFirstArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientAllergy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyFindFirstOrThrowArgs} args - Arguments to find a PatientAllergy
     * @example
     * // Get one PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientAllergyFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientAllergyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientAllergies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientAllergies
     * const patientAllergies = await prisma.patientAllergy.findMany()
     * 
     * // Get first 10 PatientAllergies
     * const patientAllergies = await prisma.patientAllergy.findMany({ take: 10 })
     * 
     * // Only select the `allergy_id`
     * const patientAllergyWithAllergy_idOnly = await prisma.patientAllergy.findMany({ select: { allergy_id: true } })
     * 
     */
    findMany<T extends PatientAllergyFindManyArgs>(args?: SelectSubset<T, PatientAllergyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientAllergy.
     * @param {PatientAllergyCreateArgs} args - Arguments to create a PatientAllergy.
     * @example
     * // Create one PatientAllergy
     * const PatientAllergy = await prisma.patientAllergy.create({
     *   data: {
     *     // ... data to create a PatientAllergy
     *   }
     * })
     * 
     */
    create<T extends PatientAllergyCreateArgs>(args: SelectSubset<T, PatientAllergyCreateArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientAllergies.
     * @param {PatientAllergyCreateManyArgs} args - Arguments to create many PatientAllergies.
     * @example
     * // Create many PatientAllergies
     * const patientAllergy = await prisma.patientAllergy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientAllergyCreateManyArgs>(args?: SelectSubset<T, PatientAllergyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PatientAllergy.
     * @param {PatientAllergyDeleteArgs} args - Arguments to delete one PatientAllergy.
     * @example
     * // Delete one PatientAllergy
     * const PatientAllergy = await prisma.patientAllergy.delete({
     *   where: {
     *     // ... filter to delete one PatientAllergy
     *   }
     * })
     * 
     */
    delete<T extends PatientAllergyDeleteArgs>(args: SelectSubset<T, PatientAllergyDeleteArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientAllergy.
     * @param {PatientAllergyUpdateArgs} args - Arguments to update one PatientAllergy.
     * @example
     * // Update one PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientAllergyUpdateArgs>(args: SelectSubset<T, PatientAllergyUpdateArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientAllergies.
     * @param {PatientAllergyDeleteManyArgs} args - Arguments to filter PatientAllergies to delete.
     * @example
     * // Delete a few PatientAllergies
     * const { count } = await prisma.patientAllergy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientAllergyDeleteManyArgs>(args?: SelectSubset<T, PatientAllergyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientAllergies
     * const patientAllergy = await prisma.patientAllergy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientAllergyUpdateManyArgs>(args: SelectSubset<T, PatientAllergyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PatientAllergy.
     * @param {PatientAllergyUpsertArgs} args - Arguments to update or create a PatientAllergy.
     * @example
     * // Update or create a PatientAllergy
     * const patientAllergy = await prisma.patientAllergy.upsert({
     *   create: {
     *     // ... data to create a PatientAllergy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientAllergy we want to update
     *   }
     * })
     */
    upsert<T extends PatientAllergyUpsertArgs>(args: SelectSubset<T, PatientAllergyUpsertArgs<ExtArgs>>): Prisma__PatientAllergyClient<$Result.GetResult<Prisma.$PatientAllergyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyCountArgs} args - Arguments to filter PatientAllergies to count.
     * @example
     * // Count the number of PatientAllergies
     * const count = await prisma.patientAllergy.count({
     *   where: {
     *     // ... the filter for the PatientAllergies we want to count
     *   }
     * })
    **/
    count<T extends PatientAllergyCountArgs>(
      args?: Subset<T, PatientAllergyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientAllergyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientAllergy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAllergyAggregateArgs>(args: Subset<T, PatientAllergyAggregateArgs>): Prisma.PrismaPromise<GetPatientAllergyAggregateType<T>>

    /**
     * Group by PatientAllergy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAllergyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientAllergyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientAllergyGroupByArgs['orderBy'] }
        : { orderBy?: PatientAllergyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientAllergyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientAllergyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientAllergy model
   */
  readonly fields: PatientAllergyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientAllergy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientAllergyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientAllergy model
   */
  interface PatientAllergyFieldRefs {
    readonly allergy_id: FieldRef<"PatientAllergy", 'Int'>
    readonly patient_id: FieldRef<"PatientAllergy", 'Int'>
    readonly allergy_name: FieldRef<"PatientAllergy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatientAllergy findUnique
   */
  export type PatientAllergyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter, which PatientAllergy to fetch.
     */
    where: PatientAllergyWhereUniqueInput
  }

  /**
   * PatientAllergy findUniqueOrThrow
   */
  export type PatientAllergyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter, which PatientAllergy to fetch.
     */
    where: PatientAllergyWhereUniqueInput
  }

  /**
   * PatientAllergy findFirst
   */
  export type PatientAllergyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter, which PatientAllergy to fetch.
     */
    where?: PatientAllergyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAllergies to fetch.
     */
    orderBy?: PatientAllergyOrderByWithRelationInput | PatientAllergyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientAllergies.
     */
    cursor?: PatientAllergyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAllergies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAllergies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientAllergies.
     */
    distinct?: PatientAllergyScalarFieldEnum | PatientAllergyScalarFieldEnum[]
  }

  /**
   * PatientAllergy findFirstOrThrow
   */
  export type PatientAllergyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter, which PatientAllergy to fetch.
     */
    where?: PatientAllergyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAllergies to fetch.
     */
    orderBy?: PatientAllergyOrderByWithRelationInput | PatientAllergyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientAllergies.
     */
    cursor?: PatientAllergyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAllergies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAllergies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientAllergies.
     */
    distinct?: PatientAllergyScalarFieldEnum | PatientAllergyScalarFieldEnum[]
  }

  /**
   * PatientAllergy findMany
   */
  export type PatientAllergyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter, which PatientAllergies to fetch.
     */
    where?: PatientAllergyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAllergies to fetch.
     */
    orderBy?: PatientAllergyOrderByWithRelationInput | PatientAllergyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientAllergies.
     */
    cursor?: PatientAllergyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAllergies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAllergies.
     */
    skip?: number
    distinct?: PatientAllergyScalarFieldEnum | PatientAllergyScalarFieldEnum[]
  }

  /**
   * PatientAllergy create
   */
  export type PatientAllergyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientAllergy.
     */
    data: XOR<PatientAllergyCreateInput, PatientAllergyUncheckedCreateInput>
  }

  /**
   * PatientAllergy createMany
   */
  export type PatientAllergyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientAllergies.
     */
    data: PatientAllergyCreateManyInput | PatientAllergyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientAllergy update
   */
  export type PatientAllergyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientAllergy.
     */
    data: XOR<PatientAllergyUpdateInput, PatientAllergyUncheckedUpdateInput>
    /**
     * Choose, which PatientAllergy to update.
     */
    where: PatientAllergyWhereUniqueInput
  }

  /**
   * PatientAllergy updateMany
   */
  export type PatientAllergyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientAllergies.
     */
    data: XOR<PatientAllergyUpdateManyMutationInput, PatientAllergyUncheckedUpdateManyInput>
    /**
     * Filter which PatientAllergies to update
     */
    where?: PatientAllergyWhereInput
    /**
     * Limit how many PatientAllergies to update.
     */
    limit?: number
  }

  /**
   * PatientAllergy upsert
   */
  export type PatientAllergyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientAllergy to update in case it exists.
     */
    where: PatientAllergyWhereUniqueInput
    /**
     * In case the PatientAllergy found by the `where` argument doesn't exist, create a new PatientAllergy with this data.
     */
    create: XOR<PatientAllergyCreateInput, PatientAllergyUncheckedCreateInput>
    /**
     * In case the PatientAllergy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientAllergyUpdateInput, PatientAllergyUncheckedUpdateInput>
  }

  /**
   * PatientAllergy delete
   */
  export type PatientAllergyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
    /**
     * Filter which PatientAllergy to delete.
     */
    where: PatientAllergyWhereUniqueInput
  }

  /**
   * PatientAllergy deleteMany
   */
  export type PatientAllergyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientAllergies to delete
     */
    where?: PatientAllergyWhereInput
    /**
     * Limit how many PatientAllergies to delete.
     */
    limit?: number
  }

  /**
   * PatientAllergy without action
   */
  export type PatientAllergyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAllergy
     */
    select?: PatientAllergySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAllergy
     */
    omit?: PatientAllergyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAllergyInclude<ExtArgs> | null
  }


  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _avg: PrescriptionAvgAggregateOutputType | null
    _sum: PrescriptionSumAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionAvgAggregateOutputType = {
    prescription_id: number | null
    consultation_id: number | null
  }

  export type PrescriptionSumAggregateOutputType = {
    prescription_id: number | null
    consultation_id: number | null
  }

  export type PrescriptionMinAggregateOutputType = {
    prescription_id: number | null
    consultation_id: number | null
    created_at: Date | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    prescription_id: number | null
    consultation_id: number | null
    created_at: Date | null
  }

  export type PrescriptionCountAggregateOutputType = {
    prescription_id: number
    consultation_id: number
    created_at: number
    _all: number
  }


  export type PrescriptionAvgAggregateInputType = {
    prescription_id?: true
    consultation_id?: true
  }

  export type PrescriptionSumAggregateInputType = {
    prescription_id?: true
    consultation_id?: true
  }

  export type PrescriptionMinAggregateInputType = {
    prescription_id?: true
    consultation_id?: true
    created_at?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    prescription_id?: true
    consultation_id?: true
    created_at?: true
  }

  export type PrescriptionCountAggregateInputType = {
    prescription_id?: true
    consultation_id?: true
    created_at?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrescriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrescriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _avg?: PrescriptionAvgAggregateInputType
    _sum?: PrescriptionSumAggregateInputType
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    prescription_id: number
    consultation_id: number
    created_at: Date
    _count: PrescriptionCountAggregateOutputType | null
    _avg: PrescriptionAvgAggregateOutputType | null
    _sum: PrescriptionSumAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prescription_id?: boolean
    consultation_id?: boolean
    created_at?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>



  export type PrescriptionSelectScalar = {
    prescription_id?: boolean
    consultation_id?: boolean
    created_at?: boolean
  }

  export type PrescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"prescription_id" | "consultation_id" | "created_at", ExtArgs["result"]["prescription"]>
  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      prescription_id: number
      consultation_id: number
      created_at: Date
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `prescription_id`
     * const prescriptionWithPrescription_idOnly = await prisma.prescription.findMany({ select: { prescription_id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prescription model
   */
  interface PrescriptionFieldRefs {
    readonly prescription_id: FieldRef<"Prescription", 'Int'>
    readonly consultation_id: FieldRef<"Prescription", 'Int'>
    readonly created_at: FieldRef<"Prescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to delete.
     */
    limit?: number
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    is_first_login: 'is_first_login',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    patient_id: 'patient_id',
    patient_code: 'patient_code',
    name: 'name',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
    address: 'address',
    nic: 'nic',
    phone: 'phone',
    is_profile_completed: 'is_profile_completed',
    created_by: 'created_by',
    created_at: 'created_at'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const SymptomScalarFieldEnum: {
    symptom_id: 'symptom_id',
    name: 'name'
  };

  export type SymptomScalarFieldEnum = (typeof SymptomScalarFieldEnum)[keyof typeof SymptomScalarFieldEnum]


  export const ExaminationScalarFieldEnum: {
    examination_id: 'examination_id',
    consultation_id: 'consultation_id',
    title: 'title',
    result: 'result'
  };

  export type ExaminationScalarFieldEnum = (typeof ExaminationScalarFieldEnum)[keyof typeof ExaminationScalarFieldEnum]


  export const ConsultationSymptomScalarFieldEnum: {
    consultation_symptom_id: 'consultation_symptom_id',
    consultation_id: 'consultation_id',
    symptom_id: 'symptom_id',
    severity: 'severity',
    duration_value: 'duration_value',
    duration_unit: 'duration_unit'
  };

  export type ConsultationSymptomScalarFieldEnum = (typeof ConsultationSymptomScalarFieldEnum)[keyof typeof ConsultationSymptomScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    consultation_id: 'consultation_id',
    patient_id: 'patient_id',
    doctor_id: 'doctor_id',
    visit_date: 'visit_date',
    notes: 'notes',
    created_at: 'created_at'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const InvestigationScalarFieldEnum: {
    investigation_id: 'investigation_id',
    consultation_id: 'consultation_id',
    title: 'title',
    description: 'description'
  };

  export type InvestigationScalarFieldEnum = (typeof InvestigationScalarFieldEnum)[keyof typeof InvestigationScalarFieldEnum]


  export const PatientInstructionScalarFieldEnum: {
    instruction_id: 'instruction_id',
    consultation_id: 'consultation_id',
    instruction: 'instruction'
  };

  export type PatientInstructionScalarFieldEnum = (typeof PatientInstructionScalarFieldEnum)[keyof typeof PatientInstructionScalarFieldEnum]


  export const DiagnosisScalarFieldEnum: {
    diagnosis_id: 'diagnosis_id',
    consultation_id: 'consultation_id',
    diagnosis_name: 'diagnosis_name',
    notes: 'notes'
  };

  export type DiagnosisScalarFieldEnum = (typeof DiagnosisScalarFieldEnum)[keyof typeof DiagnosisScalarFieldEnum]


  export const PatientGuardianScalarFieldEnum: {
    guardian_id: 'guardian_id',
    patient_id: 'patient_id',
    guardian_name: 'guardian_name',
    guardian_nic: 'guardian_nic',
    guardian_phone: 'guardian_phone',
    guardian_address: 'guardian_address',
    relationship: 'relationship'
  };

  export type PatientGuardianScalarFieldEnum = (typeof PatientGuardianScalarFieldEnum)[keyof typeof PatientGuardianScalarFieldEnum]


  export const PatientAllergyScalarFieldEnum: {
    allergy_id: 'allergy_id',
    patient_id: 'patient_id',
    allergy_name: 'allergy_name'
  };

  export type PatientAllergyScalarFieldEnum = (typeof PatientAllergyScalarFieldEnum)[keyof typeof PatientAllergyScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    prescription_id: 'prescription_id',
    consultation_id: 'consultation_id',
    created_at: 'created_at'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PatientOrderByRelevanceFieldEnum: {
    patient_code: 'patient_code',
    name: 'name',
    gender: 'gender',
    address: 'address',
    nic: 'nic',
    phone: 'phone'
  };

  export type PatientOrderByRelevanceFieldEnum = (typeof PatientOrderByRelevanceFieldEnum)[keyof typeof PatientOrderByRelevanceFieldEnum]


  export const SymptomOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type SymptomOrderByRelevanceFieldEnum = (typeof SymptomOrderByRelevanceFieldEnum)[keyof typeof SymptomOrderByRelevanceFieldEnum]


  export const ExaminationOrderByRelevanceFieldEnum: {
    title: 'title',
    result: 'result'
  };

  export type ExaminationOrderByRelevanceFieldEnum = (typeof ExaminationOrderByRelevanceFieldEnum)[keyof typeof ExaminationOrderByRelevanceFieldEnum]


  export const ConsultationSymptomOrderByRelevanceFieldEnum: {
    duration_unit: 'duration_unit'
  };

  export type ConsultationSymptomOrderByRelevanceFieldEnum = (typeof ConsultationSymptomOrderByRelevanceFieldEnum)[keyof typeof ConsultationSymptomOrderByRelevanceFieldEnum]


  export const ConsultationOrderByRelevanceFieldEnum: {
    notes: 'notes'
  };

  export type ConsultationOrderByRelevanceFieldEnum = (typeof ConsultationOrderByRelevanceFieldEnum)[keyof typeof ConsultationOrderByRelevanceFieldEnum]


  export const InvestigationOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description'
  };

  export type InvestigationOrderByRelevanceFieldEnum = (typeof InvestigationOrderByRelevanceFieldEnum)[keyof typeof InvestigationOrderByRelevanceFieldEnum]


  export const PatientInstructionOrderByRelevanceFieldEnum: {
    instruction: 'instruction'
  };

  export type PatientInstructionOrderByRelevanceFieldEnum = (typeof PatientInstructionOrderByRelevanceFieldEnum)[keyof typeof PatientInstructionOrderByRelevanceFieldEnum]


  export const DiagnosisOrderByRelevanceFieldEnum: {
    diagnosis_name: 'diagnosis_name',
    notes: 'notes'
  };

  export type DiagnosisOrderByRelevanceFieldEnum = (typeof DiagnosisOrderByRelevanceFieldEnum)[keyof typeof DiagnosisOrderByRelevanceFieldEnum]


  export const PatientGuardianOrderByRelevanceFieldEnum: {
    guardian_name: 'guardian_name',
    guardian_nic: 'guardian_nic',
    guardian_phone: 'guardian_phone',
    guardian_address: 'guardian_address',
    relationship: 'relationship'
  };

  export type PatientGuardianOrderByRelevanceFieldEnum = (typeof PatientGuardianOrderByRelevanceFieldEnum)[keyof typeof PatientGuardianOrderByRelevanceFieldEnum]


  export const PatientAllergyOrderByRelevanceFieldEnum: {
    allergy_name: 'allergy_name'
  };

  export type PatientAllergyOrderByRelevanceFieldEnum = (typeof PatientAllergyOrderByRelevanceFieldEnum)[keyof typeof PatientAllergyOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    is_first_login?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_first_login?: SortOrder
    created_at?: SortOrder
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    is_first_login?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
  }, "user_id" | "email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_first_login?: SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    is_first_login?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    patient_id?: IntFilter<"Patient"> | number
    patient_code?: StringFilter<"Patient"> | string
    name?: StringFilter<"Patient"> | string
    gender?: StringFilter<"Patient"> | string
    date_of_birth?: DateTimeFilter<"Patient"> | Date | string
    address?: StringNullableFilter<"Patient"> | string | null
    nic?: StringNullableFilter<"Patient"> | string | null
    phone?: StringNullableFilter<"Patient"> | string | null
    is_profile_completed?: BoolFilter<"Patient"> | boolean
    created_by?: IntFilter<"Patient"> | number
    created_at?: DateTimeFilter<"Patient"> | Date | string
    consultations?: ConsultationListRelationFilter
    guardians?: PatientGuardianListRelationFilter
    allergies?: PatientAllergyListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    patient_id?: SortOrder
    patient_code?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrderInput | SortOrder
    nic?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    is_profile_completed?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    consultations?: ConsultationOrderByRelationAggregateInput
    guardians?: PatientGuardianOrderByRelationAggregateInput
    allergies?: PatientAllergyOrderByRelationAggregateInput
    _relevance?: PatientOrderByRelevanceInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    patient_id?: number
    patient_code?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    gender?: StringFilter<"Patient"> | string
    date_of_birth?: DateTimeFilter<"Patient"> | Date | string
    address?: StringNullableFilter<"Patient"> | string | null
    nic?: StringNullableFilter<"Patient"> | string | null
    phone?: StringNullableFilter<"Patient"> | string | null
    is_profile_completed?: BoolFilter<"Patient"> | boolean
    created_by?: IntFilter<"Patient"> | number
    created_at?: DateTimeFilter<"Patient"> | Date | string
    consultations?: ConsultationListRelationFilter
    guardians?: PatientGuardianListRelationFilter
    allergies?: PatientAllergyListRelationFilter
  }, "patient_id" | "patient_code">

  export type PatientOrderByWithAggregationInput = {
    patient_id?: SortOrder
    patient_code?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrderInput | SortOrder
    nic?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    is_profile_completed?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    patient_id?: IntWithAggregatesFilter<"Patient"> | number
    patient_code?: StringWithAggregatesFilter<"Patient"> | string
    name?: StringWithAggregatesFilter<"Patient"> | string
    gender?: StringWithAggregatesFilter<"Patient"> | string
    date_of_birth?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    address?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    nic?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    is_profile_completed?: BoolWithAggregatesFilter<"Patient"> | boolean
    created_by?: IntWithAggregatesFilter<"Patient"> | number
    created_at?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type SymptomWhereInput = {
    AND?: SymptomWhereInput | SymptomWhereInput[]
    OR?: SymptomWhereInput[]
    NOT?: SymptomWhereInput | SymptomWhereInput[]
    symptom_id?: IntFilter<"Symptom"> | number
    name?: StringFilter<"Symptom"> | string
    consultationSymptoms?: ConsultationSymptomListRelationFilter
  }

  export type SymptomOrderByWithRelationInput = {
    symptom_id?: SortOrder
    name?: SortOrder
    consultationSymptoms?: ConsultationSymptomOrderByRelationAggregateInput
    _relevance?: SymptomOrderByRelevanceInput
  }

  export type SymptomWhereUniqueInput = Prisma.AtLeast<{
    symptom_id?: number
    name?: string
    AND?: SymptomWhereInput | SymptomWhereInput[]
    OR?: SymptomWhereInput[]
    NOT?: SymptomWhereInput | SymptomWhereInput[]
    consultationSymptoms?: ConsultationSymptomListRelationFilter
  }, "symptom_id" | "name">

  export type SymptomOrderByWithAggregationInput = {
    symptom_id?: SortOrder
    name?: SortOrder
    _count?: SymptomCountOrderByAggregateInput
    _avg?: SymptomAvgOrderByAggregateInput
    _max?: SymptomMaxOrderByAggregateInput
    _min?: SymptomMinOrderByAggregateInput
    _sum?: SymptomSumOrderByAggregateInput
  }

  export type SymptomScalarWhereWithAggregatesInput = {
    AND?: SymptomScalarWhereWithAggregatesInput | SymptomScalarWhereWithAggregatesInput[]
    OR?: SymptomScalarWhereWithAggregatesInput[]
    NOT?: SymptomScalarWhereWithAggregatesInput | SymptomScalarWhereWithAggregatesInput[]
    symptom_id?: IntWithAggregatesFilter<"Symptom"> | number
    name?: StringWithAggregatesFilter<"Symptom"> | string
  }

  export type ExaminationWhereInput = {
    AND?: ExaminationWhereInput | ExaminationWhereInput[]
    OR?: ExaminationWhereInput[]
    NOT?: ExaminationWhereInput | ExaminationWhereInput[]
    examination_id?: IntFilter<"Examination"> | number
    consultation_id?: IntFilter<"Examination"> | number
    title?: StringFilter<"Examination"> | string
    result?: StringFilter<"Examination"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type ExaminationOrderByWithRelationInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    result?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    _relevance?: ExaminationOrderByRelevanceInput
  }

  export type ExaminationWhereUniqueInput = Prisma.AtLeast<{
    examination_id?: number
    AND?: ExaminationWhereInput | ExaminationWhereInput[]
    OR?: ExaminationWhereInput[]
    NOT?: ExaminationWhereInput | ExaminationWhereInput[]
    consultation_id?: IntFilter<"Examination"> | number
    title?: StringFilter<"Examination"> | string
    result?: StringFilter<"Examination"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "examination_id">

  export type ExaminationOrderByWithAggregationInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    result?: SortOrder
    _count?: ExaminationCountOrderByAggregateInput
    _avg?: ExaminationAvgOrderByAggregateInput
    _max?: ExaminationMaxOrderByAggregateInput
    _min?: ExaminationMinOrderByAggregateInput
    _sum?: ExaminationSumOrderByAggregateInput
  }

  export type ExaminationScalarWhereWithAggregatesInput = {
    AND?: ExaminationScalarWhereWithAggregatesInput | ExaminationScalarWhereWithAggregatesInput[]
    OR?: ExaminationScalarWhereWithAggregatesInput[]
    NOT?: ExaminationScalarWhereWithAggregatesInput | ExaminationScalarWhereWithAggregatesInput[]
    examination_id?: IntWithAggregatesFilter<"Examination"> | number
    consultation_id?: IntWithAggregatesFilter<"Examination"> | number
    title?: StringWithAggregatesFilter<"Examination"> | string
    result?: StringWithAggregatesFilter<"Examination"> | string
  }

  export type ConsultationSymptomWhereInput = {
    AND?: ConsultationSymptomWhereInput | ConsultationSymptomWhereInput[]
    OR?: ConsultationSymptomWhereInput[]
    NOT?: ConsultationSymptomWhereInput | ConsultationSymptomWhereInput[]
    consultation_symptom_id?: IntFilter<"ConsultationSymptom"> | number
    consultation_id?: IntFilter<"ConsultationSymptom"> | number
    symptom_id?: IntFilter<"ConsultationSymptom"> | number
    severity?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_value?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_unit?: StringNullableFilter<"ConsultationSymptom"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    symptom?: XOR<SymptomScalarRelationFilter, SymptomWhereInput>
  }

  export type ConsultationSymptomOrderByWithRelationInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrderInput | SortOrder
    duration_value?: SortOrderInput | SortOrder
    duration_unit?: SortOrderInput | SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    symptom?: SymptomOrderByWithRelationInput
    _relevance?: ConsultationSymptomOrderByRelevanceInput
  }

  export type ConsultationSymptomWhereUniqueInput = Prisma.AtLeast<{
    consultation_symptom_id?: number
    AND?: ConsultationSymptomWhereInput | ConsultationSymptomWhereInput[]
    OR?: ConsultationSymptomWhereInput[]
    NOT?: ConsultationSymptomWhereInput | ConsultationSymptomWhereInput[]
    consultation_id?: IntFilter<"ConsultationSymptom"> | number
    symptom_id?: IntFilter<"ConsultationSymptom"> | number
    severity?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_value?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_unit?: StringNullableFilter<"ConsultationSymptom"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
    symptom?: XOR<SymptomScalarRelationFilter, SymptomWhereInput>
  }, "consultation_symptom_id">

  export type ConsultationSymptomOrderByWithAggregationInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrderInput | SortOrder
    duration_value?: SortOrderInput | SortOrder
    duration_unit?: SortOrderInput | SortOrder
    _count?: ConsultationSymptomCountOrderByAggregateInput
    _avg?: ConsultationSymptomAvgOrderByAggregateInput
    _max?: ConsultationSymptomMaxOrderByAggregateInput
    _min?: ConsultationSymptomMinOrderByAggregateInput
    _sum?: ConsultationSymptomSumOrderByAggregateInput
  }

  export type ConsultationSymptomScalarWhereWithAggregatesInput = {
    AND?: ConsultationSymptomScalarWhereWithAggregatesInput | ConsultationSymptomScalarWhereWithAggregatesInput[]
    OR?: ConsultationSymptomScalarWhereWithAggregatesInput[]
    NOT?: ConsultationSymptomScalarWhereWithAggregatesInput | ConsultationSymptomScalarWhereWithAggregatesInput[]
    consultation_symptom_id?: IntWithAggregatesFilter<"ConsultationSymptom"> | number
    consultation_id?: IntWithAggregatesFilter<"ConsultationSymptom"> | number
    symptom_id?: IntWithAggregatesFilter<"ConsultationSymptom"> | number
    severity?: FloatNullableWithAggregatesFilter<"ConsultationSymptom"> | number | null
    duration_value?: FloatNullableWithAggregatesFilter<"ConsultationSymptom"> | number | null
    duration_unit?: StringNullableWithAggregatesFilter<"ConsultationSymptom"> | string | null
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    consultation_id?: IntFilter<"Consultation"> | number
    patient_id?: IntFilter<"Consultation"> | number
    doctor_id?: IntFilter<"Consultation"> | number
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
    notes?: StringNullableFilter<"Consultation"> | string | null
    created_at?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    prescriptions?: PrescriptionListRelationFilter
    examinations?: ExaminationListRelationFilter
    consultationSymptoms?: ConsultationSymptomListRelationFilter
    investigations?: InvestigationListRelationFilter
    instructions?: PatientInstructionListRelationFilter
    diagnoses?: DiagnosisListRelationFilter
  }

  export type ConsultationOrderByWithRelationInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
    visit_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    patient?: PatientOrderByWithRelationInput
    prescriptions?: PrescriptionOrderByRelationAggregateInput
    examinations?: ExaminationOrderByRelationAggregateInput
    consultationSymptoms?: ConsultationSymptomOrderByRelationAggregateInput
    investigations?: InvestigationOrderByRelationAggregateInput
    instructions?: PatientInstructionOrderByRelationAggregateInput
    diagnoses?: DiagnosisOrderByRelationAggregateInput
    _relevance?: ConsultationOrderByRelevanceInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    consultation_id?: number
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    patient_id?: IntFilter<"Consultation"> | number
    doctor_id?: IntFilter<"Consultation"> | number
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
    notes?: StringNullableFilter<"Consultation"> | string | null
    created_at?: DateTimeFilter<"Consultation"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    prescriptions?: PrescriptionListRelationFilter
    examinations?: ExaminationListRelationFilter
    consultationSymptoms?: ConsultationSymptomListRelationFilter
    investigations?: InvestigationListRelationFilter
    instructions?: PatientInstructionListRelationFilter
    diagnoses?: DiagnosisListRelationFilter
  }, "consultation_id">

  export type ConsultationOrderByWithAggregationInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
    visit_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _avg?: ConsultationAvgOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
    _sum?: ConsultationSumOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    consultation_id?: IntWithAggregatesFilter<"Consultation"> | number
    patient_id?: IntWithAggregatesFilter<"Consultation"> | number
    doctor_id?: IntWithAggregatesFilter<"Consultation"> | number
    visit_date?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
  }

  export type InvestigationWhereInput = {
    AND?: InvestigationWhereInput | InvestigationWhereInput[]
    OR?: InvestigationWhereInput[]
    NOT?: InvestigationWhereInput | InvestigationWhereInput[]
    investigation_id?: IntFilter<"Investigation"> | number
    consultation_id?: IntFilter<"Investigation"> | number
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type InvestigationOrderByWithRelationInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    _relevance?: InvestigationOrderByRelevanceInput
  }

  export type InvestigationWhereUniqueInput = Prisma.AtLeast<{
    investigation_id?: number
    AND?: InvestigationWhereInput | InvestigationWhereInput[]
    OR?: InvestigationWhereInput[]
    NOT?: InvestigationWhereInput | InvestigationWhereInput[]
    consultation_id?: IntFilter<"Investigation"> | number
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "investigation_id">

  export type InvestigationOrderByWithAggregationInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: InvestigationCountOrderByAggregateInput
    _avg?: InvestigationAvgOrderByAggregateInput
    _max?: InvestigationMaxOrderByAggregateInput
    _min?: InvestigationMinOrderByAggregateInput
    _sum?: InvestigationSumOrderByAggregateInput
  }

  export type InvestigationScalarWhereWithAggregatesInput = {
    AND?: InvestigationScalarWhereWithAggregatesInput | InvestigationScalarWhereWithAggregatesInput[]
    OR?: InvestigationScalarWhereWithAggregatesInput[]
    NOT?: InvestigationScalarWhereWithAggregatesInput | InvestigationScalarWhereWithAggregatesInput[]
    investigation_id?: IntWithAggregatesFilter<"Investigation"> | number
    consultation_id?: IntWithAggregatesFilter<"Investigation"> | number
    title?: StringWithAggregatesFilter<"Investigation"> | string
    description?: StringNullableWithAggregatesFilter<"Investigation"> | string | null
  }

  export type PatientInstructionWhereInput = {
    AND?: PatientInstructionWhereInput | PatientInstructionWhereInput[]
    OR?: PatientInstructionWhereInput[]
    NOT?: PatientInstructionWhereInput | PatientInstructionWhereInput[]
    instruction_id?: IntFilter<"PatientInstruction"> | number
    consultation_id?: IntFilter<"PatientInstruction"> | number
    instruction?: StringFilter<"PatientInstruction"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type PatientInstructionOrderByWithRelationInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
    instruction?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    _relevance?: PatientInstructionOrderByRelevanceInput
  }

  export type PatientInstructionWhereUniqueInput = Prisma.AtLeast<{
    instruction_id?: number
    AND?: PatientInstructionWhereInput | PatientInstructionWhereInput[]
    OR?: PatientInstructionWhereInput[]
    NOT?: PatientInstructionWhereInput | PatientInstructionWhereInput[]
    consultation_id?: IntFilter<"PatientInstruction"> | number
    instruction?: StringFilter<"PatientInstruction"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "instruction_id">

  export type PatientInstructionOrderByWithAggregationInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
    instruction?: SortOrder
    _count?: PatientInstructionCountOrderByAggregateInput
    _avg?: PatientInstructionAvgOrderByAggregateInput
    _max?: PatientInstructionMaxOrderByAggregateInput
    _min?: PatientInstructionMinOrderByAggregateInput
    _sum?: PatientInstructionSumOrderByAggregateInput
  }

  export type PatientInstructionScalarWhereWithAggregatesInput = {
    AND?: PatientInstructionScalarWhereWithAggregatesInput | PatientInstructionScalarWhereWithAggregatesInput[]
    OR?: PatientInstructionScalarWhereWithAggregatesInput[]
    NOT?: PatientInstructionScalarWhereWithAggregatesInput | PatientInstructionScalarWhereWithAggregatesInput[]
    instruction_id?: IntWithAggregatesFilter<"PatientInstruction"> | number
    consultation_id?: IntWithAggregatesFilter<"PatientInstruction"> | number
    instruction?: StringWithAggregatesFilter<"PatientInstruction"> | string
  }

  export type DiagnosisWhereInput = {
    AND?: DiagnosisWhereInput | DiagnosisWhereInput[]
    OR?: DiagnosisWhereInput[]
    NOT?: DiagnosisWhereInput | DiagnosisWhereInput[]
    diagnosis_id?: IntFilter<"Diagnosis"> | number
    consultation_id?: IntFilter<"Diagnosis"> | number
    diagnosis_name?: StringFilter<"Diagnosis"> | string
    notes?: StringNullableFilter<"Diagnosis"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type DiagnosisOrderByWithRelationInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
    diagnosis_name?: SortOrder
    notes?: SortOrderInput | SortOrder
    consultation?: ConsultationOrderByWithRelationInput
    _relevance?: DiagnosisOrderByRelevanceInput
  }

  export type DiagnosisWhereUniqueInput = Prisma.AtLeast<{
    diagnosis_id?: number
    AND?: DiagnosisWhereInput | DiagnosisWhereInput[]
    OR?: DiagnosisWhereInput[]
    NOT?: DiagnosisWhereInput | DiagnosisWhereInput[]
    consultation_id?: IntFilter<"Diagnosis"> | number
    diagnosis_name?: StringFilter<"Diagnosis"> | string
    notes?: StringNullableFilter<"Diagnosis"> | string | null
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "diagnosis_id">

  export type DiagnosisOrderByWithAggregationInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
    diagnosis_name?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: DiagnosisCountOrderByAggregateInput
    _avg?: DiagnosisAvgOrderByAggregateInput
    _max?: DiagnosisMaxOrderByAggregateInput
    _min?: DiagnosisMinOrderByAggregateInput
    _sum?: DiagnosisSumOrderByAggregateInput
  }

  export type DiagnosisScalarWhereWithAggregatesInput = {
    AND?: DiagnosisScalarWhereWithAggregatesInput | DiagnosisScalarWhereWithAggregatesInput[]
    OR?: DiagnosisScalarWhereWithAggregatesInput[]
    NOT?: DiagnosisScalarWhereWithAggregatesInput | DiagnosisScalarWhereWithAggregatesInput[]
    diagnosis_id?: IntWithAggregatesFilter<"Diagnosis"> | number
    consultation_id?: IntWithAggregatesFilter<"Diagnosis"> | number
    diagnosis_name?: StringWithAggregatesFilter<"Diagnosis"> | string
    notes?: StringNullableWithAggregatesFilter<"Diagnosis"> | string | null
  }

  export type PatientGuardianWhereInput = {
    AND?: PatientGuardianWhereInput | PatientGuardianWhereInput[]
    OR?: PatientGuardianWhereInput[]
    NOT?: PatientGuardianWhereInput | PatientGuardianWhereInput[]
    guardian_id?: IntFilter<"PatientGuardian"> | number
    patient_id?: IntFilter<"PatientGuardian"> | number
    guardian_name?: StringFilter<"PatientGuardian"> | string
    guardian_nic?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_phone?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_address?: StringNullableFilter<"PatientGuardian"> | string | null
    relationship?: StringFilter<"PatientGuardian"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PatientGuardianOrderByWithRelationInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
    guardian_name?: SortOrder
    guardian_nic?: SortOrderInput | SortOrder
    guardian_phone?: SortOrderInput | SortOrder
    guardian_address?: SortOrderInput | SortOrder
    relationship?: SortOrder
    patient?: PatientOrderByWithRelationInput
    _relevance?: PatientGuardianOrderByRelevanceInput
  }

  export type PatientGuardianWhereUniqueInput = Prisma.AtLeast<{
    guardian_id?: number
    AND?: PatientGuardianWhereInput | PatientGuardianWhereInput[]
    OR?: PatientGuardianWhereInput[]
    NOT?: PatientGuardianWhereInput | PatientGuardianWhereInput[]
    patient_id?: IntFilter<"PatientGuardian"> | number
    guardian_name?: StringFilter<"PatientGuardian"> | string
    guardian_nic?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_phone?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_address?: StringNullableFilter<"PatientGuardian"> | string | null
    relationship?: StringFilter<"PatientGuardian"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "guardian_id">

  export type PatientGuardianOrderByWithAggregationInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
    guardian_name?: SortOrder
    guardian_nic?: SortOrderInput | SortOrder
    guardian_phone?: SortOrderInput | SortOrder
    guardian_address?: SortOrderInput | SortOrder
    relationship?: SortOrder
    _count?: PatientGuardianCountOrderByAggregateInput
    _avg?: PatientGuardianAvgOrderByAggregateInput
    _max?: PatientGuardianMaxOrderByAggregateInput
    _min?: PatientGuardianMinOrderByAggregateInput
    _sum?: PatientGuardianSumOrderByAggregateInput
  }

  export type PatientGuardianScalarWhereWithAggregatesInput = {
    AND?: PatientGuardianScalarWhereWithAggregatesInput | PatientGuardianScalarWhereWithAggregatesInput[]
    OR?: PatientGuardianScalarWhereWithAggregatesInput[]
    NOT?: PatientGuardianScalarWhereWithAggregatesInput | PatientGuardianScalarWhereWithAggregatesInput[]
    guardian_id?: IntWithAggregatesFilter<"PatientGuardian"> | number
    patient_id?: IntWithAggregatesFilter<"PatientGuardian"> | number
    guardian_name?: StringWithAggregatesFilter<"PatientGuardian"> | string
    guardian_nic?: StringNullableWithAggregatesFilter<"PatientGuardian"> | string | null
    guardian_phone?: StringNullableWithAggregatesFilter<"PatientGuardian"> | string | null
    guardian_address?: StringNullableWithAggregatesFilter<"PatientGuardian"> | string | null
    relationship?: StringWithAggregatesFilter<"PatientGuardian"> | string
  }

  export type PatientAllergyWhereInput = {
    AND?: PatientAllergyWhereInput | PatientAllergyWhereInput[]
    OR?: PatientAllergyWhereInput[]
    NOT?: PatientAllergyWhereInput | PatientAllergyWhereInput[]
    allergy_id?: IntFilter<"PatientAllergy"> | number
    patient_id?: IntFilter<"PatientAllergy"> | number
    allergy_name?: StringFilter<"PatientAllergy"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PatientAllergyOrderByWithRelationInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
    allergy_name?: SortOrder
    patient?: PatientOrderByWithRelationInput
    _relevance?: PatientAllergyOrderByRelevanceInput
  }

  export type PatientAllergyWhereUniqueInput = Prisma.AtLeast<{
    allergy_id?: number
    AND?: PatientAllergyWhereInput | PatientAllergyWhereInput[]
    OR?: PatientAllergyWhereInput[]
    NOT?: PatientAllergyWhereInput | PatientAllergyWhereInput[]
    patient_id?: IntFilter<"PatientAllergy"> | number
    allergy_name?: StringFilter<"PatientAllergy"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "allergy_id">

  export type PatientAllergyOrderByWithAggregationInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
    allergy_name?: SortOrder
    _count?: PatientAllergyCountOrderByAggregateInput
    _avg?: PatientAllergyAvgOrderByAggregateInput
    _max?: PatientAllergyMaxOrderByAggregateInput
    _min?: PatientAllergyMinOrderByAggregateInput
    _sum?: PatientAllergySumOrderByAggregateInput
  }

  export type PatientAllergyScalarWhereWithAggregatesInput = {
    AND?: PatientAllergyScalarWhereWithAggregatesInput | PatientAllergyScalarWhereWithAggregatesInput[]
    OR?: PatientAllergyScalarWhereWithAggregatesInput[]
    NOT?: PatientAllergyScalarWhereWithAggregatesInput | PatientAllergyScalarWhereWithAggregatesInput[]
    allergy_id?: IntWithAggregatesFilter<"PatientAllergy"> | number
    patient_id?: IntWithAggregatesFilter<"PatientAllergy"> | number
    allergy_name?: StringWithAggregatesFilter<"PatientAllergy"> | string
  }

  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    prescription_id?: IntFilter<"Prescription"> | number
    consultation_id?: IntFilter<"Prescription"> | number
    created_at?: DateTimeFilter<"Prescription"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type PrescriptionOrderByWithRelationInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
    created_at?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    prescription_id?: number
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    consultation_id?: IntFilter<"Prescription"> | number
    created_at?: DateTimeFilter<"Prescription"> | Date | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "prescription_id">

  export type PrescriptionOrderByWithAggregationInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
    created_at?: SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _avg?: PrescriptionAvgOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
    _sum?: PrescriptionSumOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    prescription_id?: IntWithAggregatesFilter<"Prescription"> | number
    consultation_id?: IntWithAggregatesFilter<"Prescription"> | number
    created_at?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    is_first_login?: boolean
    created_at?: Date | string
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    is_first_login?: boolean
    created_at?: Date | string
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    is_first_login?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    is_first_login?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    user_id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    is_first_login?: boolean
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    is_first_login?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    is_first_login?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    guardians?: PatientGuardianCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    patient_id?: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    guardians?: PatientGuardianUncheckedCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    guardians?: PatientGuardianUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    guardians?: PatientGuardianUncheckedUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    patient_id?: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SymptomCreateInput = {
    name: string
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutSymptomInput
  }

  export type SymptomUncheckedCreateInput = {
    symptom_id?: number
    name: string
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutSymptomInput
  }

  export type SymptomUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutSymptomNestedInput
  }

  export type SymptomUncheckedUpdateInput = {
    symptom_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutSymptomNestedInput
  }

  export type SymptomCreateManyInput = {
    symptom_id?: number
    name: string
  }

  export type SymptomUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomUncheckedUpdateManyInput = {
    symptom_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminationCreateInput = {
    title: string
    result: string
    consultation: ConsultationCreateNestedOneWithoutExaminationsInput
  }

  export type ExaminationUncheckedCreateInput = {
    examination_id?: number
    consultation_id: number
    title: string
    result: string
  }

  export type ExaminationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
    consultation?: ConsultationUpdateOneRequiredWithoutExaminationsNestedInput
  }

  export type ExaminationUncheckedUpdateInput = {
    examination_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminationCreateManyInput = {
    examination_id?: number
    consultation_id: number
    title: string
    result: string
  }

  export type ExaminationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminationUncheckedUpdateManyInput = {
    examination_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationSymptomCreateInput = {
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
    consultation: ConsultationCreateNestedOneWithoutConsultationSymptomsInput
    symptom: SymptomCreateNestedOneWithoutConsultationSymptomsInput
  }

  export type ConsultationSymptomUncheckedCreateInput = {
    consultation_symptom_id?: number
    consultation_id: number
    symptom_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type ConsultationSymptomUpdateInput = {
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUpdateOneRequiredWithoutConsultationSymptomsNestedInput
    symptom?: SymptomUpdateOneRequiredWithoutConsultationSymptomsNestedInput
  }

  export type ConsultationSymptomUncheckedUpdateInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    symptom_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsultationSymptomCreateManyInput = {
    consultation_symptom_id?: number
    consultation_id: number
    symptom_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type ConsultationSymptomUpdateManyMutationInput = {
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsultationSymptomUncheckedUpdateManyInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    symptom_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsultationCreateInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUpdateInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationCreateManyInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
  }

  export type ConsultationUpdateManyMutationInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestigationCreateInput = {
    title: string
    description?: string | null
    consultation: ConsultationCreateNestedOneWithoutInvestigationsInput
  }

  export type InvestigationUncheckedCreateInput = {
    investigation_id?: number
    consultation_id: number
    title: string
    description?: string | null
  }

  export type InvestigationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUpdateOneRequiredWithoutInvestigationsNestedInput
  }

  export type InvestigationUncheckedUpdateInput = {
    investigation_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationCreateManyInput = {
    investigation_id?: number
    consultation_id: number
    title: string
    description?: string | null
  }

  export type InvestigationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationUncheckedUpdateManyInput = {
    investigation_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientInstructionCreateInput = {
    instruction: string
    consultation: ConsultationCreateNestedOneWithoutInstructionsInput
  }

  export type PatientInstructionUncheckedCreateInput = {
    instruction_id?: number
    consultation_id: number
    instruction: string
  }

  export type PatientInstructionUpdateInput = {
    instruction?: StringFieldUpdateOperationsInput | string
    consultation?: ConsultationUpdateOneRequiredWithoutInstructionsNestedInput
  }

  export type PatientInstructionUncheckedUpdateInput = {
    instruction_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type PatientInstructionCreateManyInput = {
    instruction_id?: number
    consultation_id: number
    instruction: string
  }

  export type PatientInstructionUpdateManyMutationInput = {
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type PatientInstructionUncheckedUpdateManyInput = {
    instruction_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type DiagnosisCreateInput = {
    diagnosis_name: string
    notes?: string | null
    consultation: ConsultationCreateNestedOneWithoutDiagnosesInput
  }

  export type DiagnosisUncheckedCreateInput = {
    diagnosis_id?: number
    consultation_id: number
    diagnosis_name: string
    notes?: string | null
  }

  export type DiagnosisUpdateInput = {
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUpdateOneRequiredWithoutDiagnosesNestedInput
  }

  export type DiagnosisUncheckedUpdateInput = {
    diagnosis_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiagnosisCreateManyInput = {
    diagnosis_id?: number
    consultation_id: number
    diagnosis_name: string
    notes?: string | null
  }

  export type DiagnosisUpdateManyMutationInput = {
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiagnosisUncheckedUpdateManyInput = {
    diagnosis_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientGuardianCreateInput = {
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
    patient: PatientCreateNestedOneWithoutGuardiansInput
  }

  export type PatientGuardianUncheckedCreateInput = {
    guardian_id?: number
    patient_id: number
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
  }

  export type PatientGuardianUpdateInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutGuardiansNestedInput
  }

  export type PatientGuardianUncheckedUpdateInput = {
    guardian_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientGuardianCreateManyInput = {
    guardian_id?: number
    patient_id: number
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
  }

  export type PatientGuardianUpdateManyMutationInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientGuardianUncheckedUpdateManyInput = {
    guardian_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyCreateInput = {
    allergy_name: string
    patient: PatientCreateNestedOneWithoutAllergiesInput
  }

  export type PatientAllergyUncheckedCreateInput = {
    allergy_id?: number
    patient_id: number
    allergy_name: string
  }

  export type PatientAllergyUpdateInput = {
    allergy_name?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutAllergiesNestedInput
  }

  export type PatientAllergyUncheckedUpdateInput = {
    allergy_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyCreateManyInput = {
    allergy_id?: number
    patient_id: number
    allergy_name: string
  }

  export type PatientAllergyUpdateManyMutationInput = {
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyUncheckedUpdateManyInput = {
    allergy_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionCreateInput = {
    created_at?: Date | string
    consultation: ConsultationCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateInput = {
    prescription_id?: number
    consultation_id: number
    created_at?: Date | string
  }

  export type PrescriptionUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    prescription_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateManyInput = {
    prescription_id?: number
    consultation_id: number
    created_at?: Date | string
  }

  export type PrescriptionUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    prescription_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_first_login?: SortOrder
    created_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_first_login?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_first_login?: SortOrder
    created_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type PatientGuardianListRelationFilter = {
    every?: PatientGuardianWhereInput
    some?: PatientGuardianWhereInput
    none?: PatientGuardianWhereInput
  }

  export type PatientAllergyListRelationFilter = {
    every?: PatientAllergyWhereInput
    some?: PatientAllergyWhereInput
    none?: PatientAllergyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientGuardianOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientAllergyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientOrderByRelevanceInput = {
    fields: PatientOrderByRelevanceFieldEnum | PatientOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PatientCountOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_code?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    nic?: SortOrder
    phone?: SortOrder
    is_profile_completed?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    patient_id?: SortOrder
    created_by?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_code?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    nic?: SortOrder
    phone?: SortOrder
    is_profile_completed?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_code?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    address?: SortOrder
    nic?: SortOrder
    phone?: SortOrder
    is_profile_completed?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    patient_id?: SortOrder
    created_by?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ConsultationSymptomListRelationFilter = {
    every?: ConsultationSymptomWhereInput
    some?: ConsultationSymptomWhereInput
    none?: ConsultationSymptomWhereInput
  }

  export type ConsultationSymptomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SymptomOrderByRelevanceInput = {
    fields: SymptomOrderByRelevanceFieldEnum | SymptomOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SymptomCountOrderByAggregateInput = {
    symptom_id?: SortOrder
    name?: SortOrder
  }

  export type SymptomAvgOrderByAggregateInput = {
    symptom_id?: SortOrder
  }

  export type SymptomMaxOrderByAggregateInput = {
    symptom_id?: SortOrder
    name?: SortOrder
  }

  export type SymptomMinOrderByAggregateInput = {
    symptom_id?: SortOrder
    name?: SortOrder
  }

  export type SymptomSumOrderByAggregateInput = {
    symptom_id?: SortOrder
  }

  export type ConsultationScalarRelationFilter = {
    is?: ConsultationWhereInput
    isNot?: ConsultationWhereInput
  }

  export type ExaminationOrderByRelevanceInput = {
    fields: ExaminationOrderByRelevanceFieldEnum | ExaminationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ExaminationCountOrderByAggregateInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    result?: SortOrder
  }

  export type ExaminationAvgOrderByAggregateInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type ExaminationMaxOrderByAggregateInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    result?: SortOrder
  }

  export type ExaminationMinOrderByAggregateInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    result?: SortOrder
  }

  export type ExaminationSumOrderByAggregateInput = {
    examination_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SymptomScalarRelationFilter = {
    is?: SymptomWhereInput
    isNot?: SymptomWhereInput
  }

  export type ConsultationSymptomOrderByRelevanceInput = {
    fields: ConsultationSymptomOrderByRelevanceFieldEnum | ConsultationSymptomOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ConsultationSymptomCountOrderByAggregateInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrder
    duration_value?: SortOrder
    duration_unit?: SortOrder
  }

  export type ConsultationSymptomAvgOrderByAggregateInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrder
    duration_value?: SortOrder
  }

  export type ConsultationSymptomMaxOrderByAggregateInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrder
    duration_value?: SortOrder
    duration_unit?: SortOrder
  }

  export type ConsultationSymptomMinOrderByAggregateInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrder
    duration_value?: SortOrder
    duration_unit?: SortOrder
  }

  export type ConsultationSymptomSumOrderByAggregateInput = {
    consultation_symptom_id?: SortOrder
    consultation_id?: SortOrder
    symptom_id?: SortOrder
    severity?: SortOrder
    duration_value?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type PrescriptionListRelationFilter = {
    every?: PrescriptionWhereInput
    some?: PrescriptionWhereInput
    none?: PrescriptionWhereInput
  }

  export type ExaminationListRelationFilter = {
    every?: ExaminationWhereInput
    some?: ExaminationWhereInput
    none?: ExaminationWhereInput
  }

  export type InvestigationListRelationFilter = {
    every?: InvestigationWhereInput
    some?: InvestigationWhereInput
    none?: InvestigationWhereInput
  }

  export type PatientInstructionListRelationFilter = {
    every?: PatientInstructionWhereInput
    some?: PatientInstructionWhereInput
    none?: PatientInstructionWhereInput
  }

  export type DiagnosisListRelationFilter = {
    every?: DiagnosisWhereInput
    some?: DiagnosisWhereInput
    none?: DiagnosisWhereInput
  }

  export type PrescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExaminationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvestigationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientInstructionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiagnosisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationOrderByRelevanceInput = {
    fields: ConsultationOrderByRelevanceFieldEnum | ConsultationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ConsultationCountOrderByAggregateInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
    visit_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type ConsultationAvgOrderByAggregateInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
    visit_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
    visit_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type ConsultationSumOrderByAggregateInput = {
    consultation_id?: SortOrder
    patient_id?: SortOrder
    doctor_id?: SortOrder
  }

  export type InvestigationOrderByRelevanceInput = {
    fields: InvestigationOrderByRelevanceFieldEnum | InvestigationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvestigationCountOrderByAggregateInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
  }

  export type InvestigationAvgOrderByAggregateInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type InvestigationMaxOrderByAggregateInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
  }

  export type InvestigationMinOrderByAggregateInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
  }

  export type InvestigationSumOrderByAggregateInput = {
    investigation_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type PatientInstructionOrderByRelevanceInput = {
    fields: PatientInstructionOrderByRelevanceFieldEnum | PatientInstructionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PatientInstructionCountOrderByAggregateInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
    instruction?: SortOrder
  }

  export type PatientInstructionAvgOrderByAggregateInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type PatientInstructionMaxOrderByAggregateInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
    instruction?: SortOrder
  }

  export type PatientInstructionMinOrderByAggregateInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
    instruction?: SortOrder
  }

  export type PatientInstructionSumOrderByAggregateInput = {
    instruction_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type DiagnosisOrderByRelevanceInput = {
    fields: DiagnosisOrderByRelevanceFieldEnum | DiagnosisOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DiagnosisCountOrderByAggregateInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
    diagnosis_name?: SortOrder
    notes?: SortOrder
  }

  export type DiagnosisAvgOrderByAggregateInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type DiagnosisMaxOrderByAggregateInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
    diagnosis_name?: SortOrder
    notes?: SortOrder
  }

  export type DiagnosisMinOrderByAggregateInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
    diagnosis_name?: SortOrder
    notes?: SortOrder
  }

  export type DiagnosisSumOrderByAggregateInput = {
    diagnosis_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type PatientGuardianOrderByRelevanceInput = {
    fields: PatientGuardianOrderByRelevanceFieldEnum | PatientGuardianOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PatientGuardianCountOrderByAggregateInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
    guardian_name?: SortOrder
    guardian_nic?: SortOrder
    guardian_phone?: SortOrder
    guardian_address?: SortOrder
    relationship?: SortOrder
  }

  export type PatientGuardianAvgOrderByAggregateInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
  }

  export type PatientGuardianMaxOrderByAggregateInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
    guardian_name?: SortOrder
    guardian_nic?: SortOrder
    guardian_phone?: SortOrder
    guardian_address?: SortOrder
    relationship?: SortOrder
  }

  export type PatientGuardianMinOrderByAggregateInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
    guardian_name?: SortOrder
    guardian_nic?: SortOrder
    guardian_phone?: SortOrder
    guardian_address?: SortOrder
    relationship?: SortOrder
  }

  export type PatientGuardianSumOrderByAggregateInput = {
    guardian_id?: SortOrder
    patient_id?: SortOrder
  }

  export type PatientAllergyOrderByRelevanceInput = {
    fields: PatientAllergyOrderByRelevanceFieldEnum | PatientAllergyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PatientAllergyCountOrderByAggregateInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
    allergy_name?: SortOrder
  }

  export type PatientAllergyAvgOrderByAggregateInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
  }

  export type PatientAllergyMaxOrderByAggregateInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
    allergy_name?: SortOrder
  }

  export type PatientAllergyMinOrderByAggregateInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
    allergy_name?: SortOrder
  }

  export type PatientAllergySumOrderByAggregateInput = {
    allergy_id?: SortOrder
    patient_id?: SortOrder
  }

  export type PrescriptionCountOrderByAggregateInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
    created_at?: SortOrder
  }

  export type PrescriptionAvgOrderByAggregateInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
    created_at?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
    created_at?: SortOrder
  }

  export type PrescriptionSumOrderByAggregateInput = {
    prescription_id?: SortOrder
    consultation_id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConsultationCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type PatientGuardianCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput> | PatientGuardianCreateWithoutPatientInput[] | PatientGuardianUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientGuardianCreateOrConnectWithoutPatientInput | PatientGuardianCreateOrConnectWithoutPatientInput[]
    createMany?: PatientGuardianCreateManyPatientInputEnvelope
    connect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
  }

  export type PatientAllergyCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput> | PatientAllergyCreateWithoutPatientInput[] | PatientAllergyUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAllergyCreateOrConnectWithoutPatientInput | PatientAllergyCreateOrConnectWithoutPatientInput[]
    createMany?: PatientAllergyCreateManyPatientInputEnvelope
    connect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type PatientGuardianUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput> | PatientGuardianCreateWithoutPatientInput[] | PatientGuardianUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientGuardianCreateOrConnectWithoutPatientInput | PatientGuardianCreateOrConnectWithoutPatientInput[]
    createMany?: PatientGuardianCreateManyPatientInputEnvelope
    connect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
  }

  export type PatientAllergyUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput> | PatientAllergyCreateWithoutPatientInput[] | PatientAllergyUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAllergyCreateOrConnectWithoutPatientInput | PatientAllergyCreateOrConnectWithoutPatientInput[]
    createMany?: PatientAllergyCreateManyPatientInputEnvelope
    connect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ConsultationUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PatientGuardianUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput> | PatientGuardianCreateWithoutPatientInput[] | PatientGuardianUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientGuardianCreateOrConnectWithoutPatientInput | PatientGuardianCreateOrConnectWithoutPatientInput[]
    upsert?: PatientGuardianUpsertWithWhereUniqueWithoutPatientInput | PatientGuardianUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientGuardianCreateManyPatientInputEnvelope
    set?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    disconnect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    delete?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    connect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    update?: PatientGuardianUpdateWithWhereUniqueWithoutPatientInput | PatientGuardianUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientGuardianUpdateManyWithWhereWithoutPatientInput | PatientGuardianUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientGuardianScalarWhereInput | PatientGuardianScalarWhereInput[]
  }

  export type PatientAllergyUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput> | PatientAllergyCreateWithoutPatientInput[] | PatientAllergyUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAllergyCreateOrConnectWithoutPatientInput | PatientAllergyCreateOrConnectWithoutPatientInput[]
    upsert?: PatientAllergyUpsertWithWhereUniqueWithoutPatientInput | PatientAllergyUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientAllergyCreateManyPatientInputEnvelope
    set?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    disconnect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    delete?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    connect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    update?: PatientAllergyUpdateWithWhereUniqueWithoutPatientInput | PatientAllergyUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientAllergyUpdateManyWithWhereWithoutPatientInput | PatientAllergyUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientAllergyScalarWhereInput | PatientAllergyScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PatientGuardianUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput> | PatientGuardianCreateWithoutPatientInput[] | PatientGuardianUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientGuardianCreateOrConnectWithoutPatientInput | PatientGuardianCreateOrConnectWithoutPatientInput[]
    upsert?: PatientGuardianUpsertWithWhereUniqueWithoutPatientInput | PatientGuardianUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientGuardianCreateManyPatientInputEnvelope
    set?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    disconnect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    delete?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    connect?: PatientGuardianWhereUniqueInput | PatientGuardianWhereUniqueInput[]
    update?: PatientGuardianUpdateWithWhereUniqueWithoutPatientInput | PatientGuardianUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientGuardianUpdateManyWithWhereWithoutPatientInput | PatientGuardianUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientGuardianScalarWhereInput | PatientGuardianScalarWhereInput[]
  }

  export type PatientAllergyUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput> | PatientAllergyCreateWithoutPatientInput[] | PatientAllergyUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAllergyCreateOrConnectWithoutPatientInput | PatientAllergyCreateOrConnectWithoutPatientInput[]
    upsert?: PatientAllergyUpsertWithWhereUniqueWithoutPatientInput | PatientAllergyUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientAllergyCreateManyPatientInputEnvelope
    set?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    disconnect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    delete?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    connect?: PatientAllergyWhereUniqueInput | PatientAllergyWhereUniqueInput[]
    update?: PatientAllergyUpdateWithWhereUniqueWithoutPatientInput | PatientAllergyUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientAllergyUpdateManyWithWhereWithoutPatientInput | PatientAllergyUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientAllergyScalarWhereInput | PatientAllergyScalarWhereInput[]
  }

  export type ConsultationSymptomCreateNestedManyWithoutSymptomInput = {
    create?: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput> | ConsultationSymptomCreateWithoutSymptomInput[] | ConsultationSymptomUncheckedCreateWithoutSymptomInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutSymptomInput | ConsultationSymptomCreateOrConnectWithoutSymptomInput[]
    createMany?: ConsultationSymptomCreateManySymptomInputEnvelope
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
  }

  export type ConsultationSymptomUncheckedCreateNestedManyWithoutSymptomInput = {
    create?: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput> | ConsultationSymptomCreateWithoutSymptomInput[] | ConsultationSymptomUncheckedCreateWithoutSymptomInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutSymptomInput | ConsultationSymptomCreateOrConnectWithoutSymptomInput[]
    createMany?: ConsultationSymptomCreateManySymptomInputEnvelope
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
  }

  export type ConsultationSymptomUpdateManyWithoutSymptomNestedInput = {
    create?: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput> | ConsultationSymptomCreateWithoutSymptomInput[] | ConsultationSymptomUncheckedCreateWithoutSymptomInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutSymptomInput | ConsultationSymptomCreateOrConnectWithoutSymptomInput[]
    upsert?: ConsultationSymptomUpsertWithWhereUniqueWithoutSymptomInput | ConsultationSymptomUpsertWithWhereUniqueWithoutSymptomInput[]
    createMany?: ConsultationSymptomCreateManySymptomInputEnvelope
    set?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    disconnect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    delete?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    update?: ConsultationSymptomUpdateWithWhereUniqueWithoutSymptomInput | ConsultationSymptomUpdateWithWhereUniqueWithoutSymptomInput[]
    updateMany?: ConsultationSymptomUpdateManyWithWhereWithoutSymptomInput | ConsultationSymptomUpdateManyWithWhereWithoutSymptomInput[]
    deleteMany?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
  }

  export type ConsultationSymptomUncheckedUpdateManyWithoutSymptomNestedInput = {
    create?: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput> | ConsultationSymptomCreateWithoutSymptomInput[] | ConsultationSymptomUncheckedCreateWithoutSymptomInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutSymptomInput | ConsultationSymptomCreateOrConnectWithoutSymptomInput[]
    upsert?: ConsultationSymptomUpsertWithWhereUniqueWithoutSymptomInput | ConsultationSymptomUpsertWithWhereUniqueWithoutSymptomInput[]
    createMany?: ConsultationSymptomCreateManySymptomInputEnvelope
    set?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    disconnect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    delete?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    update?: ConsultationSymptomUpdateWithWhereUniqueWithoutSymptomInput | ConsultationSymptomUpdateWithWhereUniqueWithoutSymptomInput[]
    updateMany?: ConsultationSymptomUpdateManyWithWhereWithoutSymptomInput | ConsultationSymptomUpdateManyWithWhereWithoutSymptomInput[]
    deleteMany?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
  }

  export type ConsultationCreateNestedOneWithoutExaminationsInput = {
    create?: XOR<ConsultationCreateWithoutExaminationsInput, ConsultationUncheckedCreateWithoutExaminationsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutExaminationsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutExaminationsNestedInput = {
    create?: XOR<ConsultationCreateWithoutExaminationsInput, ConsultationUncheckedCreateWithoutExaminationsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutExaminationsInput
    upsert?: ConsultationUpsertWithoutExaminationsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutExaminationsInput, ConsultationUpdateWithoutExaminationsInput>, ConsultationUncheckedUpdateWithoutExaminationsInput>
  }

  export type ConsultationCreateNestedOneWithoutConsultationSymptomsInput = {
    create?: XOR<ConsultationCreateWithoutConsultationSymptomsInput, ConsultationUncheckedCreateWithoutConsultationSymptomsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutConsultationSymptomsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type SymptomCreateNestedOneWithoutConsultationSymptomsInput = {
    create?: XOR<SymptomCreateWithoutConsultationSymptomsInput, SymptomUncheckedCreateWithoutConsultationSymptomsInput>
    connectOrCreate?: SymptomCreateOrConnectWithoutConsultationSymptomsInput
    connect?: SymptomWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConsultationUpdateOneRequiredWithoutConsultationSymptomsNestedInput = {
    create?: XOR<ConsultationCreateWithoutConsultationSymptomsInput, ConsultationUncheckedCreateWithoutConsultationSymptomsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutConsultationSymptomsInput
    upsert?: ConsultationUpsertWithoutConsultationSymptomsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutConsultationSymptomsInput, ConsultationUpdateWithoutConsultationSymptomsInput>, ConsultationUncheckedUpdateWithoutConsultationSymptomsInput>
  }

  export type SymptomUpdateOneRequiredWithoutConsultationSymptomsNestedInput = {
    create?: XOR<SymptomCreateWithoutConsultationSymptomsInput, SymptomUncheckedCreateWithoutConsultationSymptomsInput>
    connectOrCreate?: SymptomCreateOrConnectWithoutConsultationSymptomsInput
    upsert?: SymptomUpsertWithoutConsultationSymptomsInput
    connect?: SymptomWhereUniqueInput
    update?: XOR<XOR<SymptomUpdateToOneWithWhereWithoutConsultationSymptomsInput, SymptomUpdateWithoutConsultationSymptomsInput>, SymptomUncheckedUpdateWithoutConsultationSymptomsInput>
  }

  export type PatientCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
  }

  export type PrescriptionCreateNestedManyWithoutConsultationInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput> | PrescriptionCreateWithoutConsultationInput[] | PrescriptionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput | PrescriptionCreateOrConnectWithoutConsultationInput[]
    createMany?: PrescriptionCreateManyConsultationInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type ExaminationCreateNestedManyWithoutConsultationInput = {
    create?: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput> | ExaminationCreateWithoutConsultationInput[] | ExaminationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ExaminationCreateOrConnectWithoutConsultationInput | ExaminationCreateOrConnectWithoutConsultationInput[]
    createMany?: ExaminationCreateManyConsultationInputEnvelope
    connect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
  }

  export type ConsultationSymptomCreateNestedManyWithoutConsultationInput = {
    create?: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput> | ConsultationSymptomCreateWithoutConsultationInput[] | ConsultationSymptomUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutConsultationInput | ConsultationSymptomCreateOrConnectWithoutConsultationInput[]
    createMany?: ConsultationSymptomCreateManyConsultationInputEnvelope
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
  }

  export type InvestigationCreateNestedManyWithoutConsultationInput = {
    create?: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput> | InvestigationCreateWithoutConsultationInput[] | InvestigationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutConsultationInput | InvestigationCreateOrConnectWithoutConsultationInput[]
    createMany?: InvestigationCreateManyConsultationInputEnvelope
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
  }

  export type PatientInstructionCreateNestedManyWithoutConsultationInput = {
    create?: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput> | PatientInstructionCreateWithoutConsultationInput[] | PatientInstructionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PatientInstructionCreateOrConnectWithoutConsultationInput | PatientInstructionCreateOrConnectWithoutConsultationInput[]
    createMany?: PatientInstructionCreateManyConsultationInputEnvelope
    connect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
  }

  export type DiagnosisCreateNestedManyWithoutConsultationInput = {
    create?: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput> | DiagnosisCreateWithoutConsultationInput[] | DiagnosisUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: DiagnosisCreateOrConnectWithoutConsultationInput | DiagnosisCreateOrConnectWithoutConsultationInput[]
    createMany?: DiagnosisCreateManyConsultationInputEnvelope
    connect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput> | PrescriptionCreateWithoutConsultationInput[] | PrescriptionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput | PrescriptionCreateOrConnectWithoutConsultationInput[]
    createMany?: PrescriptionCreateManyConsultationInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type ExaminationUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput> | ExaminationCreateWithoutConsultationInput[] | ExaminationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ExaminationCreateOrConnectWithoutConsultationInput | ExaminationCreateOrConnectWithoutConsultationInput[]
    createMany?: ExaminationCreateManyConsultationInputEnvelope
    connect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
  }

  export type ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput> | ConsultationSymptomCreateWithoutConsultationInput[] | ConsultationSymptomUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutConsultationInput | ConsultationSymptomCreateOrConnectWithoutConsultationInput[]
    createMany?: ConsultationSymptomCreateManyConsultationInputEnvelope
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
  }

  export type InvestigationUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput> | InvestigationCreateWithoutConsultationInput[] | InvestigationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutConsultationInput | InvestigationCreateOrConnectWithoutConsultationInput[]
    createMany?: InvestigationCreateManyConsultationInputEnvelope
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
  }

  export type PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput> | PatientInstructionCreateWithoutConsultationInput[] | PatientInstructionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PatientInstructionCreateOrConnectWithoutConsultationInput | PatientInstructionCreateOrConnectWithoutConsultationInput[]
    createMany?: PatientInstructionCreateManyConsultationInputEnvelope
    connect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
  }

  export type DiagnosisUncheckedCreateNestedManyWithoutConsultationInput = {
    create?: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput> | DiagnosisCreateWithoutConsultationInput[] | DiagnosisUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: DiagnosisCreateOrConnectWithoutConsultationInput | DiagnosisCreateOrConnectWithoutConsultationInput[]
    createMany?: DiagnosisCreateManyConsultationInputEnvelope
    connect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
  }

  export type PatientUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationsInput
    upsert?: PatientUpsertWithoutConsultationsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutConsultationsInput, PatientUpdateWithoutConsultationsInput>, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type PrescriptionUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput> | PrescriptionCreateWithoutConsultationInput[] | PrescriptionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput | PrescriptionCreateOrConnectWithoutConsultationInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutConsultationInput | PrescriptionUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: PrescriptionCreateManyConsultationInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutConsultationInput | PrescriptionUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutConsultationInput | PrescriptionUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type ExaminationUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput> | ExaminationCreateWithoutConsultationInput[] | ExaminationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ExaminationCreateOrConnectWithoutConsultationInput | ExaminationCreateOrConnectWithoutConsultationInput[]
    upsert?: ExaminationUpsertWithWhereUniqueWithoutConsultationInput | ExaminationUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: ExaminationCreateManyConsultationInputEnvelope
    set?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    disconnect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    delete?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    connect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    update?: ExaminationUpdateWithWhereUniqueWithoutConsultationInput | ExaminationUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: ExaminationUpdateManyWithWhereWithoutConsultationInput | ExaminationUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: ExaminationScalarWhereInput | ExaminationScalarWhereInput[]
  }

  export type ConsultationSymptomUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput> | ConsultationSymptomCreateWithoutConsultationInput[] | ConsultationSymptomUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutConsultationInput | ConsultationSymptomCreateOrConnectWithoutConsultationInput[]
    upsert?: ConsultationSymptomUpsertWithWhereUniqueWithoutConsultationInput | ConsultationSymptomUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: ConsultationSymptomCreateManyConsultationInputEnvelope
    set?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    disconnect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    delete?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    update?: ConsultationSymptomUpdateWithWhereUniqueWithoutConsultationInput | ConsultationSymptomUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: ConsultationSymptomUpdateManyWithWhereWithoutConsultationInput | ConsultationSymptomUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
  }

  export type InvestigationUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput> | InvestigationCreateWithoutConsultationInput[] | InvestigationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutConsultationInput | InvestigationCreateOrConnectWithoutConsultationInput[]
    upsert?: InvestigationUpsertWithWhereUniqueWithoutConsultationInput | InvestigationUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: InvestigationCreateManyConsultationInputEnvelope
    set?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    disconnect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    delete?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    update?: InvestigationUpdateWithWhereUniqueWithoutConsultationInput | InvestigationUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: InvestigationUpdateManyWithWhereWithoutConsultationInput | InvestigationUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
  }

  export type PatientInstructionUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput> | PatientInstructionCreateWithoutConsultationInput[] | PatientInstructionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PatientInstructionCreateOrConnectWithoutConsultationInput | PatientInstructionCreateOrConnectWithoutConsultationInput[]
    upsert?: PatientInstructionUpsertWithWhereUniqueWithoutConsultationInput | PatientInstructionUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: PatientInstructionCreateManyConsultationInputEnvelope
    set?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    disconnect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    delete?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    connect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    update?: PatientInstructionUpdateWithWhereUniqueWithoutConsultationInput | PatientInstructionUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: PatientInstructionUpdateManyWithWhereWithoutConsultationInput | PatientInstructionUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: PatientInstructionScalarWhereInput | PatientInstructionScalarWhereInput[]
  }

  export type DiagnosisUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput> | DiagnosisCreateWithoutConsultationInput[] | DiagnosisUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: DiagnosisCreateOrConnectWithoutConsultationInput | DiagnosisCreateOrConnectWithoutConsultationInput[]
    upsert?: DiagnosisUpsertWithWhereUniqueWithoutConsultationInput | DiagnosisUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: DiagnosisCreateManyConsultationInputEnvelope
    set?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    disconnect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    delete?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    connect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    update?: DiagnosisUpdateWithWhereUniqueWithoutConsultationInput | DiagnosisUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: DiagnosisUpdateManyWithWhereWithoutConsultationInput | DiagnosisUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: DiagnosisScalarWhereInput | DiagnosisScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput> | PrescriptionCreateWithoutConsultationInput[] | PrescriptionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutConsultationInput | PrescriptionCreateOrConnectWithoutConsultationInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutConsultationInput | PrescriptionUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: PrescriptionCreateManyConsultationInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutConsultationInput | PrescriptionUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutConsultationInput | PrescriptionUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type ExaminationUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput> | ExaminationCreateWithoutConsultationInput[] | ExaminationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ExaminationCreateOrConnectWithoutConsultationInput | ExaminationCreateOrConnectWithoutConsultationInput[]
    upsert?: ExaminationUpsertWithWhereUniqueWithoutConsultationInput | ExaminationUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: ExaminationCreateManyConsultationInputEnvelope
    set?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    disconnect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    delete?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    connect?: ExaminationWhereUniqueInput | ExaminationWhereUniqueInput[]
    update?: ExaminationUpdateWithWhereUniqueWithoutConsultationInput | ExaminationUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: ExaminationUpdateManyWithWhereWithoutConsultationInput | ExaminationUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: ExaminationScalarWhereInput | ExaminationScalarWhereInput[]
  }

  export type ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput> | ConsultationSymptomCreateWithoutConsultationInput[] | ConsultationSymptomUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: ConsultationSymptomCreateOrConnectWithoutConsultationInput | ConsultationSymptomCreateOrConnectWithoutConsultationInput[]
    upsert?: ConsultationSymptomUpsertWithWhereUniqueWithoutConsultationInput | ConsultationSymptomUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: ConsultationSymptomCreateManyConsultationInputEnvelope
    set?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    disconnect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    delete?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    connect?: ConsultationSymptomWhereUniqueInput | ConsultationSymptomWhereUniqueInput[]
    update?: ConsultationSymptomUpdateWithWhereUniqueWithoutConsultationInput | ConsultationSymptomUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: ConsultationSymptomUpdateManyWithWhereWithoutConsultationInput | ConsultationSymptomUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
  }

  export type InvestigationUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput> | InvestigationCreateWithoutConsultationInput[] | InvestigationUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: InvestigationCreateOrConnectWithoutConsultationInput | InvestigationCreateOrConnectWithoutConsultationInput[]
    upsert?: InvestigationUpsertWithWhereUniqueWithoutConsultationInput | InvestigationUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: InvestigationCreateManyConsultationInputEnvelope
    set?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    disconnect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    delete?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    connect?: InvestigationWhereUniqueInput | InvestigationWhereUniqueInput[]
    update?: InvestigationUpdateWithWhereUniqueWithoutConsultationInput | InvestigationUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: InvestigationUpdateManyWithWhereWithoutConsultationInput | InvestigationUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
  }

  export type PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput> | PatientInstructionCreateWithoutConsultationInput[] | PatientInstructionUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: PatientInstructionCreateOrConnectWithoutConsultationInput | PatientInstructionCreateOrConnectWithoutConsultationInput[]
    upsert?: PatientInstructionUpsertWithWhereUniqueWithoutConsultationInput | PatientInstructionUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: PatientInstructionCreateManyConsultationInputEnvelope
    set?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    disconnect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    delete?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    connect?: PatientInstructionWhereUniqueInput | PatientInstructionWhereUniqueInput[]
    update?: PatientInstructionUpdateWithWhereUniqueWithoutConsultationInput | PatientInstructionUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: PatientInstructionUpdateManyWithWhereWithoutConsultationInput | PatientInstructionUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: PatientInstructionScalarWhereInput | PatientInstructionScalarWhereInput[]
  }

  export type DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput = {
    create?: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput> | DiagnosisCreateWithoutConsultationInput[] | DiagnosisUncheckedCreateWithoutConsultationInput[]
    connectOrCreate?: DiagnosisCreateOrConnectWithoutConsultationInput | DiagnosisCreateOrConnectWithoutConsultationInput[]
    upsert?: DiagnosisUpsertWithWhereUniqueWithoutConsultationInput | DiagnosisUpsertWithWhereUniqueWithoutConsultationInput[]
    createMany?: DiagnosisCreateManyConsultationInputEnvelope
    set?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    disconnect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    delete?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    connect?: DiagnosisWhereUniqueInput | DiagnosisWhereUniqueInput[]
    update?: DiagnosisUpdateWithWhereUniqueWithoutConsultationInput | DiagnosisUpdateWithWhereUniqueWithoutConsultationInput[]
    updateMany?: DiagnosisUpdateManyWithWhereWithoutConsultationInput | DiagnosisUpdateManyWithWhereWithoutConsultationInput[]
    deleteMany?: DiagnosisScalarWhereInput | DiagnosisScalarWhereInput[]
  }

  export type ConsultationCreateNestedOneWithoutInvestigationsInput = {
    create?: XOR<ConsultationCreateWithoutInvestigationsInput, ConsultationUncheckedCreateWithoutInvestigationsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutInvestigationsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutInvestigationsNestedInput = {
    create?: XOR<ConsultationCreateWithoutInvestigationsInput, ConsultationUncheckedCreateWithoutInvestigationsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutInvestigationsInput
    upsert?: ConsultationUpsertWithoutInvestigationsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutInvestigationsInput, ConsultationUpdateWithoutInvestigationsInput>, ConsultationUncheckedUpdateWithoutInvestigationsInput>
  }

  export type ConsultationCreateNestedOneWithoutInstructionsInput = {
    create?: XOR<ConsultationCreateWithoutInstructionsInput, ConsultationUncheckedCreateWithoutInstructionsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutInstructionsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutInstructionsNestedInput = {
    create?: XOR<ConsultationCreateWithoutInstructionsInput, ConsultationUncheckedCreateWithoutInstructionsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutInstructionsInput
    upsert?: ConsultationUpsertWithoutInstructionsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutInstructionsInput, ConsultationUpdateWithoutInstructionsInput>, ConsultationUncheckedUpdateWithoutInstructionsInput>
  }

  export type ConsultationCreateNestedOneWithoutDiagnosesInput = {
    create?: XOR<ConsultationCreateWithoutDiagnosesInput, ConsultationUncheckedCreateWithoutDiagnosesInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutDiagnosesInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutDiagnosesNestedInput = {
    create?: XOR<ConsultationCreateWithoutDiagnosesInput, ConsultationUncheckedCreateWithoutDiagnosesInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutDiagnosesInput
    upsert?: ConsultationUpsertWithoutDiagnosesInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutDiagnosesInput, ConsultationUpdateWithoutDiagnosesInput>, ConsultationUncheckedUpdateWithoutDiagnosesInput>
  }

  export type PatientCreateNestedOneWithoutGuardiansInput = {
    create?: XOR<PatientCreateWithoutGuardiansInput, PatientUncheckedCreateWithoutGuardiansInput>
    connectOrCreate?: PatientCreateOrConnectWithoutGuardiansInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutGuardiansNestedInput = {
    create?: XOR<PatientCreateWithoutGuardiansInput, PatientUncheckedCreateWithoutGuardiansInput>
    connectOrCreate?: PatientCreateOrConnectWithoutGuardiansInput
    upsert?: PatientUpsertWithoutGuardiansInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutGuardiansInput, PatientUpdateWithoutGuardiansInput>, PatientUncheckedUpdateWithoutGuardiansInput>
  }

  export type PatientCreateNestedOneWithoutAllergiesInput = {
    create?: XOR<PatientCreateWithoutAllergiesInput, PatientUncheckedCreateWithoutAllergiesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAllergiesInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutAllergiesNestedInput = {
    create?: XOR<PatientCreateWithoutAllergiesInput, PatientUncheckedCreateWithoutAllergiesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAllergiesInput
    upsert?: PatientUpsertWithoutAllergiesInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAllergiesInput, PatientUpdateWithoutAllergiesInput>, PatientUncheckedUpdateWithoutAllergiesInput>
  }

  export type ConsultationCreateNestedOneWithoutPrescriptionsInput = {
    create?: XOR<ConsultationCreateWithoutPrescriptionsInput, ConsultationUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutPrescriptionsInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutPrescriptionsNestedInput = {
    create?: XOR<ConsultationCreateWithoutPrescriptionsInput, ConsultationUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutPrescriptionsInput
    upsert?: ConsultationUpsertWithoutPrescriptionsInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutPrescriptionsInput, ConsultationUpdateWithoutPrescriptionsInput>, ConsultationUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ConsultationCreateWithoutPatientInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutPatientInput = {
    consultation_id?: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationCreateManyPatientInputEnvelope = {
    data: ConsultationCreateManyPatientInput | ConsultationCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PatientGuardianCreateWithoutPatientInput = {
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
  }

  export type PatientGuardianUncheckedCreateWithoutPatientInput = {
    guardian_id?: number
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
  }

  export type PatientGuardianCreateOrConnectWithoutPatientInput = {
    where: PatientGuardianWhereUniqueInput
    create: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput>
  }

  export type PatientGuardianCreateManyPatientInputEnvelope = {
    data: PatientGuardianCreateManyPatientInput | PatientGuardianCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PatientAllergyCreateWithoutPatientInput = {
    allergy_name: string
  }

  export type PatientAllergyUncheckedCreateWithoutPatientInput = {
    allergy_id?: number
    allergy_name: string
  }

  export type PatientAllergyCreateOrConnectWithoutPatientInput = {
    where: PatientAllergyWhereUniqueInput
    create: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput>
  }

  export type PatientAllergyCreateManyPatientInputEnvelope = {
    data: PatientAllergyCreateManyPatientInput | PatientAllergyCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationUpsertWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutPatientInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutPatientInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    consultation_id?: IntFilter<"Consultation"> | number
    patient_id?: IntFilter<"Consultation"> | number
    doctor_id?: IntFilter<"Consultation"> | number
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
    notes?: StringNullableFilter<"Consultation"> | string | null
    created_at?: DateTimeFilter<"Consultation"> | Date | string
  }

  export type PatientGuardianUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientGuardianWhereUniqueInput
    update: XOR<PatientGuardianUpdateWithoutPatientInput, PatientGuardianUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientGuardianCreateWithoutPatientInput, PatientGuardianUncheckedCreateWithoutPatientInput>
  }

  export type PatientGuardianUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientGuardianWhereUniqueInput
    data: XOR<PatientGuardianUpdateWithoutPatientInput, PatientGuardianUncheckedUpdateWithoutPatientInput>
  }

  export type PatientGuardianUpdateManyWithWhereWithoutPatientInput = {
    where: PatientGuardianScalarWhereInput
    data: XOR<PatientGuardianUpdateManyMutationInput, PatientGuardianUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientGuardianScalarWhereInput = {
    AND?: PatientGuardianScalarWhereInput | PatientGuardianScalarWhereInput[]
    OR?: PatientGuardianScalarWhereInput[]
    NOT?: PatientGuardianScalarWhereInput | PatientGuardianScalarWhereInput[]
    guardian_id?: IntFilter<"PatientGuardian"> | number
    patient_id?: IntFilter<"PatientGuardian"> | number
    guardian_name?: StringFilter<"PatientGuardian"> | string
    guardian_nic?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_phone?: StringNullableFilter<"PatientGuardian"> | string | null
    guardian_address?: StringNullableFilter<"PatientGuardian"> | string | null
    relationship?: StringFilter<"PatientGuardian"> | string
  }

  export type PatientAllergyUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientAllergyWhereUniqueInput
    update: XOR<PatientAllergyUpdateWithoutPatientInput, PatientAllergyUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientAllergyCreateWithoutPatientInput, PatientAllergyUncheckedCreateWithoutPatientInput>
  }

  export type PatientAllergyUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientAllergyWhereUniqueInput
    data: XOR<PatientAllergyUpdateWithoutPatientInput, PatientAllergyUncheckedUpdateWithoutPatientInput>
  }

  export type PatientAllergyUpdateManyWithWhereWithoutPatientInput = {
    where: PatientAllergyScalarWhereInput
    data: XOR<PatientAllergyUpdateManyMutationInput, PatientAllergyUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientAllergyScalarWhereInput = {
    AND?: PatientAllergyScalarWhereInput | PatientAllergyScalarWhereInput[]
    OR?: PatientAllergyScalarWhereInput[]
    NOT?: PatientAllergyScalarWhereInput | PatientAllergyScalarWhereInput[]
    allergy_id?: IntFilter<"PatientAllergy"> | number
    patient_id?: IntFilter<"PatientAllergy"> | number
    allergy_name?: StringFilter<"PatientAllergy"> | string
  }

  export type ConsultationSymptomCreateWithoutSymptomInput = {
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
    consultation: ConsultationCreateNestedOneWithoutConsultationSymptomsInput
  }

  export type ConsultationSymptomUncheckedCreateWithoutSymptomInput = {
    consultation_symptom_id?: number
    consultation_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type ConsultationSymptomCreateOrConnectWithoutSymptomInput = {
    where: ConsultationSymptomWhereUniqueInput
    create: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput>
  }

  export type ConsultationSymptomCreateManySymptomInputEnvelope = {
    data: ConsultationSymptomCreateManySymptomInput | ConsultationSymptomCreateManySymptomInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationSymptomUpsertWithWhereUniqueWithoutSymptomInput = {
    where: ConsultationSymptomWhereUniqueInput
    update: XOR<ConsultationSymptomUpdateWithoutSymptomInput, ConsultationSymptomUncheckedUpdateWithoutSymptomInput>
    create: XOR<ConsultationSymptomCreateWithoutSymptomInput, ConsultationSymptomUncheckedCreateWithoutSymptomInput>
  }

  export type ConsultationSymptomUpdateWithWhereUniqueWithoutSymptomInput = {
    where: ConsultationSymptomWhereUniqueInput
    data: XOR<ConsultationSymptomUpdateWithoutSymptomInput, ConsultationSymptomUncheckedUpdateWithoutSymptomInput>
  }

  export type ConsultationSymptomUpdateManyWithWhereWithoutSymptomInput = {
    where: ConsultationSymptomScalarWhereInput
    data: XOR<ConsultationSymptomUpdateManyMutationInput, ConsultationSymptomUncheckedUpdateManyWithoutSymptomInput>
  }

  export type ConsultationSymptomScalarWhereInput = {
    AND?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
    OR?: ConsultationSymptomScalarWhereInput[]
    NOT?: ConsultationSymptomScalarWhereInput | ConsultationSymptomScalarWhereInput[]
    consultation_symptom_id?: IntFilter<"ConsultationSymptom"> | number
    consultation_id?: IntFilter<"ConsultationSymptom"> | number
    symptom_id?: IntFilter<"ConsultationSymptom"> | number
    severity?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_value?: FloatNullableFilter<"ConsultationSymptom"> | number | null
    duration_unit?: StringNullableFilter<"ConsultationSymptom"> | string | null
  }

  export type ConsultationCreateWithoutExaminationsInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutExaminationsInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutExaminationsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutExaminationsInput, ConsultationUncheckedCreateWithoutExaminationsInput>
  }

  export type ConsultationUpsertWithoutExaminationsInput = {
    update: XOR<ConsultationUpdateWithoutExaminationsInput, ConsultationUncheckedUpdateWithoutExaminationsInput>
    create: XOR<ConsultationCreateWithoutExaminationsInput, ConsultationUncheckedCreateWithoutExaminationsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutExaminationsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutExaminationsInput, ConsultationUncheckedUpdateWithoutExaminationsInput>
  }

  export type ConsultationUpdateWithoutExaminationsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutExaminationsInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationCreateWithoutConsultationSymptomsInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutConsultationSymptomsInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutConsultationSymptomsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutConsultationSymptomsInput, ConsultationUncheckedCreateWithoutConsultationSymptomsInput>
  }

  export type SymptomCreateWithoutConsultationSymptomsInput = {
    name: string
  }

  export type SymptomUncheckedCreateWithoutConsultationSymptomsInput = {
    symptom_id?: number
    name: string
  }

  export type SymptomCreateOrConnectWithoutConsultationSymptomsInput = {
    where: SymptomWhereUniqueInput
    create: XOR<SymptomCreateWithoutConsultationSymptomsInput, SymptomUncheckedCreateWithoutConsultationSymptomsInput>
  }

  export type ConsultationUpsertWithoutConsultationSymptomsInput = {
    update: XOR<ConsultationUpdateWithoutConsultationSymptomsInput, ConsultationUncheckedUpdateWithoutConsultationSymptomsInput>
    create: XOR<ConsultationCreateWithoutConsultationSymptomsInput, ConsultationUncheckedCreateWithoutConsultationSymptomsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutConsultationSymptomsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutConsultationSymptomsInput, ConsultationUncheckedUpdateWithoutConsultationSymptomsInput>
  }

  export type ConsultationUpdateWithoutConsultationSymptomsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutConsultationSymptomsInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type SymptomUpsertWithoutConsultationSymptomsInput = {
    update: XOR<SymptomUpdateWithoutConsultationSymptomsInput, SymptomUncheckedUpdateWithoutConsultationSymptomsInput>
    create: XOR<SymptomCreateWithoutConsultationSymptomsInput, SymptomUncheckedCreateWithoutConsultationSymptomsInput>
    where?: SymptomWhereInput
  }

  export type SymptomUpdateToOneWithWhereWithoutConsultationSymptomsInput = {
    where?: SymptomWhereInput
    data: XOR<SymptomUpdateWithoutConsultationSymptomsInput, SymptomUncheckedUpdateWithoutConsultationSymptomsInput>
  }

  export type SymptomUpdateWithoutConsultationSymptomsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomUncheckedUpdateWithoutConsultationSymptomsInput = {
    symptom_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PatientCreateWithoutConsultationsInput = {
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    guardians?: PatientGuardianCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutConsultationsInput = {
    patient_id?: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    guardians?: PatientGuardianUncheckedCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutConsultationsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
  }

  export type PrescriptionCreateWithoutConsultationInput = {
    created_at?: Date | string
  }

  export type PrescriptionUncheckedCreateWithoutConsultationInput = {
    prescription_id?: number
    created_at?: Date | string
  }

  export type PrescriptionCreateOrConnectWithoutConsultationInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
  }

  export type PrescriptionCreateManyConsultationInputEnvelope = {
    data: PrescriptionCreateManyConsultationInput | PrescriptionCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type ExaminationCreateWithoutConsultationInput = {
    title: string
    result: string
  }

  export type ExaminationUncheckedCreateWithoutConsultationInput = {
    examination_id?: number
    title: string
    result: string
  }

  export type ExaminationCreateOrConnectWithoutConsultationInput = {
    where: ExaminationWhereUniqueInput
    create: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput>
  }

  export type ExaminationCreateManyConsultationInputEnvelope = {
    data: ExaminationCreateManyConsultationInput | ExaminationCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationSymptomCreateWithoutConsultationInput = {
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
    symptom: SymptomCreateNestedOneWithoutConsultationSymptomsInput
  }

  export type ConsultationSymptomUncheckedCreateWithoutConsultationInput = {
    consultation_symptom_id?: number
    symptom_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type ConsultationSymptomCreateOrConnectWithoutConsultationInput = {
    where: ConsultationSymptomWhereUniqueInput
    create: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput>
  }

  export type ConsultationSymptomCreateManyConsultationInputEnvelope = {
    data: ConsultationSymptomCreateManyConsultationInput | ConsultationSymptomCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type InvestigationCreateWithoutConsultationInput = {
    title: string
    description?: string | null
  }

  export type InvestigationUncheckedCreateWithoutConsultationInput = {
    investigation_id?: number
    title: string
    description?: string | null
  }

  export type InvestigationCreateOrConnectWithoutConsultationInput = {
    where: InvestigationWhereUniqueInput
    create: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput>
  }

  export type InvestigationCreateManyConsultationInputEnvelope = {
    data: InvestigationCreateManyConsultationInput | InvestigationCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type PatientInstructionCreateWithoutConsultationInput = {
    instruction: string
  }

  export type PatientInstructionUncheckedCreateWithoutConsultationInput = {
    instruction_id?: number
    instruction: string
  }

  export type PatientInstructionCreateOrConnectWithoutConsultationInput = {
    where: PatientInstructionWhereUniqueInput
    create: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput>
  }

  export type PatientInstructionCreateManyConsultationInputEnvelope = {
    data: PatientInstructionCreateManyConsultationInput | PatientInstructionCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type DiagnosisCreateWithoutConsultationInput = {
    diagnosis_name: string
    notes?: string | null
  }

  export type DiagnosisUncheckedCreateWithoutConsultationInput = {
    diagnosis_id?: number
    diagnosis_name: string
    notes?: string | null
  }

  export type DiagnosisCreateOrConnectWithoutConsultationInput = {
    where: DiagnosisWhereUniqueInput
    create: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput>
  }

  export type DiagnosisCreateManyConsultationInputEnvelope = {
    data: DiagnosisCreateManyConsultationInput | DiagnosisCreateManyConsultationInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutConsultationsInput = {
    update: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
    create: XOR<PatientCreateWithoutConsultationsInput, PatientUncheckedCreateWithoutConsultationsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutConsultationsInput, PatientUncheckedUpdateWithoutConsultationsInput>
  }

  export type PatientUpdateWithoutConsultationsInput = {
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    guardians?: PatientGuardianUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutConsultationsInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    guardians?: PatientGuardianUncheckedUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutConsultationInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutConsultationInput, PrescriptionUncheckedUpdateWithoutConsultationInput>
    create: XOR<PrescriptionCreateWithoutConsultationInput, PrescriptionUncheckedCreateWithoutConsultationInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutConsultationInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutConsultationInput, PrescriptionUncheckedUpdateWithoutConsultationInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutConsultationInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutConsultationInput>
  }

  export type PrescriptionScalarWhereInput = {
    AND?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    OR?: PrescriptionScalarWhereInput[]
    NOT?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    prescription_id?: IntFilter<"Prescription"> | number
    consultation_id?: IntFilter<"Prescription"> | number
    created_at?: DateTimeFilter<"Prescription"> | Date | string
  }

  export type ExaminationUpsertWithWhereUniqueWithoutConsultationInput = {
    where: ExaminationWhereUniqueInput
    update: XOR<ExaminationUpdateWithoutConsultationInput, ExaminationUncheckedUpdateWithoutConsultationInput>
    create: XOR<ExaminationCreateWithoutConsultationInput, ExaminationUncheckedCreateWithoutConsultationInput>
  }

  export type ExaminationUpdateWithWhereUniqueWithoutConsultationInput = {
    where: ExaminationWhereUniqueInput
    data: XOR<ExaminationUpdateWithoutConsultationInput, ExaminationUncheckedUpdateWithoutConsultationInput>
  }

  export type ExaminationUpdateManyWithWhereWithoutConsultationInput = {
    where: ExaminationScalarWhereInput
    data: XOR<ExaminationUpdateManyMutationInput, ExaminationUncheckedUpdateManyWithoutConsultationInput>
  }

  export type ExaminationScalarWhereInput = {
    AND?: ExaminationScalarWhereInput | ExaminationScalarWhereInput[]
    OR?: ExaminationScalarWhereInput[]
    NOT?: ExaminationScalarWhereInput | ExaminationScalarWhereInput[]
    examination_id?: IntFilter<"Examination"> | number
    consultation_id?: IntFilter<"Examination"> | number
    title?: StringFilter<"Examination"> | string
    result?: StringFilter<"Examination"> | string
  }

  export type ConsultationSymptomUpsertWithWhereUniqueWithoutConsultationInput = {
    where: ConsultationSymptomWhereUniqueInput
    update: XOR<ConsultationSymptomUpdateWithoutConsultationInput, ConsultationSymptomUncheckedUpdateWithoutConsultationInput>
    create: XOR<ConsultationSymptomCreateWithoutConsultationInput, ConsultationSymptomUncheckedCreateWithoutConsultationInput>
  }

  export type ConsultationSymptomUpdateWithWhereUniqueWithoutConsultationInput = {
    where: ConsultationSymptomWhereUniqueInput
    data: XOR<ConsultationSymptomUpdateWithoutConsultationInput, ConsultationSymptomUncheckedUpdateWithoutConsultationInput>
  }

  export type ConsultationSymptomUpdateManyWithWhereWithoutConsultationInput = {
    where: ConsultationSymptomScalarWhereInput
    data: XOR<ConsultationSymptomUpdateManyMutationInput, ConsultationSymptomUncheckedUpdateManyWithoutConsultationInput>
  }

  export type InvestigationUpsertWithWhereUniqueWithoutConsultationInput = {
    where: InvestigationWhereUniqueInput
    update: XOR<InvestigationUpdateWithoutConsultationInput, InvestigationUncheckedUpdateWithoutConsultationInput>
    create: XOR<InvestigationCreateWithoutConsultationInput, InvestigationUncheckedCreateWithoutConsultationInput>
  }

  export type InvestigationUpdateWithWhereUniqueWithoutConsultationInput = {
    where: InvestigationWhereUniqueInput
    data: XOR<InvestigationUpdateWithoutConsultationInput, InvestigationUncheckedUpdateWithoutConsultationInput>
  }

  export type InvestigationUpdateManyWithWhereWithoutConsultationInput = {
    where: InvestigationScalarWhereInput
    data: XOR<InvestigationUpdateManyMutationInput, InvestigationUncheckedUpdateManyWithoutConsultationInput>
  }

  export type InvestigationScalarWhereInput = {
    AND?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
    OR?: InvestigationScalarWhereInput[]
    NOT?: InvestigationScalarWhereInput | InvestigationScalarWhereInput[]
    investigation_id?: IntFilter<"Investigation"> | number
    consultation_id?: IntFilter<"Investigation"> | number
    title?: StringFilter<"Investigation"> | string
    description?: StringNullableFilter<"Investigation"> | string | null
  }

  export type PatientInstructionUpsertWithWhereUniqueWithoutConsultationInput = {
    where: PatientInstructionWhereUniqueInput
    update: XOR<PatientInstructionUpdateWithoutConsultationInput, PatientInstructionUncheckedUpdateWithoutConsultationInput>
    create: XOR<PatientInstructionCreateWithoutConsultationInput, PatientInstructionUncheckedCreateWithoutConsultationInput>
  }

  export type PatientInstructionUpdateWithWhereUniqueWithoutConsultationInput = {
    where: PatientInstructionWhereUniqueInput
    data: XOR<PatientInstructionUpdateWithoutConsultationInput, PatientInstructionUncheckedUpdateWithoutConsultationInput>
  }

  export type PatientInstructionUpdateManyWithWhereWithoutConsultationInput = {
    where: PatientInstructionScalarWhereInput
    data: XOR<PatientInstructionUpdateManyMutationInput, PatientInstructionUncheckedUpdateManyWithoutConsultationInput>
  }

  export type PatientInstructionScalarWhereInput = {
    AND?: PatientInstructionScalarWhereInput | PatientInstructionScalarWhereInput[]
    OR?: PatientInstructionScalarWhereInput[]
    NOT?: PatientInstructionScalarWhereInput | PatientInstructionScalarWhereInput[]
    instruction_id?: IntFilter<"PatientInstruction"> | number
    consultation_id?: IntFilter<"PatientInstruction"> | number
    instruction?: StringFilter<"PatientInstruction"> | string
  }

  export type DiagnosisUpsertWithWhereUniqueWithoutConsultationInput = {
    where: DiagnosisWhereUniqueInput
    update: XOR<DiagnosisUpdateWithoutConsultationInput, DiagnosisUncheckedUpdateWithoutConsultationInput>
    create: XOR<DiagnosisCreateWithoutConsultationInput, DiagnosisUncheckedCreateWithoutConsultationInput>
  }

  export type DiagnosisUpdateWithWhereUniqueWithoutConsultationInput = {
    where: DiagnosisWhereUniqueInput
    data: XOR<DiagnosisUpdateWithoutConsultationInput, DiagnosisUncheckedUpdateWithoutConsultationInput>
  }

  export type DiagnosisUpdateManyWithWhereWithoutConsultationInput = {
    where: DiagnosisScalarWhereInput
    data: XOR<DiagnosisUpdateManyMutationInput, DiagnosisUncheckedUpdateManyWithoutConsultationInput>
  }

  export type DiagnosisScalarWhereInput = {
    AND?: DiagnosisScalarWhereInput | DiagnosisScalarWhereInput[]
    OR?: DiagnosisScalarWhereInput[]
    NOT?: DiagnosisScalarWhereInput | DiagnosisScalarWhereInput[]
    diagnosis_id?: IntFilter<"Diagnosis"> | number
    consultation_id?: IntFilter<"Diagnosis"> | number
    diagnosis_name?: StringFilter<"Diagnosis"> | string
    notes?: StringNullableFilter<"Diagnosis"> | string | null
  }

  export type ConsultationCreateWithoutInvestigationsInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutInvestigationsInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutInvestigationsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutInvestigationsInput, ConsultationUncheckedCreateWithoutInvestigationsInput>
  }

  export type ConsultationUpsertWithoutInvestigationsInput = {
    update: XOR<ConsultationUpdateWithoutInvestigationsInput, ConsultationUncheckedUpdateWithoutInvestigationsInput>
    create: XOR<ConsultationCreateWithoutInvestigationsInput, ConsultationUncheckedCreateWithoutInvestigationsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutInvestigationsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutInvestigationsInput, ConsultationUncheckedUpdateWithoutInvestigationsInput>
  }

  export type ConsultationUpdateWithoutInvestigationsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutInvestigationsInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationCreateWithoutInstructionsInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutInstructionsInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutInstructionsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutInstructionsInput, ConsultationUncheckedCreateWithoutInstructionsInput>
  }

  export type ConsultationUpsertWithoutInstructionsInput = {
    update: XOR<ConsultationUpdateWithoutInstructionsInput, ConsultationUncheckedUpdateWithoutInstructionsInput>
    create: XOR<ConsultationCreateWithoutInstructionsInput, ConsultationUncheckedCreateWithoutInstructionsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutInstructionsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutInstructionsInput, ConsultationUncheckedUpdateWithoutInstructionsInput>
  }

  export type ConsultationUpdateWithoutInstructionsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutInstructionsInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationCreateWithoutDiagnosesInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    prescriptions?: PrescriptionCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutDiagnosesInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutConsultationInput
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutDiagnosesInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutDiagnosesInput, ConsultationUncheckedCreateWithoutDiagnosesInput>
  }

  export type ConsultationUpsertWithoutDiagnosesInput = {
    update: XOR<ConsultationUpdateWithoutDiagnosesInput, ConsultationUncheckedUpdateWithoutDiagnosesInput>
    create: XOR<ConsultationCreateWithoutDiagnosesInput, ConsultationUncheckedCreateWithoutDiagnosesInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutDiagnosesInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutDiagnosesInput, ConsultationUncheckedUpdateWithoutDiagnosesInput>
  }

  export type ConsultationUpdateWithoutDiagnosesInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutDiagnosesInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type PatientCreateWithoutGuardiansInput = {
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutGuardiansInput = {
    patient_id?: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    allergies?: PatientAllergyUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutGuardiansInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutGuardiansInput, PatientUncheckedCreateWithoutGuardiansInput>
  }

  export type PatientUpsertWithoutGuardiansInput = {
    update: XOR<PatientUpdateWithoutGuardiansInput, PatientUncheckedUpdateWithoutGuardiansInput>
    create: XOR<PatientCreateWithoutGuardiansInput, PatientUncheckedCreateWithoutGuardiansInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutGuardiansInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutGuardiansInput, PatientUncheckedUpdateWithoutGuardiansInput>
  }

  export type PatientUpdateWithoutGuardiansInput = {
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutGuardiansInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    allergies?: PatientAllergyUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutAllergiesInput = {
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationCreateNestedManyWithoutPatientInput
    guardians?: PatientGuardianCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAllergiesInput = {
    patient_id?: number
    patient_code: string
    name: string
    gender: string
    date_of_birth: Date | string
    address?: string | null
    nic?: string | null
    phone?: string | null
    is_profile_completed?: boolean
    created_by: number
    created_at?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
    guardians?: PatientGuardianUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAllergiesInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAllergiesInput, PatientUncheckedCreateWithoutAllergiesInput>
  }

  export type PatientUpsertWithoutAllergiesInput = {
    update: XOR<PatientUpdateWithoutAllergiesInput, PatientUncheckedUpdateWithoutAllergiesInput>
    create: XOR<PatientCreateWithoutAllergiesInput, PatientUncheckedCreateWithoutAllergiesInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAllergiesInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAllergiesInput, PatientUncheckedUpdateWithoutAllergiesInput>
  }

  export type PatientUpdateWithoutAllergiesInput = {
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUpdateManyWithoutPatientNestedInput
    guardians?: PatientGuardianUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAllergiesInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    nic?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    is_profile_completed?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
    guardians?: PatientGuardianUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type ConsultationCreateWithoutPrescriptionsInput = {
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    patient: PatientCreateNestedOneWithoutConsultationsInput
    examinations?: ExaminationCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutPrescriptionsInput = {
    consultation_id?: number
    patient_id: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
    examinations?: ExaminationUncheckedCreateNestedManyWithoutConsultationInput
    consultationSymptoms?: ConsultationSymptomUncheckedCreateNestedManyWithoutConsultationInput
    investigations?: InvestigationUncheckedCreateNestedManyWithoutConsultationInput
    instructions?: PatientInstructionUncheckedCreateNestedManyWithoutConsultationInput
    diagnoses?: DiagnosisUncheckedCreateNestedManyWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutPrescriptionsInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPrescriptionsInput, ConsultationUncheckedCreateWithoutPrescriptionsInput>
  }

  export type ConsultationUpsertWithoutPrescriptionsInput = {
    update: XOR<ConsultationUpdateWithoutPrescriptionsInput, ConsultationUncheckedUpdateWithoutPrescriptionsInput>
    create: XOR<ConsultationCreateWithoutPrescriptionsInput, ConsultationUncheckedCreateWithoutPrescriptionsInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutPrescriptionsInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutPrescriptionsInput, ConsultationUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type ConsultationUpdateWithoutPrescriptionsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsultationsNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPrescriptionsInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationCreateManyPatientInput = {
    consultation_id?: number
    doctor_id: number
    visit_date: Date | string
    notes?: string | null
    created_at?: Date | string
  }

  export type PatientGuardianCreateManyPatientInput = {
    guardian_id?: number
    guardian_name: string
    guardian_nic?: string | null
    guardian_phone?: string | null
    guardian_address?: string | null
    relationship: string
  }

  export type PatientAllergyCreateManyPatientInput = {
    allergy_id?: number
    allergy_name: string
  }

  export type ConsultationUpdateWithoutPatientInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPatientInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutConsultationNestedInput
    examinations?: ExaminationUncheckedUpdateManyWithoutConsultationNestedInput
    consultationSymptoms?: ConsultationSymptomUncheckedUpdateManyWithoutConsultationNestedInput
    investigations?: InvestigationUncheckedUpdateManyWithoutConsultationNestedInput
    instructions?: PatientInstructionUncheckedUpdateManyWithoutConsultationNestedInput
    diagnoses?: DiagnosisUncheckedUpdateManyWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientInput = {
    consultation_id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientGuardianUpdateWithoutPatientInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientGuardianUncheckedUpdateWithoutPatientInput = {
    guardian_id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientGuardianUncheckedUpdateManyWithoutPatientInput = {
    guardian_id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    guardian_nic?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_phone?: NullableStringFieldUpdateOperationsInput | string | null
    guardian_address?: NullableStringFieldUpdateOperationsInput | string | null
    relationship?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyUpdateWithoutPatientInput = {
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyUncheckedUpdateWithoutPatientInput = {
    allergy_id?: IntFieldUpdateOperationsInput | number
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type PatientAllergyUncheckedUpdateManyWithoutPatientInput = {
    allergy_id?: IntFieldUpdateOperationsInput | number
    allergy_name?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationSymptomCreateManySymptomInput = {
    consultation_symptom_id?: number
    consultation_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type ConsultationSymptomUpdateWithoutSymptomInput = {
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUpdateOneRequiredWithoutConsultationSymptomsNestedInput
  }

  export type ConsultationSymptomUncheckedUpdateWithoutSymptomInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsultationSymptomUncheckedUpdateManyWithoutSymptomInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    consultation_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PrescriptionCreateManyConsultationInput = {
    prescription_id?: number
    created_at?: Date | string
  }

  export type ExaminationCreateManyConsultationInput = {
    examination_id?: number
    title: string
    result: string
  }

  export type ConsultationSymptomCreateManyConsultationInput = {
    consultation_symptom_id?: number
    symptom_id: number
    severity?: number | null
    duration_value?: number | null
    duration_unit?: string | null
  }

  export type InvestigationCreateManyConsultationInput = {
    investigation_id?: number
    title: string
    description?: string | null
  }

  export type PatientInstructionCreateManyConsultationInput = {
    instruction_id?: number
    instruction: string
  }

  export type DiagnosisCreateManyConsultationInput = {
    diagnosis_id?: number
    diagnosis_name: string
    notes?: string | null
  }

  export type PrescriptionUpdateWithoutConsultationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateWithoutConsultationInput = {
    prescription_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyWithoutConsultationInput = {
    prescription_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExaminationUpdateWithoutConsultationInput = {
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminationUncheckedUpdateWithoutConsultationInput = {
    examination_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ExaminationUncheckedUpdateManyWithoutConsultationInput = {
    examination_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationSymptomUpdateWithoutConsultationInput = {
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
    symptom?: SymptomUpdateOneRequiredWithoutConsultationSymptomsNestedInput
  }

  export type ConsultationSymptomUncheckedUpdateWithoutConsultationInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    symptom_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsultationSymptomUncheckedUpdateManyWithoutConsultationInput = {
    consultation_symptom_id?: IntFieldUpdateOperationsInput | number
    symptom_id?: IntFieldUpdateOperationsInput | number
    severity?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_value?: NullableFloatFieldUpdateOperationsInput | number | null
    duration_unit?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationUpdateWithoutConsultationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationUncheckedUpdateWithoutConsultationInput = {
    investigation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvestigationUncheckedUpdateManyWithoutConsultationInput = {
    investigation_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientInstructionUpdateWithoutConsultationInput = {
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type PatientInstructionUncheckedUpdateWithoutConsultationInput = {
    instruction_id?: IntFieldUpdateOperationsInput | number
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type PatientInstructionUncheckedUpdateManyWithoutConsultationInput = {
    instruction_id?: IntFieldUpdateOperationsInput | number
    instruction?: StringFieldUpdateOperationsInput | string
  }

  export type DiagnosisUpdateWithoutConsultationInput = {
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiagnosisUncheckedUpdateWithoutConsultationInput = {
    diagnosis_id?: IntFieldUpdateOperationsInput | number
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiagnosisUncheckedUpdateManyWithoutConsultationInput = {
    diagnosis_id?: IntFieldUpdateOperationsInput | number
    diagnosis_name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}