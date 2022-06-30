type Primitives = string | number | boolean | symbol;

type AllProps<Obj, Cache extends Array<Primitives> = []> = Obj extends Primitives
	? Cache
	: {
			[Prop in keyof Obj]:
				| [...Cache, Prop] // <------ it should be unionized with recursion call
				| AllProps<Obj[Prop], [...Cache, Prop]>;
	  }[keyof Obj];

type Head<T extends ReadonlyArray<any>> = T extends []
	? never
	: T extends [infer Head]
	? Head
	: T extends [infer Head, ...infer _]
	? Head
	: never;

type Tail<T extends ReadonlyArray<any>> = T extends [] ? [] : T extends [infer _] ? [] : T extends [infer _, ...infer Rest] ? Rest : never;

type Last<T extends ReadonlyArray<any>> = T['length'] extends 1 ? true : false;

type OmitBase<Obj, Path extends ReadonlyArray<any>> = Last<Path> extends true
	? {
			[Prop in Exclude<keyof Obj, Head<Path>>]: Obj[Prop];
	  }
	: {
			[Prop in keyof Obj]: OmitBase<Obj[Prop], Tail<Path>>;
	  };

export type Split<Str, Cache extends string[] = []> = Str extends `${infer Method}.${infer Rest}`
	? Split<Rest, [...Cache, Method]>
	: Str extends `${infer Last}`
	? [...Cache, Last]
	: never;

export type OmitBy<Obj, Keys extends AllProps<Obj>> = OmitBase<Obj, Keys>;
