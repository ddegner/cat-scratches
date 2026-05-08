std::vec

# Struct Vec 

1.0.0 · Source

```
pub struct Vec<T, A = Global>where
 A: Allocator,{ }
```

Expand description

A contiguous growable array type, written as `Vec<T>`, short for ‘vector’.

## §Examples

```
let mut vec = Vec::new();
vec.push(1);
vec.push(2);

assert_eq!(vec.len(), 2);
assert_eq!(vec[0], 1);

assert_eq!(vec.pop(), Some(2));
assert_eq!(vec.len(), 1);

vec[0] = 7;
assert_eq!(vec[0], 7);

vec.extend([1, 2, 3]);

for x in &vec {
 println!("{x}");
}
assert_eq!(vec, [7, 1, 2, 3]);
```

The `vec!` macro is provided for convenient initialization:

```
let mut vec1 = vec![1, 2, 3];
vec1.push(4);
let vec2 = Vec::from([1, 2, 3, 4]);
assert_eq!(vec1, vec2);
```

It can also initialize each element of a `Vec<T>` with a given value. This may be more efficient than performing allocation and initialization in separate steps, especially when initializing a vector of zeros:

```
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);
```

For more information, see Capacity and Reallocation.

Use a `Vec<T>` as an efficient stack:

```
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
 println!("{top}");
}
```

## §Indexing

The `Vec` type allows access to values by index, because it implements the `Index` trait. An example will be more explicit:

```
let v = vec![0, 2, 4, 6];
println!("{}", v[1]); 
```

However be careful: if you try to access an index which isn’t in the `Vec`, your software will panic! You cannot do this:

ⓘ

```
let v = vec![0, 2, 4, 6];
println!("{}", v[6]); 
```

Use `get` and `get_mut` if you want to check whether the index is in the `Vec`.

## §Slicing

A `Vec` can be mutable. On the other hand, slices are read-only objects. To get a slice, use `&`. Example:

```
fn read_slice(slice: &[usize]) {
 }

let v = vec![0, 1];
read_slice(&v);

let u: &[usize] = &v;
let u: &[_] = &v;
```

In Rust, it’s more common to pass slices as arguments rather than vectors when you just want to provide read access. The same goes for `String` and `&str`.

## §Capacity and reallocation

The capacity of a vector is the amount of space allocated for any future elements that will be added onto the vector. This is not to be confused with the _length_ of a vector, which specifies the number of actual elements within the vector. If a vector’s length exceeds its capacity, its capacity will automatically be increased, but its elements will have to be reallocated.

For example, a vector with capacity 10 and length 0 would be an empty vector with space for 10 more elements. Pushing 10 or fewer elements onto the vector will not change its capacity or cause reallocation to occur. However, if the vector’s length is increased to 11, it will have to reallocate, which can be slow. For this reason, it is recommended to use `Vec::with_capacity` whenever possible to specify how big the vector is expected to get.

## §Guarantees

Due to its incredibly fundamental nature, `Vec` makes a lot of guarantees about its design. This ensures that it’s as low-overhead as possible in the general case, and can be correctly manipulated in primitive ways by unsafe code. Note that these guarantees refer to an unqualified `Vec<T>`. If additional type parameters are added (e.g., to support custom allocators), overriding their defaults may change the behavior.

Most fundamentally, `Vec` is and always will be a (pointer, capacity, length) triplet. No more, no less. The order of these fields is completely unspecified, and you should use the appropriate methods to modify these. The pointer will never be null, so this type is null-pointer-optimized.

However, the pointer might not actually point to allocated memory. In particular, if you construct a `Vec` with capacity 0 via `Vec::new`, `vec![]`, `Vec::with_capacity(0)`, or by calling `shrink_to_fit` on an empty Vec, it will not allocate memory. Similarly, if you store zero-sized types inside a `Vec`, it will not allocate space for them. _Note that in this case the `Vec` might not report a `capacity` of 0_. `Vec` will allocate if and only if `size_of::<T>() * capacity() > 0`. In general, `Vec`’s allocation details are very subtle — if you intend to allocate memory using a `Vec` and use it for something else (either to pass to unsafe code, or to build your own memory-backed collection), be sure to deallocate this memory by using `from_raw_parts` to recover the `Vec` and then dropping it.

If a `Vec` _has_ allocated memory, then the memory it points to is on the heap (as defined by the allocator Rust is configured to use by default), and its pointer points to `len` initialized, contiguous elements in order (what you would see if you coerced it to a slice), followed by `capacity - len` logically uninitialized, contiguous elements.

A vector containing the elements `'a'` and `'b'` with capacity 4 can be visualized as below. The top part is the `Vec` struct, it contains a pointer to the head of the allocation in the heap, length and capacity. The bottom part is the allocation on the heap, a contiguous memory block.

```
 ptr len capacity
 +--------+--------+--------+
 | 0x0123 | 2 | 4 |
 +--------+--------+--------+
 |
 v
Heap +--------+--------+--------+--------+
 | 'a' | 'b' | uninit | uninit |
 +--------+--------+--------+--------+
```

* **uninit** represents memory that is not initialized, see `MaybeUninit`.
* Note: the ABI is not stable and `Vec` makes no guarantees about its memory layout (including the order of fields).

`Vec` will never perform a “small optimization” where elements are actually stored on the stack for two reasons:

* It would make it more difficult for unsafe code to correctly manipulate a `Vec`. The contents of a `Vec` wouldn’t have a stable address if it were only moved, and it would be more difficult to determine if a `Vec` had actually allocated memory.
 
* It would penalize the general case, incurring an additional branch on every access.

`Vec` will never automatically shrink itself, even if completely empty. This ensures no unnecessary allocations or deallocations occur. Emptying a `Vec` and then filling it back up to the same `len` should incur no calls to the allocator. If you wish to free up unused memory, use `shrink_to_fit` or `shrink_to`.

`push` and `insert` will never (re)allocate if the reported capacity is sufficient. `push` and `insert` _will_ (re)allocate if `len == capacity`. That is, the reported capacity is completely accurate, and can be relied on. It can even be used to manually free the memory allocated by a `Vec` if desired. Bulk insertion methods _may_ reallocate, even when not necessary.

`Vec` does not guarantee any particular growth strategy when reallocating when full, nor when `reserve` is called. The current strategy is basic and it may prove desirable to use a non-constant growth factor. Whatever strategy is used will of course guarantee _O_(1) amortized `push`.

It is guaranteed, in order to respect the intentions of the programmer, that all of `vec![e_1, e_2, ..., e_n]`, `vec![x; n]`, and `Vec::with_capacity(n)` produce a `Vec` that requests an allocation of the exact size needed for precisely `n` elements from the allocator, and no other size (such as, for example: a size rounded up to the nearest power of 2). The allocator will return an allocation that is at least as large as requested, but it may be larger.

It is guaranteed that the `Vec::capacity` method returns a value that is at least the requested capacity and not more than the allocated capacity.

The method `Vec::shrink_to_fit` will attempt to discard excess capacity an allocator has given to a `Vec`. If `len == capacity`, then a `Vec<T>` can be converted to and from a `Box<[T]>` without reallocating or moving the elements. `Vec` exploits this fact as much as reasonable when implementing common conversions such as `into_boxed_slice`.

`Vec` will not specifically overwrite any data that is removed from it, but also won’t specifically preserve it. Its uninitialized memory is scratch space that it may use however it wants. It will generally just do whatever is most efficient or otherwise easy to implement. Do not rely on removed data to be erased for security purposes. Even if you drop a `Vec`, its buffer may simply be reused by another allocation. Even if you zero a `Vec`’s memory first, that might not actually happen because the optimizer does not consider this a side-effect that must be preserved. There is one case which we will not break, however: using `unsafe` code to write to the excess capacity, and then increasing the length to match, is always valid.

Currently, `Vec` does not guarantee the order in which elements are dropped. The order has changed in the past and may change again.

Source§

### impl<T> Vec<T>

1.0.0 (const: 1.39.0) · Source

#### pub const fn new() -> Vec<T>

Constructs a new, empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

##### §Examples

```
let mut vec: Vec<i32> = Vec::new();
```

1.0.0 (const: unstable) · Source

#### pub fn with\_capacity(capacity: usize) -> Vec<T>

Constructs a new, empty `Vec<T>` with at least the specified capacity.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

It is important to note that although the returned vector has the minimum _capacity_ specified, the vector will have a zero _length_. For an explanation of the difference between length and capacity, see _Capacity and reallocation_.

If it is important to know the exact allocated capacity of a `Vec`, always use the `capacity` method after construction.

For `Vec<T>` where `T` is a zero-sized type, there will be no allocation and the capacity will always be `usize::MAX`.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = Vec::with_capacity(10);

assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

for i in 0..10 {
 vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

let vec_units = Vec::<()>::with_capacity(10);
assert_eq!(vec_units.capacity(), usize::MAX);
```

Source

#### pub fn try\_with\_capacity(capacity: usize) -> Result<Vec<T>, TryReserveError\>

🔬This is a nightly-only experimental API. (`try_with_capacity` #91913)

Constructs a new, empty `Vec<T>` with at least the specified capacity.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

##### §Errors

Returns an error if the capacity exceeds `isize::MAX` _bytes_, or if the allocator reports allocation failure.

1.0.0 · Source

#### pub unsafe fn from\_raw\_parts( ptr: \*mut T, length: usize, capacity: usize, ) -> Vec<T>

Creates a `Vec<T>` directly from a pointer, a length, and a capacity.

##### §Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* If `T` is not a zero-sized type and the capacity is nonzero, `ptr` must have been allocated using the global allocator, such as via the `alloc::alloc` function. If `T` is a zero-sized type or the capacity is zero, `ptr` need only be non-null and aligned.
* `T` needs to have the same alignment as what `ptr` was allocated with, if the pointer is required to be allocated. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the `dealloc` requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes), if nonzero, needs to be the same size as the pointer was allocated with. (Because similar to alignment, `dealloc` must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to be the capacity that the pointer was allocated with, if the pointer is required to be allocated.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of `pointer::offset`.

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is normally **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`, doing so is only safe if the array was initially allocated by a `Vec` or `String`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1. To avoid these issues, it is often preferable to do casting/transmuting using `slice::from_raw_parts` instead.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### §Examples

```
use std::ptr;

let v = vec![1, 2, 3];

let (p, len, cap) = v.into_raw_parts();

unsafe {
 for i in 0..len {
 ptr::write(p.add(i), 4 + i);
 }

 let rebuilt = Vec::from_raw_parts(p, len, cap);
 assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```
use std::alloc::{alloc, Layout};

fn main() {
 let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

 let vec = unsafe {
 let mem = alloc(layout).cast::<u32>();
 if mem.is_null() {
 return;
 }

 mem.write(1_000_000);

 Vec::from_raw_parts(mem, 1, 16)
 };

 assert_eq!(vec, &[1_000_000]);
 assert_eq!(vec.capacity(), 16);
}
```

Source

#### pub unsafe fn from\_parts( ptr: NonNull<T>, length: usize, capacity: usize, ) -> Vec<T>

🔬This is a nightly-only experimental API. (`box_vec_non_null` #130364)

Creates a `Vec<T>` directly from a `NonNull` pointer, a length, and a capacity.

##### §Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must have been allocated using the global allocator, such as via the `alloc::alloc` function.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the `dealloc` requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, `dealloc` must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to be the capacity that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of `pointer::offset`.

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is normally **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`, doing so is only safe if the array was initially allocated by a `Vec` or `String`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1. To avoid these issues, it is often preferable to do casting/transmuting using `NonNull::slice_from_raw_parts` instead.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### §Examples

```
#![feature(box_vec_non_null)]

let v = vec![1, 2, 3];

let (p, len, cap) = v.into_parts();

unsafe {
 for i in 0..len {
 p.add(i).write(4 + i);
 }

 let rebuilt = Vec::from_parts(p, len, cap);
 assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```
#![feature(box_vec_non_null)]

use std::alloc::{alloc, Layout};
use std::ptr::NonNull;

fn main() {
 let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

 let vec = unsafe {
 let Some(mem) = NonNull::new(alloc(layout).cast::<u32>()) else {
 return;
 };

 mem.write(1_000_000);

 Vec::from_parts(mem, 1, 16)
 };

 assert_eq!(vec, &[1_000_000]);
 assert_eq!(vec.capacity(), 16);
}
```

Source

#### pub fn from\_fn<F>(length: usize, f: F) -> Vec<T>

where F: FnMut(usize) -> T,

🔬This is a nightly-only experimental API. (`vec_from_fn` #149698)

Creates a `Vec<T>` where each element is produced by calling `f` with that element’s index while walking forward through the `Vec<T>`.

This is essentially the same as writing

```
vec![f(0), f(1), f(2), …, f(length - 2), f(length - 1)]
```

and is similar to `(0..i).map(f)`, just for `Vec<T>`s not iterators.

If `length == 0`, this produces an empty `Vec<T>` without ever calling `f`.

##### §Example

```
#![feature(vec_from_fn)]

let vec = Vec::from_fn(5, |i| i);

assert_eq!(vec, [0, 1, 2, 3, 4]);

let vec2 = Vec::from_fn(8, |i| i * 2);

assert_eq!(vec2, [0, 2, 4, 6, 8, 10, 12, 14]);

let bool_vec = Vec::from_fn(5, |i| i % 2 == 0);

assert_eq!(bool_vec, [true, false, true, false, true]);
```

The `Vec<T>` is generated in ascending index order, starting from the front and going towards the back, so you can use closures with mutable state:

```
#![feature(vec_from_fn)]

let mut state = 1;
let a = Vec::from_fn(6, |_| { let x = state; state *= 2; x });

assert_eq!(a, [1, 2, 4, 8, 16, 32]);
```

1.93.0 · Source

#### pub fn into\_raw\_parts(self) -> (\*mut T, usize, usize)

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity)`.

Returns the raw pointer to the underlying data, the length of the vector (in elements), and the allocated capacity of the data (in elements). These are the same arguments in the same order as the arguments to `from_raw_parts`.

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. Most often, one does this by converting the raw pointer, length, and capacity back into a `Vec` with the `from_raw_parts` function; more generally, if `T` is non-zero-sized and the capacity is nonzero, one may use any method that calls `dealloc` with a layout of `Layout::array::<T>(capacity)`; if `T` is zero-sized or the capacity is zero, nothing needs to be done.

##### §Examples

```
let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_raw_parts();

let rebuilt = unsafe {
 let ptr = ptr as *mut u32;

 Vec::from_raw_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

Source

#### pub fn into\_parts(self) -> (NonNull<T>, usize, usize)

🔬This is a nightly-only experimental API. (`box_vec_non_null` #130364)

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity)`.

Returns the `NonNull` pointer to the underlying data, the length of the vector (in elements), and the allocated capacity of the data (in elements). These are the same arguments in the same order as the arguments to `from_parts`.

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the `NonNull` pointer, length, and capacity back into a `Vec` with the `from_parts` function, allowing the destructor to perform the cleanup.

##### §Examples

```
#![feature(box_vec_non_null)]

let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_parts();

let rebuilt = unsafe {
 let ptr = ptr.cast::<u32>();

 Vec::from_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

Source

#### pub const fn const\_make\_global(self) -> &'static \[T\]

where T: Freeze,

🔬This is a nightly-only experimental API. (`const_heap` #79597)

Interns the `Vec<T>`, making the underlying memory read-only. This method should be called during compile time. (This is a no-op if called during runtime)

This method must be called if the memory used by `Vec` needs to appear in the final values of constants.

Source§

### impl<T, A> Vec<T, A>

where A: Allocator,

Source

#### pub const fn with\_capacity\_in(capacity: usize, alloc: A) -> Vec<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Constructs a new, empty `Vec<T, A>` with at least the specified capacity with the provided allocator.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

It is important to note that although the returned vector has the minimum _capacity_ specified, the vector will have a zero _length_. For an explanation of the difference between length and capacity, see _Capacity and reallocation_.

If it is important to know the exact allocated capacity of a `Vec`, always use the `capacity` method after construction.

For `Vec<T, A>` where `T` is a zero-sized type, there will be no allocation and the capacity will always be `usize::MAX`.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut vec = Vec::with_capacity_in(10, System);

assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

for i in 0..10 {
 vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

let vec_units = Vec::<(), System>::with_capacity_in(10, System);
assert_eq!(vec_units.capacity(), usize::MAX);
```

1.0.0 (const: unstable) · Source

#### pub fn push(&mut self, value: T)

Appends an element to the back of a collection.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1, 2];
vec.push(3);
assert_eq!(vec, [1, 2, 3]);
```

##### §Time complexity

Takes amortized _O_(1) time. If the vector’s length would exceed its capacity after the push, _O_(_capacity_) time is taken to copy the vector’s elements to a larger allocation. This expensive operation is offset by the _capacity_ _O_(1) insertions it allows.

1.95.0 (const: unstable) · Source

#### pub fn push\_mut(&mut self, value: T) -> &mut T

Appends an element to the back of a collection, returning a reference to it.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1, 2];
let last = vec.push_mut(3);
assert_eq!(*last, 3);
assert_eq!(vec, [1, 2, 3]);

let last = vec.push_mut(3);
*last += 1;
assert_eq!(vec, [1, 2, 3, 4]);
```

##### §Time complexity

Takes amortized _O_(1) time. If the vector’s length would exceed its capacity after the push, _O_(_capacity_) time is taken to copy the vector’s elements to a larger allocation. This expensive operation is offset by the _capacity_ _O_(1) insertions it allows.

Source§

### impl<T, A> Vec<T, A>

where A: Allocator,

Source

#### pub const fn new\_in(alloc: A) -> Vec<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Constructs a new, empty `Vec<T, A>`.

The vector will not allocate until elements are pushed onto it.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut vec: Vec<i32, _> = Vec::new_in(System);
```

Source

#### pub fn try\_with\_capacity\_in( capacity: usize, alloc: A, ) -> Result<Vec<T, A>, TryReserveError\>

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Constructs a new, empty `Vec<T, A>` with at least the specified capacity with the provided allocator.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

##### §Errors

Returns an error if the capacity exceeds `isize::MAX` _bytes_, or if the allocator reports allocation failure.

Source

#### pub unsafe fn from\_raw\_parts\_in( ptr: \*mut T, length: usize, capacity: usize, alloc: A, ) -> Vec<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Creates a `Vec<T, A>` directly from a pointer, a length, a capacity, and an allocator.

##### §Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must be _currently allocated_ via the given allocator `alloc`.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the `dealloc` requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, `dealloc` must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to _fit_ the layout size that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of `pointer::offset`.

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T, A>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

use std::ptr;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

let (p, len, cap, alloc) = v.into_raw_parts_with_alloc();

unsafe {
 for i in 0..len {
 ptr::write(p.add(i), 4 + i);
 }

 let rebuilt = Vec::from_raw_parts_in(p, len, cap, alloc.clone());
 assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```
#![feature(allocator_api)]

use std::alloc::{AllocError, Allocator, Global, Layout};

fn main() {
 let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

 let vec = unsafe {
 let mem = match Global.allocate(layout) {
 Ok(mem) => mem.cast::<u32>().as_ptr(),
 Err(AllocError) => return,
 };

 mem.write(1_000_000);

 Vec::from_raw_parts_in(mem, 1, 16, Global)
 };

 assert_eq!(vec, &[1_000_000]);
 assert_eq!(vec.capacity(), 16);
}
```

Source

#### pub unsafe fn from\_parts\_in( ptr: NonNull<T>, length: usize, capacity: usize, alloc: A, ) -> Vec<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Creates a `Vec<T, A>` directly from a `NonNull` pointer, a length, a capacity, and an allocator.

##### §Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must be _currently allocated_ via the given allocator `alloc`.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the `dealloc` requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, `dealloc` must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to _fit_ the layout size that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of `pointer::offset`.

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T, A>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

let (p, len, cap, alloc) = v.into_parts_with_alloc();

unsafe {
 for i in 0..len {
 p.add(i).write(4 + i);
 }

 let rebuilt = Vec::from_parts_in(p, len, cap, alloc.clone());
 assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```
#![feature(allocator_api)]

use std::alloc::{AllocError, Allocator, Global, Layout};

fn main() {
 let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

 let vec = unsafe {
 let mem = match Global.allocate(layout) {
 Ok(mem) => mem.cast::<u32>(),
 Err(AllocError) => return,
 };

 mem.write(1_000_000);

 Vec::from_parts_in(mem, 1, 16, Global)
 };

 assert_eq!(vec, &[1_000_000]);
 assert_eq!(vec.capacity(), 16);
}
```

Source

#### pub fn into\_raw\_parts\_with\_alloc(self) -> (\*mut T, usize, usize, A)

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity, allocator)`.

Returns the raw pointer to the underlying data, the length of the vector (in elements), the allocated capacity of the data (in elements), and the allocator. These are the same arguments in the same order as the arguments to `from_raw_parts_in`.

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the raw pointer, length, and capacity back into a `Vec` with the `from_raw_parts_in` function, allowing the destructor to perform the cleanup.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_raw_parts_with_alloc();

let rebuilt = unsafe {
 let ptr = ptr as *mut u32;

 Vec::from_raw_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

Source

#### pub fn into\_parts\_with\_alloc(self) -> (NonNull<T>, usize, usize, A)

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity, allocator)`.

Returns the `NonNull` pointer to the underlying data, the length of the vector (in elements), the allocated capacity of the data (in elements), and the allocator. These are the same arguments in the same order as the arguments to `from_parts_in`.

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the `NonNull` pointer, length, and capacity back into a `Vec` with the `from_parts_in` function, allowing the destructor to perform the cleanup.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_parts_with_alloc();

let rebuilt = unsafe {
 let ptr = ptr.cast::<u32>();

 Vec::from_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

1.0.0 (const: 1.87.0) · Source

#### pub const fn capacity(&self) -> usize

Returns the total number of elements the vector can hold without reallocating.

##### §Examples

```
let mut vec: Vec<i32> = Vec::with_capacity(10);
vec.push(42);
assert!(vec.capacity() >= 10);
```

A vector with zero-sized elements will always have a capacity of usize::MAX:

```
#[derive(Clone)]
struct ZeroSized;

fn main() {
 assert_eq!(std::mem::size_of::<ZeroSized>(), 0);
 let v = vec![ZeroSized; 0];
 assert_eq!(v.capacity(), usize::MAX);
}
```

1.0.0 · Source

#### pub fn reserve(&mut self, additional: usize)

Reserves capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. The collection may reserve more space to speculatively avoid frequent reallocations. After calling `reserve`, capacity will be greater than or equal to `self.len() + additional`. Does nothing if capacity is already sufficient.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1];
vec.reserve(10);
assert!(vec.capacity() >= 11);
```

1.0.0 · Source

#### pub fn reserve\_exact(&mut self, additional: usize)

Reserves the minimum capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. Unlike `reserve`, this will not deliberately over-allocate to speculatively avoid frequent allocations. After calling `reserve_exact`, capacity will be greater than or equal to `self.len() + additional`. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it requests. Therefore, capacity can not be relied upon to be precisely minimal. Prefer `reserve` if future insertions are expected.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1];
vec.reserve_exact(10);
assert!(vec.capacity() >= 11);
```

1.57.0 · Source

#### pub fn try\_reserve(&mut self, additional: usize) -> Result<(), TryReserveError\>

Tries to reserve capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. The collection may reserve more space to speculatively avoid frequent reallocations. After calling `try_reserve`, capacity will be greater than or equal to `self.len() + additional` if it returns `Ok(())`. Does nothing if capacity is already sufficient. This method preserves the contents even if an error occurs.

##### §Errors

If the capacity overflows, or the allocator reports a failure, then an error is returned.

##### §Examples

```
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
 let mut output = Vec::new();

 output.try_reserve(data.len())?;

 output.extend(data.iter().map(|&val| {
 val * 2 + 5 }));

 Ok(output)
}
```

1.57.0 · Source

#### pub fn try\_reserve\_exact( &mut self, additional: usize, ) -> Result<(), TryReserveError\>

Tries to reserve the minimum capacity for at least `additional` elements to be inserted in the given `Vec<T>`. Unlike `try_reserve`, this will not deliberately over-allocate to speculatively avoid frequent allocations. After calling `try_reserve_exact`, capacity will be greater than or equal to `self.len() + additional` if it returns `Ok(())`. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it requests. Therefore, capacity can not be relied upon to be precisely minimal. Prefer `try_reserve` if future insertions are expected.

##### §Errors

If the capacity overflows, or the allocator reports a failure, then an error is returned.

##### §Examples

```
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
 let mut output = Vec::new();

 output.try_reserve_exact(data.len())?;

 output.extend(data.iter().map(|&val| {
 val * 2 + 5 }));

 Ok(output)
}
```

1.0.0 · Source

#### pub fn shrink\_to\_fit(&mut self)

Shrinks the capacity of the vector as much as possible.

The behavior of this method depends on the allocator, which may either shrink the vector in-place or reallocate. The resulting vector might still have some excess capacity, just as is the case for `with_capacity`. See `Allocator::shrink` for more details.

##### §Examples

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to_fit();
assert!(vec.capacity() >= 3);
```

1.56.0 · Source

#### pub fn shrink\_to(&mut self, min\_capacity: usize)

Shrinks the capacity of the vector with a lower bound.

The capacity will remain at least as large as both the length and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

##### §Examples

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to(4);
assert!(vec.capacity() >= 4);
vec.shrink_to(0);
assert!(vec.capacity() >= 3);
```

Source

#### pub fn try\_shrink\_to\_fit(&mut self) -> Result<(), TryReserveError\>

🔬This is a nightly-only experimental API. (`vec_fallible_shrink` #152350)

Tries to shrink the capacity of the vector as much as possible

The behavior of this method depends on the allocator, which may either shrink the vector in-place or reallocate. The resulting vector might still have some excess capacity, just as is the case for `with_capacity`. See `Allocator::shrink` for more details.

##### §Errors

This function returns an error if the allocator fails to shrink the allocation, the vector thereafter is still safe to use, the capacity remains unchanged however. See `Allocator::shrink`.

##### §Examples

```
#![feature(vec_fallible_shrink)]

let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.try_shrink_to_fit().expect("why is the test harness failing to shrink to 12 bytes");
assert!(vec.capacity() >= 3);
```

Source

#### pub fn try\_shrink\_to( &mut self, min\_capacity: usize, ) -> Result<(), TryReserveError\>

🔬This is a nightly-only experimental API. (`vec_fallible_shrink` #152350)

Shrinks the capacity of the vector with a lower bound.

The capacity will remain at least as large as both the length and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

##### §Errors

This function returns an error if the allocator fails to shrink the allocation, the vector thereafter is still safe to use, the capacity remains unchanged however. See `Allocator::shrink`.

##### §Examples

```
#![feature(vec_fallible_shrink)]

let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.try_shrink_to(4).expect("why is the test harness failing to shrink to 12 bytes");
assert!(vec.capacity() >= 4);
vec.try_shrink_to(0).expect("this is a no-op and thus the allocator isn't involved.");
assert!(vec.capacity() >= 3);
```

1.0.0 · Source

#### pub fn into\_boxed\_slice(self) -> Box<\[T\], A>

Converts the vector into `Box<[T]>`.

Before doing the conversion, this method discards excess capacity like `shrink_to_fit`.

##### §Examples

```
let v = vec![1, 2, 3];

let slice = v.into_boxed_slice();
```

Any excess capacity is removed:

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);

assert!(vec.capacity() >= 10);
let slice = vec.into_boxed_slice();
assert_eq!(slice.into_vec().capacity(), 3);
```

1.0.0 · Source

#### pub fn truncate(&mut self, len: usize)

Shortens the vector, keeping the first `len` elements and dropping the rest.

If `len` is greater or equal to the vector’s current length, this has no effect.

The `drain` method can emulate `truncate`, but causes the excess elements to be returned instead of dropped.

Note that this method has no effect on the allocated capacity of the vector.

##### §Examples

Truncating a five element vector to two elements:

```
let mut vec = vec![1, 2, 3, 4, 5];
vec.truncate(2);
assert_eq!(vec, [1, 2]);
```

No truncation occurs when `len` is greater than the vector’s current length:

```
let mut vec = vec![1, 2, 3];
vec.truncate(8);
assert_eq!(vec, [1, 2, 3]);
```

Truncating when `len == 0` is equivalent to calling the `clear` method.

```
let mut vec = vec![1, 2, 3];
vec.truncate(0);
assert_eq!(vec, []);
```

1.7.0 (const: 1.87.0) · Source

#### pub const fn as\_slice(&self) -> &\[T\]

Extracts a slice containing the entire vector.

Equivalent to `&s[..]`.

##### §Examples

```
use std::io::{self, Write};
let buffer = vec![1, 2, 3, 5, 8];
io::sink().write(buffer.as_slice()).unwrap();
```

1.7.0 (const: 1.87.0) · Source

#### pub const fn as\_mut\_slice(&mut self) -> &mut \[T\]

Extracts a mutable slice of the entire vector.

Equivalent to `&mut s[..]`.

##### §Examples

```
use std::io::{self, Read};
let mut buffer = vec![0; 3];
io::repeat(0b101).read_exact(buffer.as_mut_slice()).unwrap();
```

1.37.0 (const: 1.87.0) · Source

#### pub const fn as\_ptr(&self) -> \*const T

Returns a raw pointer to the vector’s buffer, or a dangling raw pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

The caller must also ensure that the memory the pointer (non-transitively) points to is never written to (except inside an `UnsafeCell`) using this pointer or any pointer derived from it. If you need to mutate the contents of the slice, use `as_mut_ptr`.

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`, and `as_non_null`. Note that calling other methods that materialize mutable references to the slice, or mutable references to specific elements you are planning on accessing through this pointer, as well as writing to those elements, may still invalidate this pointer. See the second example below for how this guarantee can be used.

##### §Examples

```
let x = vec![1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
 for i in 0..x.len() {
 assert_eq!(*x_ptr.add(i), 1 << i);
 }
}
```

Due to the aliasing guarantee, the following code is legal:

```
unsafe {
 let mut v = vec![0, 1, 2];
 let ptr1 = v.as_ptr();
 let _ = ptr1.read();
 let ptr2 = v.as_mut_ptr().offset(2);
 ptr2.write(2);
 let _ = ptr1.read();
}
```

1.37.0 (const: 1.87.0) · Source

#### pub const fn as\_mut\_ptr(&mut self) -> \*mut T

Returns a raw mutable pointer to the vector’s buffer, or a dangling raw pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`, and `as_non_null`. Note that calling other methods that materialize references to the slice, or references to specific elements you are planning on accessing through this pointer, may still invalidate this pointer. See the second example below for how this guarantee can be used.

The method also guarantees that, as long as `T` is not zero-sized and the capacity is nonzero, the pointer may be passed into `dealloc` with a layout of `Layout::array::<T>(capacity)` in order to deallocate the backing memory. If this is done, be careful not to run the destructor of the `Vec`, as dropping it will result in double-frees. Wrapping the `Vec` in a `ManuallyDrop` is the typical way to achieve this.

##### §Examples

```
let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_mut_ptr();

unsafe {
 for i in 0..size {
 *x_ptr.add(i) = i as i32;
 }
 x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);
```

Due to the aliasing guarantee, the following code is legal:

```
unsafe {
 let mut v = vec![0];
 let ptr1 = v.as_mut_ptr();
 ptr1.write(1);
 let ptr2 = v.as_mut_ptr();
 ptr2.write(2);
 ptr1.write(3);
}
```

Deallocating a vector using `Box` (which uses `dealloc` internally):

```
use std::mem::{ManuallyDrop, MaybeUninit};

let mut v = ManuallyDrop::new(vec![0, 1, 2]);
let ptr = v.as_mut_ptr();
let capacity = v.capacity();
let slice_ptr: *mut [MaybeUninit<i32>] =
 std::ptr::slice_from_raw_parts_mut(ptr.cast(), capacity);
drop(unsafe { Box::from_raw(slice_ptr) });
```

Source

#### pub const fn as\_non\_null(&mut self) -> NonNull<T>

🔬This is a nightly-only experimental API. (`box_vec_non_null` #130364)

Returns a `NonNull` pointer to the vector’s buffer, or a dangling `NonNull` pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`, and `as_non_null`. Note that calling other methods that materialize references to the slice, or references to specific elements you are planning on accessing through this pointer, may still invalidate this pointer. See the second example below for how this guarantee can be used.

##### §Examples

```
#![feature(box_vec_non_null)]

let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_non_null();

unsafe {
 for i in 0..size {
 x_ptr.add(i).write(i as i32);
 }
 x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);
```

Due to the aliasing guarantee, the following code is legal:

```
#![feature(box_vec_non_null)]

unsafe {
 let mut v = vec![0];
 let ptr1 = v.as_non_null();
 ptr1.write(1);
 let ptr2 = v.as_non_null();
 ptr2.write(2);
 ptr1.write(3);
}
```

Source

#### pub fn allocator(&self) -> &A

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Returns a reference to the underlying allocator.

1.0.0 · Source

#### pub unsafe fn set\_len(&mut self, new\_len: usize)

Forces the length of the vector to `new_len`.

This is a low-level operation that maintains none of the normal invariants of the type. Normally changing the length of a vector is done using one of the safe operations instead, such as `truncate`, `resize`, `extend`, or `clear`.

##### §Safety

* `new_len` must be less than or equal to `capacity()`.
* The elements at `old_len..new_len` must be initialized.

##### §Examples

See `spare_capacity_mut()` for an example with safe initialization of capacity elements and use of this method.

`set_len()` can be useful for situations in which the vector is serving as a buffer for other code, particularly over FFI:

```
pub fn get_dictionary(&self) -> Option<Vec<u8>> {
 let mut dict = Vec::with_capacity(32_768);
 let mut dict_length = 0;
 unsafe {
 let r = deflateGetDictionary(self.strm, dict.as_mut_ptr(), &mut dict_length);
 if r == Z_OK {
 dict.set_len(dict_length);
 Some(dict)
 } else {
 None
 }
 }
}
```

While the following example is sound, there is a memory leak since the inner vectors were not freed prior to the `set_len` call:

```
let mut vec = vec![vec![1, 0, 0],
 vec![0, 1, 0],
 vec![0, 0, 1]];
unsafe {
 vec.set_len(0);
}
```

Normally, here, one would use `clear` instead to correctly drop the contents and thus not leak memory.

1.0.0 · Source

#### pub fn swap\_remove(&mut self, index: usize) -> T

Removes an element from the vector and returns it.

The removed element is replaced by the last element of the vector.

This does not preserve ordering of the remaining elements, but is _O_(1). If you need to preserve the element order, use `remove` instead.

##### §Panics

Panics if `index` is out of bounds.

##### §Examples

```
let mut v = vec!["foo", "bar", "baz", "qux"];

assert_eq!(v.swap_remove(1), "bar");
assert_eq!(v, ["foo", "qux", "baz"]);

assert_eq!(v.swap_remove(0), "foo");
assert_eq!(v, ["baz", "qux"]);
```

1.0.0 · Source

#### pub fn insert(&mut self, index: usize, element: T)

Inserts an element at position `index` within the vector, shifting all elements after it to the right.

##### §Panics

Panics if `index > len`.

##### §Examples

```
let mut vec = vec!['a', 'b', 'c'];
vec.insert(1, 'd');
assert_eq!(vec, ['a', 'd', 'b', 'c']);
vec.insert(4, 'e');
assert_eq!(vec, ['a', 'd', 'b', 'c', 'e']);
```

##### §Time complexity

Takes _O_(`Vec::len`) time. All items after the insertion index must be shifted to the right. In the worst case, all elements are shifted when the insertion index is 0.

1.95.0 · Source

#### pub fn insert\_mut(&mut self, index: usize, element: T) -> &mut T

Inserts an element at position `index` within the vector, shifting all elements after it to the right, and returning a reference to the new element.

##### §Panics

Panics if `index > len`.

##### §Examples

```
let mut vec = vec![1, 3, 5, 9];
let x = vec.insert_mut(3, 6);
*x += 1;
assert_eq!(vec, [1, 3, 5, 7, 9]);
```

##### §Time complexity

Takes _O_(`Vec::len`) time. All items after the insertion index must be shifted to the right. In the worst case, all elements are shifted when the insertion index is 0.

1.0.0 · Source

#### pub fn remove(&mut self, index: usize) -> T

Removes and returns the element at position `index` within the vector, shifting all elements after it to the left.

Note: Because this shifts over the remaining elements, it has a worst-case performance of _O_(_n_). If you don’t need the order of elements to be preserved, use `swap_remove` instead. If you’d like to remove elements from the beginning of the `Vec`, consider using `VecDeque::pop_front` instead.

##### §Panics

Panics if `index` is out of bounds.

##### §Examples

```
let mut v = vec!['a', 'b', 'c'];
assert_eq!(v.remove(1), 'b');
assert_eq!(v, ['a', 'c']);
```

Source

#### pub fn try\_remove(&mut self, index: usize) -> Option<T>

🔬This is a nightly-only experimental API. (`vec_try_remove` #146954)

Remove and return the element at position `index` within the vector, shifting all elements after it to the left, or `None` if it does not exist.

Note: Because this shifts over the remaining elements, it has a worst-case performance of _O_(_n_). If you’d like to remove elements from the beginning of the `Vec`, consider using `VecDeque::pop_front` instead.

##### §Examples

```
#![feature(vec_try_remove)]
let mut v = vec![1, 2, 3];
assert_eq!(v.try_remove(0), Some(1));
assert_eq!(v.try_remove(2), None);
```

1.0.0 · Source

#### pub fn retain<F>(&mut self, f: F)

where F: FnMut(&T) -> bool,

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns `false`. This method operates in place, visiting each element exactly once in the original order, and preserves the order of the retained elements.

##### §Examples

```
let mut vec = vec![1, 2, 3, 4];
vec.retain(|&x| x % 2 == 0);
assert_eq!(vec, [2, 4]);
```

Because the elements are visited exactly once in the original order, external state may be used to decide which elements to keep.

```
let mut vec = vec![1, 2, 3, 4, 5];
let keep = [false, true, true, false, true];
let mut iter = keep.iter();
vec.retain(|_| *iter.next().unwrap());
assert_eq!(vec, [2, 3, 5]);
```

1.61.0 · Source

#### pub fn retain\_mut<F>(&mut self, f: F)

where F: FnMut(&mut T) -> bool,

Retains only the elements specified by the predicate, passing a mutable reference to it.

In other words, remove all elements `e` such that `f(&mut e)` returns `false`. This method operates in place, visiting each element exactly once in the original order, and preserves the order of the retained elements.

##### §Examples

```
let mut vec = vec![1, 2, 3, 4];
vec.retain_mut(|x| if *x <= 3 {
 *x += 1;
 true
} else {
 false
});
assert_eq!(vec, [2, 3, 4]);
```

1.16.0 · Source

#### pub fn dedup\_by\_key<F, K>(&mut self, key: F)

where F: FnMut(&mut T) -> K, K: PartialEq,

Removes all but the first of consecutive elements in the vector that resolve to the same key.

If the vector is sorted, this removes all duplicates.

##### §Examples

```
let mut vec = vec![10, 20, 21, 30, 20];

vec.dedup_by_key(|i| *i / 10);

assert_eq!(vec, [10, 20, 30, 20]);
```

1.16.0 · Source

#### pub fn dedup\_by<F>(&mut self, same\_bucket: F)

where F: FnMut(&mut T, &mut T) -> bool,

Removes all but the first of consecutive elements in the vector satisfying a given equality relation.

The `same_bucket` function is passed references to two elements from the vector and must determine if the elements compare equal. The elements are passed in opposite order from their order in the slice, so if `same_bucket(a, b)` returns `true`, `a` is removed.

If the vector is sorted, this removes all duplicates.

##### §Examples

```
let mut vec = vec!["foo", "bar", "Bar", "baz", "bar"];

vec.dedup_by(|a, b| a.eq_ignore_ascii_case(b));

assert_eq!(vec, ["foo", "bar", "baz", "bar"]);
```

Source

#### pub fn push\_within\_capacity(&mut self, value: T) -> Result<&mut T, T>

🔬This is a nightly-only experimental API. (`vec_push_within_capacity` #100486)

Appends an element and returns a reference to it if there is sufficient spare capacity, otherwise an error is returned with the element.

Unlike `push` this method will not reallocate when there’s insufficient capacity. The caller should use `reserve` or `try_reserve` to ensure that there is enough capacity.

##### §Examples

A manual, panic-free alternative to `FromIterator`:

```
#![feature(vec_push_within_capacity)]

use std::collections::TryReserveError;
fn from_iter_fallible<T>(iter: impl Iterator<Item=T>) -> Result<Vec<T>, TryReserveError> {
 let mut vec = Vec::new();
 for value in iter {
 if let Err(value) = vec.push_within_capacity(value) {
 vec.try_reserve(1)?;
 let _ = vec.push_within_capacity(value);
 }
 }
 Ok(vec)
}
assert_eq!(from_iter_fallible(0..100), Ok(Vec::from_iter(0..100)));
```

##### §Time complexity

Takes _O_(1) time.

1.0.0 · Source

#### pub fn pop(&mut self) -> Option<T>

Removes the last element from a vector and returns it, or `None` if it is empty.

If you’d like to pop the first element, consider using `VecDeque::pop_front` instead.

##### §Examples

```
let mut vec = vec![1, 2, 3];
assert_eq!(vec.pop(), Some(3));
assert_eq!(vec, [1, 2]);
```

##### §Time complexity

Takes _O_(1) time.

1.86.0 · Source

#### pub fn pop\_if(&mut self, predicate: impl FnOnce(&mut T) -> bool) -> Option<T>

Removes and returns the last element from a vector if the predicate returns `true`, or `None` if the predicate returns false or the vector is empty (the predicate will not be called in that case).

##### §Examples

```
let mut vec = vec![1, 2, 3, 4];
let pred = |x: &mut i32| *x % 2 == 0;

assert_eq!(vec.pop_if(pred), Some(4));
assert_eq!(vec, [1, 2, 3]);
assert_eq!(vec.pop_if(pred), None);
```

Source

#### pub fn peek\_mut(&mut self) -> Option<PeekMut<'\_, T, A>>

🔬This is a nightly-only experimental API. (`vec_peek_mut` #122742)

Returns a mutable reference to the last item in the vector, or `None` if it is empty.

##### §Examples

Basic usage:

```
#![feature(vec_peek_mut)]
let mut vec = Vec::new();
assert!(vec.peek_mut().is_none());

vec.push(1);
vec.push(5);
vec.push(2);
assert_eq!(vec.last(), Some(&2));
if let Some(mut val) = vec.peek_mut() {
 *val = 0;
}
assert_eq!(vec.last(), Some(&0));
```

1.4.0 · Source

#### pub fn append(&mut self, other: &mut Vec<T, A>)

Moves all the elements of `other` into `self`, leaving `other` empty.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1, 2, 3];
let mut vec2 = vec![4, 5, 6];
vec.append(&mut vec2);
assert_eq!(vec, [1, 2, 3, 4, 5, 6]);
assert_eq!(vec2, []);
```

1.6.0 · Source

#### pub fn drain<R>(&mut self, range: R) -> Drain<'\_, T, A> ⓘ

where R: RangeBounds<usize\>,

Removes the subslice indicated by the given range from the vector, returning a double-ended iterator over the removed subslice.

If the iterator is dropped before being fully consumed, it drops the remaining removed elements.

The returned iterator keeps a mutable borrow on the vector to optimize its implementation.

##### §Panics

Panics if the range has `start_bound > end_bound`, or, if the range is bounded on either end and past the length of the vector.

##### §Leaking

If the returned iterator goes out of scope without being dropped (due to `mem::forget`, for example), the vector may have lost and leaked elements arbitrarily, including elements outside the range.

##### §Examples

```
let mut v = vec![1, 2, 3];
let u: Vec<_> = v.drain(1..).collect();
assert_eq!(v, &[1]);
assert_eq!(u, &[2, 3]);

v.drain(..);
assert_eq!(v, &[]);
```

1.0.0 · Source

#### pub fn clear(&mut self)

Clears the vector, removing all values.

Note that this method has no effect on the allocated capacity of the vector.

##### §Examples

```
let mut v = vec![1, 2, 3];

v.clear();

assert!(v.is_empty());
```

1.0.0 (const: 1.87.0) · Source

#### pub const fn len(&self) -> usize

Returns the number of elements in the vector, also referred to as its ‘length’.

##### §Examples

```
let a = vec![1, 2, 3];
assert_eq!(a.len(), 3);
```

1.0.0 (const: 1.87.0) · Source

#### pub const fn is\_empty(&self) -> bool

Returns `true` if the vector contains no elements.

##### §Examples

```
let mut v = Vec::new();
assert!(v.is_empty());

v.push(1);
assert!(!v.is_empty());
```

1.4.0 · Source

#### pub fn split\_off(&mut self, at: usize) -> Vec<T, A>

where A: Clone,

Splits the collection into two at the given index.

Returns a newly allocated vector containing the elements in the range `[at, len)`. After the call, the original vector will be left containing the elements `[0, at)` with its previous capacity unchanged.

* If you want to take ownership of the entire contents and capacity of the vector, see `mem::take` or `mem::replace`.
* If you don’t need the returned vector at all, see `Vec::truncate`.
* If you want to take ownership of an arbitrary subslice, or you don’t necessarily want to store the removed items in a vector, see `Vec::drain`.

##### §Panics

Panics if `at > len`.

##### §Examples

```
let mut vec = vec!['a', 'b', 'c'];
let vec2 = vec.split_off(1);
assert_eq!(vec, ['a']);
assert_eq!(vec2, ['b', 'c']);
```

1.33.0 · Source

#### pub fn resize\_with<F>(&mut self, new\_len: usize, f: F)

where F: FnMut() -> T,

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the difference, with each additional slot filled with the result of calling the closure `f`. The return values from `f` will end up in the `Vec` in the order they have been generated.

If `new_len` is less than `len`, the `Vec` is simply truncated.

This method uses a closure to create new values on every push. If you’d rather `Clone` a given value, use `Vec::resize`. If you want to use the `Default` trait to generate values, you can pass `Default::default` as the second argument.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1, 2, 3];
vec.resize_with(5, Default::default);
assert_eq!(vec, [1, 2, 3, 0, 0]);

let mut vec = vec![];
let mut p = 1;
vec.resize_with(4, || { p *= 2; p });
assert_eq!(vec, [2, 4, 8, 16]);
```

1.47.0 · Source

#### pub fn leak<'a>(self) -> &'a mut \[T\]

where A: 'a,

Consumes and leaks the `Vec`, returning a mutable reference to the contents, `&'a mut [T]`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type has only static references, or none at all, then this may be chosen to be `'static`.

As of Rust 1.57, this method does not reallocate or shrink the `Vec`, so the leaked allocation may include unused capacity that is not part of the returned slice.

This function is mainly useful for data that lives for the remainder of the program’s life. Dropping the returned reference will cause a memory leak.

##### §Examples

Simple usage:

```
let x = vec![1, 2, 3];
let static_ref: &'static mut [usize] = x.leak();
static_ref[0] += 1;
assert_eq!(static_ref, &[2, 2, 3]);
```

1.60.0 · Source

#### pub fn spare\_capacity\_mut(&mut self) -> &mut \[MaybeUninit<T>\]

Returns the remaining spare capacity of the vector as a slice of `MaybeUninit<T>`.

The returned slice can be used to fill the vector with data (e.g. by reading from a file) before marking the data as initialized using the `set_len` method.

##### §Examples

```
let mut v = Vec::with_capacity(10);

let uninit = v.spare_capacity_mut();
uninit[0].write(0);
uninit[1].write(1);
uninit[2].write(2);

unsafe {
 v.set_len(3);
}

assert_eq!(&v, &[0, 1, 2]);
```

Source

#### pub fn split\_at\_spare\_mut(&mut self) -> (&mut \[T\], &mut \[MaybeUninit<T>\])

🔬This is a nightly-only experimental API. (`vec_split_at_spare` #81944)

Returns vector content as a slice of `T`, along with the remaining spare capacity of the vector as a slice of `MaybeUninit<T>`.

The returned spare capacity slice can be used to fill the vector with data (e.g. by reading from a file) before marking the data as initialized using the `set_len` method.

Note that this is a low-level API, which should be used with care for optimization purposes. If you need to append data to a `Vec` you can use `push`, `extend`, `extend_from_slice`, `extend_from_within`, `insert`, `append`, `resize` or `resize_with`, depending on your exact needs.

##### §Examples

```
#![feature(vec_split_at_spare)]

let mut v = vec![1, 1, 2];

v.reserve(10);

let (init, uninit) = v.split_at_spare_mut();
let sum = init.iter().copied().sum::<u32>();

uninit[0].write(sum);
uninit[1].write(sum * 2);
uninit[2].write(sum * 3);
uninit[3].write(sum * 4);

unsafe {
 let len = v.len();
 v.set_len(len + 4);
}

assert_eq!(&v, &[1, 1, 2, 4, 8, 12, 16]);
```

Source

#### pub fn into\_chunks<const N: usize\>(self) -> Vec<\[T; N\], A>

🔬This is a nightly-only experimental API. (`vec_into_chunks` #142137)

Groups every `N` elements in the `Vec<T>` into chunks to produce a `Vec<[T; N]>`, dropping elements in the remainder. `N` must be greater than zero.

If the capacity is not a multiple of the chunk size, the buffer will shrink down to the nearest multiple with a reallocation or deallocation.

This function can be used to reverse `Vec::into_flattened`.

##### §Examples

```
#![feature(vec_into_chunks)]

let vec = vec![0, 1, 2, 3, 4, 5, 6, 7];
assert_eq!(vec.into_chunks::<3>(), [[0, 1, 2], [3, 4, 5]]);

let vec = vec![0, 1, 2, 3];
let chunks: Vec<[u8; 10]> = vec.into_chunks();
assert!(chunks.is_empty());

let flat = vec![0; 8 * 8 * 8];
let reshaped: Vec<[[[u8; 8]; 8]; 8]> = flat.into_chunks().into_chunks().into_chunks();
assert_eq!(reshaped.len(), 1);
```

Source

#### pub fn recycle<U>(self) -> Vec<U, A>

where U: Recyclable<T>,

🔬This is a nightly-only experimental API. (`vec_recycle` #148227)

This clears out this `Vec` and recycles the allocation into a new `Vec`. The item type of the resulting `Vec` needs to have the same size and alignment as the item type of the original `Vec`.

##### §Examples

```
#![feature(vec_recycle, transmutability)]
let a: Vec<u8> = vec![0; 100];
let capacity = a.capacity();
let addr = a.as_ptr().addr();
let b: Vec<i8> = a.recycle();
assert_eq!(b.len(), 0);
assert_eq!(b.capacity(), capacity);
assert_eq!(b.as_ptr().addr(), addr);
```

The `Recyclable` bound prevents this method from being called when `T` and `U` have different sizes; e.g.:

ⓘ

```
#![feature(vec_recycle, transmutability)]
let vec: Vec<[u8; 2]> = Vec::new();
let _: Vec<[u8; 1]> = vec.recycle();
```

…or different alignments:

ⓘ

```
#![feature(vec_recycle, transmutability)]
let vec: Vec<[u16; 0]> = Vec::new();
let _: Vec<[u8; 0]> = vec.recycle();
```

However, due to temporary implementation limitations of `Recyclable`, this method is not yet callable when `T` or `U` are slices, trait objects, or other exotic types; e.g.:

ⓘ

```
#![feature(vec_recycle, transmutability)]
let mut storage: Vec<&[&str]> = Vec::new();

for input in inputs {
 let mut buffer: Vec<&str> = storage.recycle();
 buffer.extend(input.split(" "));
 process(&buffer);
 storage = buffer.recycle();
}
```

Source§

### impl<T, A> Vec<T, A>

where T: Clone, A: Allocator,

1.5.0 · Source

#### pub fn resize(&mut self, new\_len: usize, value: T)

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the difference, with each additional slot filled with `value`. If `new_len` is less than `len`, the `Vec` is simply truncated.

This method requires `T` to implement `Clone`, in order to be able to clone the passed value. If you need more flexibility (or want to rely on `Default` instead of `Clone`), use `Vec::resize_with`. If you only need to resize to a smaller size, use `Vec::truncate`.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec!["hello"];
vec.resize(3, "world");
assert_eq!(vec, ["hello", "world", "world"]);

let mut vec = vec!['a', 'b', 'c', 'd'];
vec.resize(2, '_');
assert_eq!(vec, ['a', 'b']);
```

1.6.0 · Source

#### pub fn extend\_from\_slice(&mut self, other: &\[T\])

Clones and appends all elements in a slice to the `Vec`.

Iterates over the slice `other`, clones each element, and then appends it to this `Vec`. The `other` slice is traversed in-order.

Note that this function is the same as `extend`, except that it also works with slice elements that are Clone but not Copy. If Rust gets specialization this function may be deprecated.

##### §Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut vec = vec![1];
vec.extend_from_slice(&[2, 3, 4]);
assert_eq!(vec, [1, 2, 3, 4]);
```

1.53.0 · Source

#### pub fn extend\_from\_within<R>(&mut self, src: R)

where R: RangeBounds<usize\>,

Given a range `src`, clones a slice of elements in that range and appends it to the end.

`src` must be a range that can form a valid subslice of the `Vec`.

##### §Panics

Panics if starting index is greater than the end index, if the index is greater than the length of the vector, or if the new capacity exceeds `isize::MAX` _bytes_.

##### §Examples

```
let mut characters = vec!['a', 'b', 'c', 'd', 'e'];
characters.extend_from_within(2..);
assert_eq!(characters, ['a', 'b', 'c', 'd', 'e', 'c', 'd', 'e']);

let mut numbers = vec![0, 1, 2, 3, 4];
numbers.extend_from_within(..2);
assert_eq!(numbers, [0, 1, 2, 3, 4, 0, 1]);

let mut strings = vec![String::from("hello"), String::from("world"), String::from("!")];
strings.extend_from_within(1..=2);
assert_eq!(strings, ["hello", "world", "!", "world", "!"]);
```

Source§

### impl<T, A, const N: usize\> Vec<\[T; N\], A>

where A: Allocator,

1.80.0 · Source

#### pub fn into\_flattened(self) -> Vec<T, A>

Takes a `Vec<[T; N]>` and flattens it into a `Vec<T>`.

##### §Panics

Panics if the length of the resulting vector would overflow a `usize`.

This is only possible when flattening a vector of arrays of zero-sized types, and thus tends to be irrelevant in practice. If `size_of::<T>() > 0`, this will never panic.

##### §Examples

```
let mut vec = vec![[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert_eq!(vec.pop(), Some([7, 8, 9]));

let mut flattened = vec.into_flattened();
assert_eq!(flattened.pop(), Some(6));
```

Source§

### impl<T, A> Vec<T, A>

where T: PartialEq, A: Allocator,

1.0.0 · Source

#### pub fn dedup(&mut self)

Removes consecutive repeated elements in the vector according to the `PartialEq` trait implementation.

If the vector is sorted, this removes all duplicates.

##### §Examples

```
let mut vec = vec![1, 2, 2, 3, 2];

vec.dedup();

assert_eq!(vec, [1, 2, 3, 2]);
```

Source§

### impl<T, A> Vec<T, A>

where A: Allocator,

1.21.0 · Source

#### pub fn splice<R, I>( &mut self, range: R, replace\_with: I, ) -> Splice<'\_, <I as IntoIterator\>::IntoIter, A> ⓘ

where R: RangeBounds<usize\>, I: IntoIterator<Item = T>,

Creates a splicing iterator that replaces the specified range in the vector with the given `replace_with` iterator and yields the removed items. `replace_with` does not need to be the same length as `range`.

`range` is removed even if the `Splice` iterator is not consumed before it is dropped.

It is unspecified how many elements are removed from the vector if the `Splice` value is leaked.

The input iterator `replace_with` is only consumed when the `Splice` value is dropped.

This is optimal if:

* The tail (elements in the vector after `range`) is empty,
* or `replace_with` yields fewer or equal elements than `range`’s length
* or the lower bound of its `size_hint()` is exact.

Otherwise, a temporary vector is allocated and the tail is moved twice.

##### §Panics

Panics if the range has `start_bound > end_bound`, or, if the range is bounded on either end and past the length of the vector.

##### §Examples

```
let mut v = vec![1, 2, 3, 4];
let new = [7, 8, 9];
let u: Vec<_> = v.splice(1..3, new).collect();
assert_eq!(v, [1, 7, 8, 9, 4]);
assert_eq!(u, [2, 3]);
```

Using `splice` to insert new items into a vector efficiently at a specific position indicated by an empty range:

```
let mut v = vec![1, 5];
let new = [2, 3, 4];
v.splice(1..1, new);
assert_eq!(v, [1, 2, 3, 4, 5]);
```

1.87.0 · Source

#### pub fn extract\_if<F, R>( &mut self, range: R, filter: F, ) -> ExtractIf<'\_, T, F, A> ⓘ

where F: FnMut(&mut T) -> bool, R: RangeBounds<usize\>,

Creates an iterator which uses a closure to determine if an element in the range should be removed.

If the closure returns `true`, the element is removed from the vector and yielded. If the closure returns `false`, or panics, the element remains in the vector and will not be yielded.

Only elements that fall in the provided range are considered for extraction, but any elements after the range will still have to be moved if any element has been extracted.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating or the iteration short-circuits, then the remaining elements will be retained. Use `extract_if().for_each(drop)` if you do not need the returned iterator, or `retain_mut` with a negated predicate if you also do not need to restrict the range.

Using this method is equivalent to the following code:

```
let mut i = range.start;
let end_items = vec.len() - range.end;

while i < vec.len() - end_items {
 if some_predicate(&mut vec[i]) {
 let val = vec.remove(i);
 } else {
 i += 1;
 }
}
```

But `extract_if` is easier to use. `extract_if` is also more efficient, because it can backshift the elements of the array in bulk.

The iterator also lets you mutate the value of each element in the closure, regardless of whether you choose to keep or remove it.

##### §Panics

If `range` is out of bounds.

##### §Examples

Splitting a vector into even and odd values, reusing the original vector:

```
let mut numbers = vec![1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 15];

let evens = numbers.extract_if(.., |x| *x % 2 == 0).collect::<Vec<_>>();
let odds = numbers;

assert_eq!(evens, vec![2, 4, 6, 8, 14]);
assert_eq!(odds, vec![1, 3, 5, 9, 11, 13, 15]);
```

Using the range argument to only process a part of the vector:

```
let mut items = vec![0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2];
let ones = items.extract_if(7.., |x| *x == 1).collect::<Vec<_>>();
assert_eq!(items, vec![0, 0, 0, 0, 0, 0, 0, 2, 2, 2]);
assert_eq!(ones.len(), 3);
```

1.0.0 · Source

#### pub fn len(&self) -> usize

Returns the number of elements in the slice.

##### §Examples

```
let a = [1, 2, 3];
assert_eq!(a.len(), 3);
```

1.0.0 · Source

#### pub fn is\_empty(&self) -> bool

Returns `true` if the slice has a length of 0.

##### §Examples

```
let a = [1, 2, 3];
assert!(!a.is_empty());

let b: &[i32] = &[];
assert!(b.is_empty());
```

1.0.0 · Source

#### pub fn first(&self) -> Option<&T\>

Returns the first element of the slice, or `None` if it is empty.

##### §Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&10), v.first());

let w: &[i32] = &[];
assert_eq!(None, w.first());
```

1.0.0 · Source

#### pub fn first\_mut(&mut self) -> Option<&mut T\>

Returns a mutable reference to the first element of the slice, or `None` if it is empty.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_mut() {
 *first = 5;
}
assert_eq!(x, &[5, 1, 2]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.first_mut());
```

1.5.0 · Source

#### pub fn split\_first(&self) -> Option<(&T, &\[T\])>

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

##### §Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first() {
 assert_eq!(first, &0);
 assert_eq!(elements, &[1, 2]);
}
```

1.5.0 · Source

#### pub fn split\_first\_mut(&mut self) -> Option<(&mut T, &mut \[T\])>

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some((first, elements)) = x.split_first_mut() {
 *first = 3;
 elements[0] = 4;
 elements[1] = 5;
}
assert_eq!(x, &[3, 4, 5]);
```

1.5.0 · Source

#### pub fn split\_last(&self) -> Option<(&T, &\[T\])>

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

##### §Examples

```
let x = &[0, 1, 2];

if let Some((last, elements)) = x.split_last() {
 assert_eq!(last, &2);
 assert_eq!(elements, &[0, 1]);
}
```

1.5.0 · Source

#### pub fn split\_last\_mut(&mut self) -> Option<(&mut T, &mut \[T\])>

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some((last, elements)) = x.split_last_mut() {
 *last = 3;
 elements[0] = 4;
 elements[1] = 5;
}
assert_eq!(x, &[4, 5, 3]);
```

1.0.0 · Source

#### pub fn last(&self) -> Option<&T\>

Returns the last element of the slice, or `None` if it is empty.

##### §Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&30), v.last());

let w: &[i32] = &[];
assert_eq!(None, w.last());
```

1.0.0 · Source

#### pub fn last\_mut(&mut self) -> Option<&mut T\>

Returns a mutable reference to the last item in the slice, or `None` if it is empty.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_mut() {
 *last = 10;
}
assert_eq!(x, &[0, 1, 10]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.last_mut());
```

1.77.0 · Source

#### pub fn first\_chunk<const N: usize\>(&self) -> Option<&\[T; N\]\>

Returns an array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[10, 40]), u.first_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.first_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.first_chunk::<0>());
```

1.77.0 · Source

#### pub fn first\_chunk\_mut<const N: usize\>(&mut self) -> Option<&mut \[T; N\]\>

Returns a mutable array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_chunk_mut::<2>() {
 first[0] = 5;
 first[1] = 4;
}
assert_eq!(x, &[5, 4, 2]);

assert_eq!(None, x.first_chunk_mut::<4>());
```

1.77.0 · Source

#### pub fn split\_first\_chunk<const N: usize\>(&self) -> Option<(&\[T; N\], &\[T\])>

Returns an array reference to the first `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first_chunk::<2>() {
 assert_eq!(first, &[0, 1]);
 assert_eq!(elements, &[2]);
}

assert_eq!(None, x.split_first_chunk::<4>());
```

1.77.0 · Source

#### pub fn split\_first\_chunk\_mut<const N: usize\>( &mut self, ) -> Option<(&mut \[T; N\], &mut \[T\])>

Returns a mutable array reference to the first `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some((first, elements)) = x.split_first_chunk_mut::<2>() {
 first[0] = 3;
 first[1] = 4;
 elements[0] = 5;
}
assert_eq!(x, &[3, 4, 5]);

assert_eq!(None, x.split_first_chunk_mut::<4>());
```

1.77.0 · Source

#### pub fn split\_last\_chunk<const N: usize\>(&self) -> Option<(&\[T\], &\[T; N\])>

Returns an array reference to the last `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &[0, 1, 2];

if let Some((elements, last)) = x.split_last_chunk::<2>() {
 assert_eq!(elements, &[0]);
 assert_eq!(last, &[1, 2]);
}

assert_eq!(None, x.split_last_chunk::<4>());
```

1.77.0 · Source

#### pub fn split\_last\_chunk\_mut<const N: usize\>( &mut self, ) -> Option<(&mut \[T\], &mut \[T; N\])>

Returns a mutable array reference to the last `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some((elements, last)) = x.split_last_chunk_mut::<2>() {
 last[0] = 3;
 last[1] = 4;
 elements[0] = 5;
}
assert_eq!(x, &[5, 3, 4]);

assert_eq!(None, x.split_last_chunk_mut::<4>());
```

1.77.0 · Source

#### pub fn last\_chunk<const N: usize\>(&self) -> Option<&\[T; N\]\>

Returns an array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[40, 30]), u.last_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.last_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.last_chunk::<0>());
```

1.77.0 · Source

#### pub fn last\_chunk\_mut<const N: usize\>(&mut self) -> Option<&mut \[T; N\]\>

Returns a mutable array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_chunk_mut::<2>() {
 last[0] = 10;
 last[1] = 20;
}
assert_eq!(x, &[0, 10, 20]);

assert_eq!(None, x.last_chunk_mut::<4>());
```

1.0.0 · Source

#### pub fn get<I>(&self, index: I) -> Option<&<I as SliceIndex<\[T\]\>>::Output\>

where I: SliceIndex<\[T\]\>,

Returns a reference to an element or subslice depending on the type of index.

* If given a position, returns a reference to the element at that position or `None` if out of bounds.
* If given a range, returns the subslice corresponding to that range, or `None` if out of bounds.

##### §Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&40), v.get(1));
assert_eq!(Some(&[10, 40][..]), v.get(0..2));
assert_eq!(None, v.get(3));
assert_eq!(None, v.get(0..4));
```

1.0.0 · Source

#### pub fn get\_mut<I>( &mut self, index: I, ) -> Option<&mut <I as SliceIndex<\[T\]\>>::Output\>

where I: SliceIndex<\[T\]\>,

Returns a mutable reference to an element or subslice depending on the type of index (see `get`) or `None` if the index is out of bounds.

##### §Examples

```
let x = &mut [0, 1, 2];

if let Some(elem) = x.get_mut(1) {
 *elem = 42;
}
assert_eq!(x, &[0, 42, 2]);
```

1.0.0 · Source

#### pub unsafe fn get\_unchecked<I>( &self, index: I, ) -> &<I as SliceIndex<\[T\]\>>::Output

where I: SliceIndex<\[T\]\>,

Returns a reference to an element or subslice, without doing bounds checking.

For a safe alternative see `get`.

##### §Safety

Calling this method with an out-of-bounds index is _undefined behavior_ even if the resulting reference is not used.

You can think of this like `.get(index).unwrap_unchecked()`. It’s UB to call `.get_unchecked(len)`, even if you immediately convert to a pointer. And it’s UB to call `.get_unchecked(..len + 1)`, `.get_unchecked(..=len)`, or similar.

##### §Examples

```
let x = &[1, 2, 4];

unsafe {
 assert_eq!(x.get_unchecked(1), &2);
}
```

1.0.0 · Source

#### pub unsafe fn get\_unchecked\_mut<I>( &mut self, index: I, ) -> &mut <I as SliceIndex<\[T\]\>>::Output

where I: SliceIndex<\[T\]\>,

Returns a mutable reference to an element or subslice, without doing bounds checking.

For a safe alternative see `get_mut`.

##### §Safety

Calling this method with an out-of-bounds index is _undefined behavior_ even if the resulting reference is not used.

You can think of this like `.get_mut(index).unwrap_unchecked()`. It’s UB to call `.get_unchecked_mut(len)`, even if you immediately convert to a pointer. And it’s UB to call `.get_unchecked_mut(..len + 1)`, `.get_unchecked_mut(..=len)`, or similar.

##### §Examples

```
let x = &mut [1, 2, 4];

unsafe {
 let elem = x.get_unchecked_mut(1);
 *elem = 13;
}
assert_eq!(x, &[1, 13, 4]);
```

1.0.0 · Source

#### pub fn as\_ptr(&self) -> \*const T

Returns a raw pointer to the slice’s buffer.

The caller must ensure that the slice outlives the pointer this function returns, or else it will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to is never written to (except inside an `UnsafeCell`) using this pointer or any pointer derived from it. If you need to mutate the contents of the slice, use `as_mut_ptr`.

Modifying the container referenced by this slice may cause its buffer to be reallocated, which would also make any pointers to it invalid.

##### §Examples

```
let x = &[1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
 for i in 0..x.len() {
 assert_eq!(x.get_unchecked(i), &*x_ptr.add(i));
 }
}
```

1.0.0 · Source

#### pub fn as\_mut\_ptr(&mut self) -> \*mut T

Returns an unsafe mutable pointer to the slice’s buffer.

The caller must ensure that the slice outlives the pointer this function returns, or else it will end up dangling.

Modifying the container referenced by this slice may cause its buffer to be reallocated, which would also make any pointers to it invalid.

##### §Examples

```
let x = &mut [1, 2, 4];
let x_ptr = x.as_mut_ptr();

unsafe {
 for i in 0..x.len() {
 *x_ptr.add(i) += 2;
 }
}
assert_eq!(x, &[3, 4, 6]);
```

1.48.0 · Source

#### pub fn as\_ptr\_range(&self) -> Range<\*const T\> ⓘ

Returns the two raw pointers spanning the slice.

The returned range is half-open, which means that the end pointer points _one past_ the last element of the slice. This way, an empty slice is represented by two equal pointers, and the difference between the two pointers represents the size of the slice.

See `as_ptr` for warnings on using these pointers. The end pointer requires extra caution, as it does not point to a valid element in the slice.

This function is useful for interacting with foreign interfaces which use two pointers to refer to a range of elements in memory, as is common in C++.

It can also be useful to check if a pointer to an element refers to an element of this slice:

```
let a = [1, 2, 3];
let x = &a[1] as *const _;
let y = &5 as *const _;

assert!(a.as_ptr_range().contains(&x));
assert!(!a.as_ptr_range().contains(&y));
```

1.48.0 · Source

#### pub fn as\_mut\_ptr\_range(&mut self) -> Range<\*mut T\> ⓘ

Returns the two unsafe mutable pointers spanning the slice.

The returned range is half-open, which means that the end pointer points _one past_ the last element of the slice. This way, an empty slice is represented by two equal pointers, and the difference between the two pointers represents the size of the slice.

See `as_mut_ptr` for warnings on using these pointers. The end pointer requires extra caution, as it does not point to a valid element in the slice.

This function is useful for interacting with foreign interfaces which use two pointers to refer to a range of elements in memory, as is common in C++.

1.93.0 · Source

#### pub fn as\_array<const N: usize\>(&self) -> Option<&\[T; N\]\>

Gets a reference to the underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

1.93.0 · Source

#### pub fn as\_mut\_array<const N: usize\>(&mut self) -> Option<&mut \[T; N\]\>

Gets a mutable reference to the slice’s underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

1.0.0 · Source

#### pub fn swap(&mut self, a: usize, b: usize)

Swaps two elements in the slice.

If `a` equals to `b`, it’s guaranteed that elements won’t change value.

##### §Arguments

* a - The index of the first element
* b - The index of the second element

##### §Panics

Panics if `a` or `b` are out of bounds.

##### §Examples

```
let mut v = ["a", "b", "c", "d", "e"];
v.swap(2, 4);
assert!(v == ["a", "b", "e", "d", "c"]);
```

Source

#### pub unsafe fn swap\_unchecked(&mut self, a: usize, b: usize)

🔬This is a nightly-only experimental API. (`slice_swap_unchecked` #88539)

Swaps two elements in the slice, without doing bounds checking.

For a safe alternative see `swap`.

##### §Arguments

* a - The index of the first element
* b - The index of the second element

##### §Safety

Calling this method with an out-of-bounds index is _undefined behavior_. The caller has to ensure that `a < self.len()` and `b < self.len()`.

##### §Examples

```
#![feature(slice_swap_unchecked)]

let mut v = ["a", "b", "c", "d"];
unsafe { v.swap_unchecked(1, 3) };
assert!(v == ["a", "d", "c", "b"]);
```

1.0.0 · Source

#### pub fn reverse(&mut self)

Reverses the order of elements in the slice, in place.

##### §Examples

```
let mut v = [1, 2, 3];
v.reverse();
assert!(v == [3, 2, 1]);
```

1.0.0 · Source

#### pub fn iter(&self) -> Iter<'\_, T> ⓘ

Returns an iterator over the slice.

The iterator yields all items from start to end.

##### §Examples

```
let x = &[1, 2, 4];
let mut iterator = x.iter();

assert_eq!(iterator.next(), Some(&1));
assert_eq!(iterator.next(), Some(&2));
assert_eq!(iterator.next(), Some(&4));
assert_eq!(iterator.next(), None);
```

1.0.0 · Source

#### pub fn iter\_mut(&mut self) -> IterMut<'\_, T> ⓘ

Returns an iterator that allows modifying each value.

The iterator yields all items from start to end.

##### §Examples

```
let x = &mut [1, 2, 4];
for elem in x.iter_mut() {
 *elem += 2;
}
assert_eq!(x, &[3, 4, 6]);
```

1.0.0 · Source

#### pub fn windows(&self, size: usize) -> Windows<'\_, T> ⓘ

Returns an iterator over all contiguous windows of length `size`. The windows overlap. If the slice is shorter than `size`, the iterator returns no values.

##### §Panics

Panics if `size` is zero.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.windows(3);
assert_eq!(iter.next().unwrap(), &['l', 'o', 'r']);
assert_eq!(iter.next().unwrap(), &['o', 'r', 'e']);
assert_eq!(iter.next().unwrap(), &['r', 'e', 'm']);
assert!(iter.next().is_none());
```

If the slice is shorter than `size`:

```
let slice = ['f', 'o', 'o'];
let mut iter = slice.windows(4);
assert!(iter.next().is_none());
```

Because the Iterator trait cannot represent the required lifetimes, there is no `windows_mut` analog to `windows`; `[0,1,2].windows_mut(2).collect()` would violate the rules of references (though a LendingIterator analog is possible). You can sometimes use `Cell::as_slice_of_cells` in conjunction with `windows` instead:

```
use std::cell::Cell;

let mut array = ['R', 'u', 's', 't', ' ', '2', '0', '1', '5'];
let slice = &mut array[..];
let slice_of_cells: &[Cell<char>] = Cell::from_mut(slice).as_slice_of_cells();
for w in slice_of_cells.windows(3) {
 Cell::swap(&w[0], &w[2]);
}
assert_eq!(array, ['s', 't', ' ', '2', '0', '1', '5', 'u', 'R']);
```

1.0.0 · Source

#### pub fn chunks(&self, chunk\_size: usize) -> Chunks<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See `chunks_exact` for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and `rchunks` for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert_eq!(iter.next().unwrap(), &['m']);
assert!(iter.next().is_none());
```

1.0.0 · Source

#### pub fn chunks\_mut(&mut self, chunk\_size: usize) -> ChunksMut<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See `chunks_exact_mut` for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and `rchunks_mut` for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks_mut` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.chunks_mut(2) {
 for elem in chunk.iter_mut() {
 *elem += count;
 }
 count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 3]);
```

1.31.0 · Source

#### pub fn chunks\_exact(&self, chunk\_size: usize) -> ChunksExact<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of `chunks`.

See `chunks` for a variant of this iterator that also returns the remainder as a smaller chunk, and `rchunks_exact` for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['m']);
```

1.31.0 · Source

#### pub fn chunks\_exact\_mut(&mut self, chunk\_size: usize) -> ChunksExactMut<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of `chunks_mut`.

See `chunks_mut` for a variant of this iterator that also returns the remainder as a smaller chunk, and `rchunks_exact_mut` for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks_mut` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.chunks_exact_mut(2) {
 for elem in chunk.iter_mut() {
 *elem += count;
 }
 count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 0]);
```

1.88.0 · Source

#### pub unsafe fn as\_chunks\_unchecked<const N: usize\>(&self) -> &\[\[T; N\]\]

Splits the slice into a slice of `N`\-element arrays, assuming that there’s no remainder.

This is the inverse operation to `as_flattened`.

As this is `unsafe`, consider whether you could use `as_chunks` or `as_rchunks` instead, perhaps via something like `if let (chunks, []) = slice.as_chunks()` or `let (chunks, []) = slice.as_chunks() else { unreachable!() };`.

##### §Safety

This may only be called when

* The slice splits exactly into `N`\-element chunks (aka `self.len() % N == 0`).
* `N != 0`.

##### §Examples

```
let slice: &[char] = &['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &[[char; 1]] =
 unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &[[char; 3]] =
 unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l', 'o', 'r'], ['e', 'm', '!']]);

```

1.88.0 · Source

#### pub fn as\_chunks<const N: usize\>(&self) -> (&\[\[T; N\]\], &\[T\])

Splits the slice into a slice of `N`\-element arrays, starting at the beginning of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (chunks, remainder) = slice.as_chunks()`, then:

* `chunks.len()` equals `slice.len() / N`,
* `remainder.len()` equals `slice.len() % N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened`.

##### §Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let (chunks, remainder) = slice.as_chunks();
assert_eq!(chunks, &[['l', 'o'], ['r', 'e']]);
assert_eq!(remainder, &['m']);
```

If you expect the slice to be an exact multiple, you can combine `let`\-`else` with an empty slice pattern:

```
let slice = ['R', 'u', 's', 't'];
let (chunks, []) = slice.as_chunks::<2>() else {
 panic!("slice didn't have even length")
};
assert_eq!(chunks, &[['R', 'u'], ['s', 't']]);
```

1.88.0 · Source

#### pub fn as\_rchunks<const N: usize\>(&self) -> (&\[T\], &\[\[T; N\]\])

Splits the slice into a slice of `N`\-element arrays, starting at the end of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (remainder, chunks) = slice.as_rchunks()`, then:

* `remainder.len()` equals `slice.len() % N`,
* `chunks.len()` equals `slice.len() / N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened`.

##### §Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let (remainder, chunks) = slice.as_rchunks();
assert_eq!(remainder, &['l']);
assert_eq!(chunks, &[['o', 'r'], ['e', 'm']]);
```

1.88.0 · Source

#### pub unsafe fn as\_chunks\_unchecked\_mut<const N: usize\>( &mut self, ) -> &mut \[\[T; N\]\]

Splits the slice into a slice of `N`\-element arrays, assuming that there’s no remainder.

This is the inverse operation to `as_flattened_mut`.

As this is `unsafe`, consider whether you could use `as_chunks_mut` or `as_rchunks_mut` instead, perhaps via something like `if let (chunks, []) = slice.as_chunks_mut()` or `let (chunks, []) = slice.as_chunks_mut() else { unreachable!() };`.

##### §Safety

This may only be called when

* The slice splits exactly into `N`\-element chunks (aka `self.len() % N == 0`).
* `N != 0`.

##### §Examples

```
let slice: &mut [char] = &mut ['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &mut [[char; 1]] =
 unsafe { slice.as_chunks_unchecked_mut() };
chunks[0] = ['L'];
assert_eq!(chunks, &[['L'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &mut [[char; 3]] =
 unsafe { slice.as_chunks_unchecked_mut() };
chunks[1] = ['a', 'x', '?'];
assert_eq!(slice, &['L', 'o', 'r', 'a', 'x', '?']);

```

1.88.0 · Source

#### pub fn as\_chunks\_mut<const N: usize\>(&mut self) -> (&mut \[\[T; N\]\], &mut \[T\])

Splits the slice into a slice of `N`\-element arrays, starting at the beginning of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (chunks, remainder) = slice.as_chunks_mut()`, then:

* `chunks.len()` equals `slice.len() / N`,
* `remainder.len()` equals `slice.len() % N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened_mut`.

##### §Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

let (chunks, remainder) = v.as_chunks_mut();
remainder[0] = 9;
for chunk in chunks {
 *chunk = [count; 2];
 count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 9]);
```

1.88.0 · Source

#### pub fn as\_rchunks\_mut<const N: usize\>(&mut self) -> (&mut \[T\], &mut \[\[T; N\]\])

Splits the slice into a slice of `N`\-element arrays, starting at the end of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (remainder, chunks) = slice.as_rchunks_mut()`, then:

* `remainder.len()` equals `slice.len() % N`,
* `chunks.len()` equals `slice.len() / N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened_mut`.

##### §Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

let (remainder, chunks) = v.as_rchunks_mut();
remainder[0] = 9;
for chunk in chunks {
 *chunk = [count; 2];
 count += 1;
}
assert_eq!(v, &[9, 1, 1, 2, 2]);
```

1.94.0 · Source

#### pub fn array\_windows<const N: usize\>(&self) -> ArrayWindows<'\_, T, N> ⓘ

Returns an iterator over overlapping windows of `N` elements of a slice, starting at the beginning of the slice.

This is the const generic equivalent of `windows`.

If `N` is greater than the size of the slice, it will return no windows.

##### §Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### §Examples

```
let slice = [0, 1, 2, 3];
let mut iter = slice.array_windows();
assert_eq!(iter.next().unwrap(), &[0, 1]);
assert_eq!(iter.next().unwrap(), &[1, 2]);
assert_eq!(iter.next().unwrap(), &[2, 3]);
assert!(iter.next().is_none());
```

1.31.0 · Source

#### pub fn rchunks(&self, chunk\_size: usize) -> RChunks<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See `rchunks_exact` for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and `chunks` for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert_eq!(iter.next().unwrap(), &['l']);
assert!(iter.next().is_none());
```

1.31.0 · Source

#### pub fn rchunks\_mut(&mut self, chunk\_size: usize) -> RChunksMut<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See `rchunks_exact_mut` for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and `chunks_mut` for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks_mut` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.rchunks_mut(2) {
 for elem in chunk.iter_mut() {
 *elem += count;
 }
 count += 1;
}
assert_eq!(v, &[3, 2, 2, 1, 1]);
```

1.31.0 · Source

#### pub fn rchunks\_exact(&self, chunk\_size: usize) -> RChunksExact<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of `rchunks`.

See `rchunks` for a variant of this iterator that also returns the remainder as a smaller chunk, and `chunks_exact` for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['l']);
```

1.31.0 · Source

#### pub fn rchunks\_exact\_mut(&mut self, chunk\_size: usize) -> RChunksExactMut<'\_, T> ⓘ

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of `chunks_mut`.

See `rchunks_mut` for a variant of this iterator that also returns the remainder as a smaller chunk, and `chunks_exact_mut` for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks_mut` instead, which will give references to arrays of exactly that length, rather than slices.

##### §Panics

Panics if `chunk_size` is zero.

##### §Examples

```
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.rchunks_exact_mut(2) {
 for elem in chunk.iter_mut() {
 *elem += count;
 }
 count += 1;
}
assert_eq!(v, &[0, 2, 2, 1, 1]);
```

1.77.0 · Source

#### pub fn chunk\_by<F>(&self, pred: F) -> ChunkBy<'\_, T, F> ⓘ

where F: FnMut(&T, &T) -> bool,

Returns an iterator over the slice producing non-overlapping runs of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements, meaning that it is called on `slice[0]` and `slice[1]`, followed by `slice[1]` and `slice[2]`, and so on.

##### §Examples

```
let slice = &[1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by(|a, b| a == b);

assert_eq!(iter.next(), Some(&[1, 1, 1][..]));
assert_eq!(iter.next(), Some(&[3, 3][..]));
assert_eq!(iter.next(), Some(&[2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```
let slice = &[1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by(|a, b| a <= b);

assert_eq!(iter.next(), Some(&[1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

1.77.0 · Source

#### pub fn chunk\_by\_mut<F>(&mut self, pred: F) -> ChunkByMut<'\_, T, F> ⓘ

where F: FnMut(&T, &T) -> bool,

Returns an iterator over the slice producing non-overlapping mutable runs of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements, meaning that it is called on `slice[0]` and `slice[1]`, followed by `slice[1]` and `slice[2]`, and so on.

##### §Examples

```
let slice = &mut [1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by_mut(|a, b| a == b);

assert_eq!(iter.next(), Some(&mut [1, 1, 1][..]));
assert_eq!(iter.next(), Some(&mut [3, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```
let slice = &mut [1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by_mut(|a, b| a <= b);

assert_eq!(iter.next(), Some(&mut [1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

1.0.0 · Source

#### pub fn split\_at(&self, mid: usize) -> (&\[T\], &\[T\])

Divides one slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

##### §Panics

Panics if `mid > len`. For a non-panicking alternative see `split_at_checked`.

##### §Examples

```
let v = ['a', 'b', 'c'];

{
 let (left, right) = v.split_at(0);
 assert_eq!(left, []);
 assert_eq!(right, ['a', 'b', 'c']);
}

{
 let (left, right) = v.split_at(2);
 assert_eq!(left, ['a', 'b']);
 assert_eq!(right, ['c']);
}

{
 let (left, right) = v.split_at(3);
 assert_eq!(left, ['a', 'b', 'c']);
 assert_eq!(right, []);
}
```

1.0.0 · Source

#### pub fn split\_at\_mut(&mut self, mid: usize) -> (&mut \[T\], &mut \[T\])

Divides one mutable slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

##### §Panics

Panics if `mid > len`. For a non-panicking alternative see `split_at_mut_checked`.

##### §Examples

```
let mut v = [1, 0, 3, 0, 5, 6];
let (left, right) = v.split_at_mut(2);
assert_eq!(left, [1, 0]);
assert_eq!(right, [3, 0, 5, 6]);
left[1] = 2;
right[1] = 4;
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

1.79.0 · Source

#### pub unsafe fn split\_at\_unchecked(&self, mid: usize) -> (&\[T\], &\[T\])

Divides one slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see `split_at`.

##### §Safety

Calling this method with an out-of-bounds index is _undefined behavior_ even if the resulting reference is not used. The caller has to ensure that `0 <= mid <= self.len()`.

##### §Examples

```
let v = ['a', 'b', 'c'];

unsafe {
 let (left, right) = v.split_at_unchecked(0);
 assert_eq!(left, []);
 assert_eq!(right, ['a', 'b', 'c']);
}

unsafe {
 let (left, right) = v.split_at_unchecked(2);
 assert_eq!(left, ['a', 'b']);
 assert_eq!(right, ['c']);
}

unsafe {
 let (left, right) = v.split_at_unchecked(3);
 assert_eq!(left, ['a', 'b', 'c']);
 assert_eq!(right, []);
}
```

1.79.0 · Source

#### pub unsafe fn split\_at\_mut\_unchecked( &mut self, mid: usize, ) -> (&mut \[T\], &mut \[T\])

Divides one mutable slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see `split_at_mut`.

##### §Safety

Calling this method with an out-of-bounds index is _undefined behavior_ even if the resulting reference is not used. The caller has to ensure that `0 <= mid <= self.len()`.

##### §Examples

```
let mut v = [1, 0, 3, 0, 5, 6];
unsafe {
 let (left, right) = v.split_at_mut_unchecked(2);
 assert_eq!(left, [1, 0]);
 assert_eq!(right, [3, 0, 5, 6]);
 left[1] = 2;
 right[1] = 4;
}
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

1.80.0 · Source

#### pub fn split\_at\_checked(&self, mid: usize) -> Option<(&\[T\], &\[T\])>

Divides one slice into two at an index, returning `None` if the slice is too short.

If `mid ≤ len` returns a pair of slices where the first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

Otherwise, if `mid > len`, returns `None`.

##### §Examples

```
let v = [1, -2, 3, -4, 5, -6];

{
 let (left, right) = v.split_at_checked(0).unwrap();
 assert_eq!(left, []);
 assert_eq!(right, [1, -2, 3, -4, 5, -6]);
}

{
 let (left, right) = v.split_at_checked(2).unwrap();
 assert_eq!(left, [1, -2]);
 assert_eq!(right, [3, -4, 5, -6]);
}

{
 let (left, right) = v.split_at_checked(6).unwrap();
 assert_eq!(left, [1, -2, 3, -4, 5, -6]);
 assert_eq!(right, []);
}

assert_eq!(None, v.split_at_checked(7));
```

1.80.0 · Source

#### pub fn split\_at\_mut\_checked( &mut self, mid: usize, ) -> Option<(&mut \[T\], &mut \[T\])>

Divides one mutable slice into two at an index, returning `None` if the slice is too short.

If `mid ≤ len` returns a pair of slices where the first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

Otherwise, if `mid > len`, returns `None`.

##### §Examples

```
let mut v = [1, 0, 3, 0, 5, 6];

if let Some((left, right)) = v.split_at_mut_checked(2) {
 assert_eq!(left, [1, 0]);
 assert_eq!(right, [3, 0, 5, 6]);
 left[1] = 2;
 right[1] = 4;
}
assert_eq!(v, [1, 2, 3, 4, 5, 6]);

assert_eq!(None, v.split_at_mut_checked(7));
```

1.0.0 · Source

#### pub fn split<F>(&self, pred: F) -> Split<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred`. The matched element is not contained in the subslices.

##### §Examples

```
let slice = [10, 40, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

If the first element is matched, an empty slice will be the first item returned by the iterator. Similarly, if the last element in the slice is matched, an empty slice will be the last item returned by the iterator:

```
let slice = [10, 40, 33];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[]);
assert!(iter.next().is_none());
```

If two matched elements are directly adjacent, an empty slice will be present between them:

```
let slice = [10, 6, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10]);
assert_eq!(iter.next().unwrap(), &[]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

1.0.0 · Source

#### pub fn split\_mut<F>(&mut self, pred: F) -> SplitMut<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over mutable subslices separated by elements that match `pred`. The matched element is not contained in the subslices.

##### §Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_mut(|num| *num % 3 == 0) {
 group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 1]);
```

1.51.0 · Source

#### pub fn split\_inclusive<F>(&self, pred: F) -> SplitInclusive<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred`. The matched element is contained in the end of the previous subslice as a terminator.

##### §Examples

```
let slice = [10, 40, 33, 20];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

If the last element of the slice is matched, that element will be considered the terminator of the preceding slice. That slice will be the last item returned by the iterator.

```
let slice = [3, 10, 40, 33];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[3]);
assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert!(iter.next().is_none());
```

1.51.0 · Source

#### pub fn split\_inclusive\_mut<F>(&mut self, pred: F) -> SplitInclusiveMut<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over mutable subslices separated by elements that match `pred`. The matched element is contained in the previous subslice as a terminator.

##### §Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_inclusive_mut(|num| *num % 3 == 0) {
 let terminator_idx = group.len()-1;
 group[terminator_idx] = 1;
}
assert_eq!(v, [10, 40, 1, 20, 1, 1]);
```

1.27.0 · Source

#### pub fn rsplit<F>(&self, pred: F) -> RSplit<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred`, starting at the end of the slice and working backwards. The matched element is not contained in the subslices.

##### §Examples

```
let slice = [11, 22, 33, 0, 44, 55];
let mut iter = slice.rsplit(|num| *num == 0);

assert_eq!(iter.next().unwrap(), &[44, 55]);
assert_eq!(iter.next().unwrap(), &[11, 22, 33]);
assert_eq!(iter.next(), None);
```

As with `split()`, if the first or last element is matched, an empty slice will be the first (or last) item returned by the iterator.

```
let v = &[0, 1, 1, 2, 3, 5, 8];
let mut it = v.rsplit(|n| *n % 2 == 0);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next().unwrap(), &[3, 5]);
assert_eq!(it.next().unwrap(), &[1, 1]);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next(), None);
```

1.27.0 · Source

#### pub fn rsplit\_mut<F>(&mut self, pred: F) -> RSplitMut<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over mutable subslices separated by elements that match `pred`, starting at the end of the slice and working backwards. The matched element is not contained in the subslices.

##### §Examples

```
let mut v = [100, 400, 300, 200, 600, 500];

let mut count = 0;
for group in v.rsplit_mut(|num| *num % 3 == 0) {
 count += 1;
 group[0] = count;
}
assert_eq!(v, [3, 400, 300, 2, 600, 1]);
```

1.0.0 · Source

#### pub fn splitn<F>(&self, n: usize, pred: F) -> SplitN<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred`, limited to returning at most `n` items. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### §Examples

Print the slice split once by numbers divisible by 3 (i.e., `[10, 40]`, `[20, 60, 50]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.splitn(2, |num| *num % 3 == 0) {
 println!("{group:?}");
}
```

1.0.0 · Source

#### pub fn splitn\_mut<F>(&mut self, n: usize, pred: F) -> SplitNMut<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over mutable subslices separated by elements that match `pred`, limited to returning at most `n` items. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### §Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.splitn_mut(2, |num| *num % 3 == 0) {
 group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 50]);
```

1.0.0 · Source

#### pub fn rsplitn<F>(&self, n: usize, pred: F) -> RSplitN<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred` limited to returning at most `n` items. This starts at the end of the slice and works backwards. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### §Examples

Print the slice split once, starting from the end, by numbers divisible by 3 (i.e., `[50]`, `[10, 40, 30, 20]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.rsplitn(2, |num| *num % 3 == 0) {
 println!("{group:?}");
}
```

1.0.0 · Source

#### pub fn rsplitn\_mut<F>(&mut self, n: usize, pred: F) -> RSplitNMut<'\_, T, F> ⓘ

where F: FnMut(&T) -> bool,

Returns an iterator over subslices separated by elements that match `pred` limited to returning at most `n` items. This starts at the end of the slice and works backwards. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### §Examples

```
let mut s = [10, 40, 30, 20, 60, 50];

for group in s.rsplitn_mut(2, |num| *num % 3 == 0) {
 group[0] = 1;
}
assert_eq!(s, [1, 40, 30, 20, 60, 1]);
```

Source

#### pub fn split\_once<F>(&self, pred: F) -> Option<(&\[T\], &\[T\])>

where F: FnMut(&T) -> bool,

🔬This is a nightly-only experimental API. (`slice_split_once` #112811)

Splits the slice on the first element that matches the specified predicate.

If any matching elements are present in the slice, returns the prefix before the match and suffix after. The matching element itself is not included. If no elements match, returns `None`.

##### §Examples

```
#![feature(slice_split_once)]
let s = [1, 2, 3, 2, 4];
assert_eq!(s.split_once(|&x| x == 2), Some((
 &[1][..],
 &[3, 2, 4][..]
)));
assert_eq!(s.split_once(|&x| x == 0), None);
```

Source

#### pub fn rsplit\_once<F>(&self, pred: F) -> Option<(&\[T\], &\[T\])>

where F: FnMut(&T) -> bool,

🔬This is a nightly-only experimental API. (`slice_split_once` #112811)

Splits the slice on the last element that matches the specified predicate.

If any matching elements are present in the slice, returns the prefix before the match and suffix after. The matching element itself is not included. If no elements match, returns `None`.

##### §Examples

```
#![feature(slice_split_once)]
let s = [1, 2, 3, 2, 4];
assert_eq!(s.rsplit_once(|&x| x == 2), Some((
 &[1, 2, 3][..],
 &[4][..]
)));
assert_eq!(s.rsplit_once(|&x| x == 0), None);
```

1.0.0 · Source

#### pub fn contains(&self, x: &T) -> bool

where T: PartialEq,

Returns `true` if the slice contains an element with the given value.

This operation is _O_(_n_).

Note that if you have a sorted slice, `binary_search` may be faster.

##### §Examples

```
let v = [10, 40, 30];
assert!(v.contains(&30));
assert!(!v.contains(&50));
```

If you do not have a `&T`, but some other value that you can compare with one (for example, `String` implements `PartialEq<str>`), you can use `iter().any`:

```
let v = [String::from("hello"), String::from("world")]; assert!(v.iter().any(|e| e == "hello")); assert!(!v.iter().any(|e| e == "hi"));
```

1.0.0 · Source

#### pub fn starts\_with(&self, needle: &\[T\]) -> bool

where T: PartialEq,

Returns `true` if `needle` is a prefix of the slice or equal to the slice.

##### §Examples

```
let v = [10, 40, 30];
assert!(v.starts_with(&[10]));
assert!(v.starts_with(&[10, 40]));
assert!(v.starts_with(&v));
assert!(!v.starts_with(&[50]));
assert!(!v.starts_with(&[10, 50]));
```

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.starts_with(&[]));
let v: &[u8] = &[];
assert!(v.starts_with(&[]));
```

1.0.0 · Source

#### pub fn ends\_with(&self, needle: &\[T\]) -> bool

where T: PartialEq,

Returns `true` if `needle` is a suffix of the slice or equal to the slice.

##### §Examples

```
let v = [10, 40, 30];
assert!(v.ends_with(&[30]));
assert!(v.ends_with(&[40, 30]));
assert!(v.ends_with(&v));
assert!(!v.ends_with(&[50]));
assert!(!v.ends_with(&[50, 30]));
```

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.ends_with(&[]));
let v: &[u8] = &[];
assert!(v.ends_with(&[]));
```

1.51.0 · Source

#### pub fn strip\_prefix<P>(&self, prefix: &P) -> Option<&\[T\]\>

where P: SlicePattern<Item = T> + ?Sized, T: PartialEq,

Returns a subslice with the prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix, wrapped in `Some`. If `prefix` is empty, simply returns the original slice. If `prefix` is equal to the original slice, returns an empty slice.

If the slice does not start with `prefix`, returns `None`.

##### §Examples

```
let v = &[10, 40, 30];
assert_eq!(v.strip_prefix(&[10]), Some(&[40, 30][..]));
assert_eq!(v.strip_prefix(&[10, 40]), Some(&[30][..]));
assert_eq!(v.strip_prefix(&[10, 40, 30]), Some(&[][..]));
assert_eq!(v.strip_prefix(&[50]), None);
assert_eq!(v.strip_prefix(&[10, 50]), None);

let prefix : &str = "he";
assert_eq!(b"hello".strip_prefix(prefix.as_bytes()),
 Some(b"llo".as_ref()));
```

1.51.0 · Source

#### pub fn strip\_suffix<P>(&self, suffix: &P) -> Option<&\[T\]\>

where P: SlicePattern<Item = T> + ?Sized, T: PartialEq,

Returns a subslice with the suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix, wrapped in `Some`. If `suffix` is empty, simply returns the original slice. If `suffix` is equal to the original slice, returns an empty slice.

If the slice does not end with `suffix`, returns `None`.

##### §Examples

```
let v = &[10, 40, 30];
assert_eq!(v.strip_suffix(&[30]), Some(&[10, 40][..]));
assert_eq!(v.strip_suffix(&[40, 30]), Some(&[10][..]));
assert_eq!(v.strip_suffix(&[10, 40, 30]), Some(&[][..]));
assert_eq!(v.strip_suffix(&[50]), None);
assert_eq!(v.strip_suffix(&[50, 30]), None);
```

Source

#### pub fn strip\_circumfix<S, P>(&self, prefix: &P, suffix: &S) -> Option<&\[T\]\>

where T: PartialEq, S: SlicePattern<Item = T> + ?Sized, P: SlicePattern<Item = T> + ?Sized,

🔬This is a nightly-only experimental API. (`strip_circumfix` #147946)

Returns a subslice with the prefix and suffix removed.

If the slice starts with `prefix` and ends with `suffix`, returns the subslice after the prefix and before the suffix, wrapped in `Some`.

If the slice does not start with `prefix` or does not end with `suffix`, returns `None`.

##### §Examples

```
#![feature(strip_circumfix)]

let v = &[10, 50, 40, 30];
assert_eq!(v.strip_circumfix(&[10], &[30]), Some(&[50, 40][..]));
assert_eq!(v.strip_circumfix(&[10], &[40, 30]), Some(&[50][..]));
assert_eq!(v.strip_circumfix(&[10, 50], &[40, 30]), Some(&[][..]));
assert_eq!(v.strip_circumfix(&[50], &[30]), None);
assert_eq!(v.strip_circumfix(&[10], &[40]), None);
assert_eq!(v.strip_circumfix(&[], &[40, 30]), Some(&[10, 50][..]));
assert_eq!(v.strip_circumfix(&[10, 50], &[]), Some(&[40, 30][..]));
```

Source

#### pub fn trim\_prefix<P>(&self, prefix: &P) -> &\[T\]

where P: SlicePattern<Item = T> + ?Sized, T: PartialEq,

🔬This is a nightly-only experimental API. (`trim_prefix_suffix` #142312)

Returns a subslice with the optional prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix. If `prefix` is empty or the slice does not start with `prefix`, simply returns the original slice. If `prefix` is equal to the original slice, returns an empty slice.

##### §Examples

```
#![feature(trim_prefix_suffix)]

let v = &[10, 40, 30];

assert_eq!(v.trim_prefix(&[10]), &[40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 40]), &[30][..]);
assert_eq!(v.trim_prefix(&[10, 40, 30]), &[][..]);

assert_eq!(v.trim_prefix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 50]), &[10, 40, 30][..]);

let prefix : &str = "he";
assert_eq!(b"hello".trim_prefix(prefix.as_bytes()), b"llo".as_ref());
```

Source

#### pub fn trim\_suffix<P>(&self, suffix: &P) -> &\[T\]

where P: SlicePattern<Item = T> + ?Sized, T: PartialEq,

🔬This is a nightly-only experimental API. (`trim_prefix_suffix` #142312)

Returns a subslice with the optional suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix. If `suffix` is empty or the slice does not end with `suffix`, simply returns the original slice. If `suffix` is equal to the original slice, returns an empty slice.

##### §Examples

```
#![feature(trim_prefix_suffix)]

let v = &[10, 40, 30];

assert_eq!(v.trim_suffix(&[30]), &[10, 40][..]);
assert_eq!(v.trim_suffix(&[40, 30]), &[10][..]);
assert_eq!(v.trim_suffix(&[10, 40, 30]), &[][..]);

assert_eq!(v.trim_suffix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_suffix(&[50, 30]), &[10, 40, 30][..]);
```

1.0.0 · Source

#### pub fn binary\_search(&self, x: &T) -> Result<usize, usize\>

where T: Ord,

Binary searches this slice for a given element. If the slice is not sorted, the returned result is unspecified and meaningless.

If the value is found then `Result::Ok` is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then `Result::Err` is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also `binary_search_by`, `binary_search_by_key`, and `partition_point`.

##### §Examples

Looks up a series of four elements. The first is found, with a uniquely determined position; the second and third are not found; the fourth could match any position in `[1, 4]`.

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

assert_eq!(s.binary_search(&13), Ok(9));
assert_eq!(s.binary_search(&4), Err(7));
assert_eq!(s.binary_search(&100), Err(13));
let r = s.binary_search(&1);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

If you want to find that whole _range_ of matching items, rather than an arbitrary matching one, that can be done using `partition_point`:

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

let low = s.partition_point(|x| x < &1);
assert_eq!(low, 1);
let high = s.partition_point(|x| x <= &1);
assert_eq!(high, 5);
let r = s.binary_search(&1);
assert!((low..high).contains(&r.unwrap()));

assert!(s[..low].iter().all(|&x| x < 1));
assert!(s[low..high].iter().all(|&x| x == 1));
assert!(s[high..].iter().all(|&x| x > 1));

assert_eq!(s.partition_point(|x| x < &11), 9);
assert_eq!(s.partition_point(|x| x <= &11), 9);
assert_eq!(s.binary_search(&11), Err(9));
```

If you want to insert an item to a sorted vector, while maintaining sort order, consider using `partition_point`:

```
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

1.0.0 · Source

#### pub fn binary\_search\_by<'a, F>(&'a self, f: F) -> Result<usize, usize\>

where F: FnMut(&'a T) -> Ordering,

Binary searches this slice with a comparator function.

The comparator function should return an order code that indicates whether its argument is `Less`, `Equal` or `Greater` the desired target. If the slice is not sorted or if the comparator function does not implement an order consistent with the sort order of the underlying slice, the returned result is unspecified and meaningless.

If the value is found then `Result::Ok` is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then `Result::Err` is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also `binary_search`, `binary_search_by_key`, and `partition_point`.

##### §Examples

Looks up a series of four elements. The first is found, with a uniquely determined position; the second and third are not found; the fourth could match any position in `[1, 4]`.

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

let seek = 13;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Ok(9));
let seek = 4;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(7));
let seek = 100;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(13));
let seek = 1;
let r = s.binary_search_by(|probe| probe.cmp(&seek));
assert!(match r { Ok(1..=4) => true, _ => false, });
```

1.10.0 · Source

#### pub fn binary\_search\_by\_key<'a, B, F>( &'a self, b: &B, f: F, ) -> Result<usize, usize\>

where F: FnMut(&'a T) -> B, B: Ord,

Binary searches this slice with a key extraction function.

Assumes that the slice is sorted by the key, for instance with `sort_by_key` using the same key extraction function. If the slice is not sorted by the key, the returned result is unspecified and meaningless.

If the value is found then `Result::Ok` is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then `Result::Err` is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also `binary_search`, `binary_search_by`, and `partition_point`.

##### §Examples

Looks up a series of four elements in a slice of pairs sorted by their second elements. The first is found, with a uniquely determined position; the second and third are not found; the fourth could match any position in `[1, 4]`.

```
let s = [(0, 0), (2, 1), (4, 1), (5, 1), (3, 1),
 (1, 2), (2, 3), (4, 5), (5, 8), (3, 13),
 (1, 21), (2, 34), (4, 55)];

assert_eq!(s.binary_search_by_key(&13, |&(a, b)| b), Ok(9));
assert_eq!(s.binary_search_by_key(&4, |&(a, b)| b), Err(7));
assert_eq!(s.binary_search_by_key(&100, |&(a, b)| b), Err(13));
let r = s.binary_search_by_key(&1, |&(a, b)| b);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

1.20.0 · Source

#### pub fn sort\_unstable(&mut self)

where T: Ord,

Sorts the slice in ascending order **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of `Ord` for `T` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the `Ord` documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if the implementation of `Ord` for `T` panics.

Sorting types that only implement `PartialOrd` such as `f32` and `f64` require additional precautions. For example, `f32::NAN != f32::NAN`, which doesn’t fulfill the reflexivity requirement of `Ord`. By using an alternative comparison function with `slice::sort_unstable_by` such as `f32::total_cmp` or `f64::total_cmp` that defines a total order users can sort slices containing floating-point values. Alternatively, if all values in the slice are guaranteed to be in a subset for which `PartialOrd::partial_cmp` forms a total order, it’s possible to sort the slice with `sort_unstable_by(|a, b| a.partial_cmp(b).unwrap())`.

##### §Current implementation

The current implementation is based on ipnsort by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### §Panics

May panic if the implementation of `Ord` for `T` does not implement a total order, or if the `Ord` implementation panics.

##### §Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort_unstable();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

1.20.0 · Source

#### pub fn sort\_unstable\_by<F>(&mut self, compare: F)

where F: FnMut(&T, &T) -> Ordering,

Sorts the slice in ascending order with a comparison function, **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the comparison function `compare` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the `Ord` documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if `compare` panics.

##### §Current implementation

The current implementation is based on ipnsort by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### §Panics

May panic if the `compare` does not implement a total order, or if the `compare` itself panics.

##### §Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_unstable_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

v.sort_unstable_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

1.20.0 · Source

#### pub fn sort\_unstable\_by\_key<K, F>(&mut self, f: F)

where F: FnMut(&T) -> K, K: Ord,

Sorts the slice in ascending order with a key extraction function, **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of `Ord` for `K` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the `Ord` documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if the implementation of `Ord` for `K` panics.

##### §Current implementation

The current implementation is based on ipnsort by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### §Panics

May panic if the implementation of `Ord` for `K` does not implement a total order, or if the `Ord` implementation panics.

##### §Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_unstable_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

Source

#### pub fn partial\_sort\_unstable<R>(&mut self, range: R)

where T: Ord, R: RangeBounds<usize\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` #149046)

Partially sorts the slice in ascending order **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of `sort_unstable` for implementation notes.

##### §Panics

May panic if the implementation of `Ord` for `T` does not implement a total order, or if the `Ord` implementation panics, or if the specified range is out of bounds.

##### §Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4, -5, 1, -3, 2];

v.partial_sort_unstable(0..0);
assert_eq!(v, [4, -5, 1, -3, 2]);

v.partial_sort_unstable(2..2);
for i in 0..2 {
 assert!(v[i] <= v[2]);
}
for i in 3..v.len() {
 assert!(v[2] <= v[i]);
}

v.partial_sort_unstable(2..3);
for i in 0..2 {
 assert!(v[i] <= v[2]);
}
for i in 3..v.len() {
 assert!(v[2] <= v[i]);
}

v.partial_sort_unstable(1..4);
assert_eq!(&v[1..4], [-3, 1, 2]);

v.partial_sort_unstable(..);
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

Source

#### pub fn partial\_sort\_unstable\_by<F, R>(&mut self, range: R, compare: F)

where F: FnMut(&T, &T) -> Ordering, R: RangeBounds<usize\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` #149046)

Partially sorts the slice in ascending order with a comparison function, **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of `sort_unstable_by` for implementation notes.

##### §Panics

May panic if the `compare` does not implement a total order, or if the `compare` itself panics, or if the specified range is out of bounds.

##### §Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4, -5, 1, -3, 2];

v.partial_sort_unstable_by(0..0, |a, b| b.cmp(a));
assert_eq!(v, [4, -5, 1, -3, 2]);

v.partial_sort_unstable_by(2..2, |a, b| b.cmp(a));
for i in 0..2 {
 assert!(v[i] >= v[2]);
}
for i in 3..v.len() {
 assert!(v[2] >= v[i]);
}

v.partial_sort_unstable_by(2..3, |a, b| b.cmp(a));
for i in 0..2 {
 assert!(v[i] >= v[2]);
}
for i in 3..v.len() {
 assert!(v[2] >= v[i]);
}

v.partial_sort_unstable_by(1..4, |a, b| b.cmp(a));
assert_eq!(&v[1..4], [2, 1, -3]);

v.partial_sort_unstable_by(.., |a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

Source

#### pub fn partial\_sort\_unstable\_by\_key<K, F, R>(&mut self, range: R, f: F)

where F: FnMut(&T) -> K, K: Ord, R: RangeBounds<usize\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` #149046)

Partially sorts the slice in ascending order with a key extraction function, **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of `sort_unstable_by_key` for implementation notes.

##### §Panics

May panic if the implementation of `Ord` for `K` does not implement a total order, or if the `Ord` implementation panics, or if the specified range is out of bounds.

##### §Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4i32, -5, 1, -3, 2];

v.partial_sort_unstable_by_key(0..0, |k| k.abs());
assert_eq!(v, [4, -5, 1, -3, 2]);

v.partial_sort_unstable_by_key(2..2, |k| k.abs());
for i in 0..2 {
 assert!(v[i].abs() <= v[2].abs());
}
for i in 3..v.len() {
 assert!(v[2].abs() <= v[i].abs());
}

v.partial_sort_unstable_by_key(2..3, |k| k.abs());
for i in 0..2 {
 assert!(v[i].abs() <= v[2].abs());
}
for i in 3..v.len() {
 assert!(v[2].abs() <= v[i].abs());
}

v.partial_sort_unstable_by_key(1..4, |k| k.abs());
assert_eq!(&v[1..4], [2, -3, 4]);

v.partial_sort_unstable_by_key(.., |k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

1.49.0 · Source

#### pub fn select\_nth\_unstable( &mut self, index: usize, ) -> (&mut \[T\], &mut T, &mut \[T\])

where T: Ord,

Reorders the slice such that the element at `index` is at a sort-order position. All elements before `index` will be `<=` to this value, and all elements after will be `>=` to it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple that partitions the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `x <= self[index]`.
 
* The element at `index`.
 
* The unsorted subslice after `index`, whose elements all satisfy `x >= self[index]`.

##### §Current implementation

The current algorithm is an introselect implementation based on ipnsort by Lukas Bergdoll and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### §Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if the implementation of `Ord` for `T` does not implement a total order.

##### §Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

let (lesser, median, greater) = v.select_nth_unstable(2);

assert!(lesser == [-3, -5] || lesser == [-5, -3]);
assert_eq!(median, &mut 1);
assert!(greater == [4, 2] || greater == [2, 4]);

assert!(v == [-3, -5, 1, 2, 4] ||
 v == [-5, -3, 1, 2, 4] ||
 v == [-3, -5, 1, 4, 2] ||
 v == [-5, -3, 1, 4, 2]);
```

1.49.0 · Source

#### pub fn select\_nth\_unstable\_by<F>( &mut self, index: usize, compare: F, ) -> (&mut \[T\], &mut T, &mut \[T\])

where F: FnMut(&T, &T) -> Ordering,

Reorders the slice with a comparator function such that the element at `index` is at a sort-order position. All elements before `index` will be `<=` to this value, and all elements after will be `>=` to it, according to the comparator function.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `compare(x, self[index]).is_le()`.
 
* The element at `index`.
 
* The unsorted subslice after `index`, whose elements all satisfy `compare(x, self[index]).is_ge()`.

##### §Current implementation

The current algorithm is an introselect implementation based on ipnsort by Lukas Bergdoll and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### §Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if `compare` does not implement a total order.

##### §Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

let (before, median, after) = v.select_nth_unstable_by(2, |a, b| b.cmp(a));

assert!(before == [4, 2] || before == [2, 4]);
assert_eq!(median, &mut 1);
assert!(after == [-3, -5] || after == [-5, -3]);

assert!(v == [2, 4, 1, -5, -3] ||
 v == [2, 4, 1, -3, -5] ||
 v == [4, 2, 1, -5, -3] ||
 v == [4, 2, 1, -3, -5]);
```

1.49.0 · Source

#### pub fn select\_nth\_unstable\_by\_key<K, F>( &mut self, index: usize, f: F, ) -> (&mut \[T\], &mut T, &mut \[T\])

where F: FnMut(&T) -> K, K: Ord,

Reorders the slice with a key extraction function such that the element at `index` is at a sort-order position. All elements before `index` will have keys `<=` to the key at `index`, and all elements after will have keys `>=` to it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `f(x) <= f(self[index])`.
 
* The element at `index`.
 
* The unsorted subslice after `index`, whose elements all satisfy `f(x) >= f(self[index])`.

##### §Current implementation

The current algorithm is an introselect implementation based on ipnsort by Lukas Bergdoll and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### §Panics

Panics when `index >= len()`, meaning it always panics on empty slices.

May panic if `K: Ord` does not implement a total order.

##### §Examples

```
let mut v = [-5i32, 4, 1, -3, 2];

let (lesser, median, greater) = v.select_nth_unstable_by_key(2, |a| a.abs());

assert!(lesser == [1, 2] || lesser == [2, 1]);
assert_eq!(median, &mut -3);
assert!(greater == [4, -5] || greater == [-5, 4]);

assert!(v == [1, 2, -3, 4, -5] ||
 v == [1, 2, -3, -5, 4] ||
 v == [2, 1, -3, 4, -5] ||
 v == [2, 1, -3, -5, 4]);
```

Source

#### pub fn partition\_dedup(&mut self) -> (&mut \[T\], &mut \[T\])

where T: PartialEq,

🔬This is a nightly-only experimental API. (`slice_partition_dedup` #54279)

Moves all consecutive repeated elements to the end of the slice according to the `PartialEq` trait implementation.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

If the slice is sorted, the first returned slice contains no duplicates.

##### §Examples

```
#![feature(slice_partition_dedup)]

let mut slice = [1, 2, 2, 3, 3, 2, 1, 1];

let (dedup, duplicates) = slice.partition_dedup();

assert_eq!(dedup, [1, 2, 3, 2, 1]);
assert_eq!(duplicates, [2, 3, 1]);
```

Source

#### pub fn partition\_dedup\_by<F>(&mut self, same\_bucket: F) -> (&mut \[T\], &mut \[T\])

where F: FnMut(&mut T, &mut T) -> bool,

🔬This is a nightly-only experimental API. (`slice_partition_dedup` #54279)

Moves all but the first of consecutive elements to the end of the slice satisfying a given equality relation.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

The `same_bucket` function is passed references to two elements from the slice and must determine if the elements compare equal. The elements are passed in opposite order from their order in the slice, so if `same_bucket(a, b)` returns `true`, `a` is moved at the end of the slice.

If the slice is sorted, the first returned slice contains no duplicates.

##### §Examples

```
#![feature(slice_partition_dedup)]

let mut slice = ["foo", "Foo", "BAZ", "Bar", "bar", "baz", "BAZ"];

let (dedup, duplicates) = slice.partition_dedup_by(|a, b| a.eq_ignore_ascii_case(b));

assert_eq!(dedup, ["foo", "BAZ", "Bar", "baz"]);
assert_eq!(duplicates, ["bar", "Foo", "BAZ"]);
```

Source

#### pub fn partition\_dedup\_by\_key<K, F>(&mut self, key: F) -> (&mut \[T\], &mut \[T\])

where F: FnMut(&mut T) -> K, K: PartialEq,

🔬This is a nightly-only experimental API. (`slice_partition_dedup` #54279)

Moves all but the first of consecutive elements to the end of the slice that resolve to the same key.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

If the slice is sorted, the first returned slice contains no duplicates.

##### §Examples

```
#![feature(slice_partition_dedup)]

let mut slice = [10, 20, 21, 30, 30, 20, 11, 13];

let (dedup, duplicates) = slice.partition_dedup_by_key(|i| *i / 10);

assert_eq!(dedup, [10, 20, 30, 20, 11]);
assert_eq!(duplicates, [21, 30, 13]);
```

1.26.0 · Source

#### pub fn rotate\_left(&mut self, mid: usize)

Rotates the slice in-place such that the first `mid` elements of the slice move to the end while the last `self.len() - mid` elements move to the front.

After calling `rotate_left`, the element previously at index `mid` will become the first element in the slice.

##### §Panics

This function will panic if `mid` is greater than the length of the slice. Note that `mid == self.len()` does _not_ panic and is a no-op rotation.

##### §Complexity

Takes linear (in `self.len()`) time.

##### §Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_left(2);
assert_eq!(a, ['c', 'd', 'e', 'f', 'a', 'b']);
```

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_left(1);
assert_eq!(a, ['a', 'c', 'd', 'e', 'b', 'f']);
```

1.26.0 · Source

#### pub fn rotate\_right(&mut self, k: usize)

Rotates the slice in-place such that the first `self.len() - k` elements of the slice move to the end while the last `k` elements move to the front.

After calling `rotate_right`, the element previously at index `self.len() - k` will become the first element in the slice.

##### §Panics

This function will panic if `k` is greater than the length of the slice. Note that `k == self.len()` does _not_ panic and is a no-op rotation.

##### §Complexity

Takes linear (in `self.len()`) time.

##### §Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_right(2);
assert_eq!(a, ['e', 'f', 'a', 'b', 'c', 'd']);
```

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_right(1);
assert_eq!(a, ['a', 'e', 'b', 'c', 'd', 'f']);
```

Source

#### pub fn shift\_left<const N: usize\>(&mut self, inserted: \[T; N\]) -> \[T; N\]

🔬This is a nightly-only experimental API. (`slice_shift` #151772)

Moves the elements of this slice `N` places to the left, returning the ones that “fall off” the front, and putting `inserted` at the end.

Equivalently, you can think of concatenating `self` and `inserted` into one long sequence, then returning the left-most `N` items and the rest into `self`:

```
 self (before) inserted
 vvvvvvvvvvvvvvv vvv
 [1, 2, 3, 4, 5] [9]
 ↙ ↙ ↙ ↙ ↙ ↙
 [1] [2, 3, 4, 5, 9]
 ^^^ ^^^^^^^^^^^^^^^
returned self (after)
```

See also `Self::shift_right` and compare `Self::rotate_left`.

##### §Examples

```
#![feature(slice_shift)]

let mut a = [1, 2, 3, 4, 5];
let inserted = [9];
let returned = a.shift_left(inserted);
assert_eq!(returned, [1]);
assert_eq!(a, [2, 3, 4, 5, 9]);

let mut a = *b"Hello world";
assert_eq!(a.shift_left(*b" peace"), *b"Hello ");
assert_eq!(a, *b"world peace");

let mut a: u8 = 0b10010110;
a <<= 3;
assert_eq!(a, 0b10110000_u8);
let mut a: [_; 8] = [1, 0, 0, 1, 0, 1, 1, 0];
a.shift_left([0; 3]);
assert_eq!(a, [1, 0, 1, 1, 0, 0, 0, 0]);

let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
assert_eq!(a[1..=4].shift_left(['Z']), ['b']);
assert_eq!(a, ['a', 'c', 'd', 'e', 'Z', 'f']);

let mut a = [1, 2, 3];
assert_eq!(a.shift_left([7, 8, 9]), [1, 2, 3]);
assert_eq!(a, [7, 8, 9]);

let mut a = [];
assert_eq!(a.shift_left([1, 2, 3]), [1, 2, 3]);
let mut a = [9];
assert_eq!(a.shift_left([1, 2, 3]), [9, 1, 2]);
assert_eq!(a, [3]);
```

Source

#### pub fn shift\_right<const N: usize\>(&mut self, inserted: \[T; N\]) -> \[T; N\]

🔬This is a nightly-only experimental API. (`slice_shift` #151772)

Moves the elements of this slice `N` places to the right, returning the ones that “fall off” the back, and putting `inserted` at the beginning.

Equivalently, you can think of concatenating `inserted` and `self` into one long sequence, then returning the right-most `N` items and the rest into `self`:

```
inserted self (before)
 vvv vvvvvvvvvvvvvvv
 [0] [5, 6, 7, 8, 9]
 ↘ ↘ ↘ ↘ ↘ ↘
 [0, 5, 6, 7, 8] [9]
 ^^^^^^^^^^^^^^^ ^^^
 self (after) returned
```

See also `Self::shift_left` and compare `Self::rotate_right`.

##### §Examples

```
#![feature(slice_shift)]

let mut a = [5, 6, 7, 8, 9];
let inserted = [0];
let returned = a.shift_right(inserted);
assert_eq!(returned, [9]);
assert_eq!(a, [0, 5, 6, 7, 8]);

let mut a: u8 = 0b10010110;
a >>= 3;
assert_eq!(a, 0b00010010_u8);
let mut a: [_; 8] = [1, 0, 0, 1, 0, 1, 1, 0];
a.shift_right([0; 3]);
assert_eq!(a, [0, 0, 0, 1, 0, 0, 1, 0]);

let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
assert_eq!(a[1..=4].shift_right(['Z']), ['e']);
assert_eq!(a, ['a', 'Z', 'b', 'c', 'd', 'f']);

let mut a = [1, 2, 3];
assert_eq!(a.shift_right([7, 8, 9]), [1, 2, 3]);
assert_eq!(a, [7, 8, 9]);

let mut a = [];
assert_eq!(a.shift_right([1, 2, 3]), [1, 2, 3]);
let mut a = [9];
assert_eq!(a.shift_right([1, 2, 3]), [2, 3, 9]);
assert_eq!(a, [1]);
```

1.50.0 · Source

#### pub fn fill(&mut self, value: T)

where T: Clone,

Fills `self` with elements by cloning `value`.

##### §Examples

```
let mut buf = vec![0; 10];
buf.fill(1);
assert_eq!(buf, vec![1; 10]);
```

1.51.0 · Source

#### pub fn fill\_with<F>(&mut self, f: F)

where F: FnMut() -> T,

Fills `self` with elements returned by calling a closure repeatedly.

This method uses a closure to create new values. If you’d rather `Clone` a given value, use `fill`. If you want to use the `Default` trait to generate values, you can pass `Default::default` as the argument.

##### §Examples

```
let mut buf = vec![1; 10];
buf.fill_with(Default::default);
assert_eq!(buf, vec![0; 10]);
```

1.7.0 · Source

#### pub fn clone\_from\_slice(&mut self, src: &\[T\])

where T: Clone,

Copies the elements from `src` into `self`.

The length of `src` must be the same as `self`.

##### §Panics

This function will panic if the two slices have different lengths.

##### §Examples

Cloning two elements from a slice into another:

```
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

dst.clone_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

Rust enforces that there can only be one mutable reference with no immutable references to a particular piece of data in a particular scope. Because of this, attempting to use `clone_from_slice` on a single slice will result in a compile failure:

ⓘ

```
let mut slice = [1, 2, 3, 4, 5];

slice[..2].clone_from_slice(&slice[3..]); 
```

To work around this, we can use `split_at_mut` to create two distinct sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
 let (left, right) = slice.split_at_mut(2);
 left.clone_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

1.9.0 · Source

#### pub fn copy\_from\_slice(&mut self, src: &\[T\])

where T: Copy,

Copies all elements from `src` into `self`, using a memcpy.

The length of `src` must be the same as `self`.

If `T` does not implement `Copy`, use `clone_from_slice`.

##### §Panics

This function will panic if the two slices have different lengths.

##### §Examples

Copying two elements from a slice into another:

```
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

dst.copy_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

Rust enforces that there can only be one mutable reference with no immutable references to a particular piece of data in a particular scope. Because of this, attempting to use `copy_from_slice` on a single slice will result in a compile failure:

ⓘ

```
let mut slice = [1, 2, 3, 4, 5];

slice[..2].copy_from_slice(&slice[3..]); 
```

To work around this, we can use `split_at_mut` to create two distinct sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
 let (left, right) = slice.split_at_mut(2);
 left.copy_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

1.37.0 · Source

#### pub fn copy\_within<R>(&mut self, src: R, dest: usize)

where R: RangeBounds<usize\>, T: Copy,

Copies elements from one part of the slice to another part of itself, using a memmove.

`src` is the range within `self` to copy from. `dest` is the starting index of the range within `self` to copy to, which will have the same length as `src`. The two ranges may overlap. The ends of the two ranges must be less than or equal to `self.len()`.

##### §Panics

This function will panic if either range exceeds the end of the slice, or if the end of `src` is before the start.

##### §Examples

Copying four bytes within a slice:

```
let mut bytes = *b"Hello, World!";

bytes.copy_within(1..5, 8);

assert_eq!(&bytes, b"Hello, Wello!");
```

1.27.0 · Source

#### pub fn swap\_with\_slice(&mut self, other: &mut \[T\])

Swaps all elements in `self` with those in `other`.

The length of `other` must be the same as `self`.

##### §Panics

This function will panic if the two slices have different lengths.

##### §Example

Swapping two elements across slices:

```
let mut slice1 = [0, 0];
let mut slice2 = [1, 2, 3, 4];

slice1.swap_with_slice(&mut slice2[2..]);

assert_eq!(slice1, [3, 4]);
assert_eq!(slice2, [1, 2, 0, 0]);
```

Rust enforces that there can only be one mutable reference to a particular piece of data in a particular scope. Because of this, attempting to use `swap_with_slice` on a single slice will result in a compile failure:

ⓘ

```
let mut slice = [1, 2, 3, 4, 5];
slice[..2].swap_with_slice(&mut slice[3..]); 
```

To work around this, we can use `split_at_mut` to create two distinct mutable sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
 let (left, right) = slice.split_at_mut(2);
 left.swap_with_slice(&mut right[1..]);
}

assert_eq!(slice, [4, 5, 3, 1, 2]);
```

1.30.0 · Source

#### pub unsafe fn align\_to<U>(&self) -> (&\[T\], &\[U\], &\[T\])

Transmutes the slice to a slice of another type, ensuring alignment of the types is maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle slice of a new type, and the suffix slice. The middle part will be as big as possible under the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are zero-sized and will return the original slice without splitting anything.

##### §Safety

This method is essentially a `transmute` with respect to the elements in the returned middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

##### §Examples

Basic usage:

```
unsafe {
 let bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
 let (prefix, shorts, suffix) = bytes.align_to::<u16>();
 }
```

1.30.0 · Source

#### pub unsafe fn align\_to\_mut<U>(&mut self) -> (&mut \[T\], &mut \[U\], &mut \[T\])

Transmutes the mutable slice to a mutable slice of another type, ensuring alignment of the types is maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle slice of a new type, and the suffix slice. The middle part will be as big as possible under the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are zero-sized and will return the original slice without splitting anything.

##### §Safety

This method is essentially a `transmute` with respect to the elements in the returned middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

##### §Examples

Basic usage:

```
unsafe {
 let mut bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
 let (prefix, shorts, suffix) = bytes.align_to_mut::<u16>();
 }
```

Source

#### pub fn as\_simd<const LANES: usize\>(&self) -> (&\[T\], &\[Simd<T, LANES>\], &\[T\])

where Simd<T, LANES>: AsRef<\[T; LANES\]\>, T: SimdElement,

🔬This is a nightly-only experimental API. (`portable_simd` #86656)

Splits a slice into a prefix, a middle of aligned SIMD types, and a suffix.

This is a safe wrapper around `slice::align_to`, so inherits the same guarantees as that method.

##### §Panics

This will panic if the size of the SIMD type is different from `LANES` times that of the scalar.

At the time of writing, the trait restrictions on `Simd<T, LANES>` keeps that from ever happening, as only power-of-two numbers of lanes are supported. It’s possible that, in the future, those restrictions might be lifted in a way that would make it possible to see panics from this method for something like `LANES == 3`.

##### §Examples

```
#![feature(portable_simd)]
use core::simd::prelude::*;

let short = &[1, 2, 3];
let (prefix, middle, suffix) = short.as_simd::<4>();
assert_eq!(middle, []); let it = prefix.iter().chain(suffix).copied();
assert_eq!(it.collect::<Vec<_>>(), vec![1, 2, 3]);

fn basic_simd_sum(x: &[f32]) -> f32 {
 use std::ops::Add;
 let (prefix, middle, suffix) = x.as_simd();
 let sums = f32x4::from_array([
 prefix.iter().copied().sum(),
 0.0,
 0.0,
 suffix.iter().copied().sum(),
 ]);
 let sums = middle.iter().copied().fold(sums, f32x4::add);
 sums.reduce_sum()
}

let numbers: Vec<f32> = (1..101).map(|x| x as _).collect();
assert_eq!(basic_simd_sum(&numbers[1..99]), 4949.0);
```

Source

#### pub fn as\_simd\_mut<const LANES: usize\>( &mut self, ) -> (&mut \[T\], &mut \[Simd<T, LANES>\], &mut \[T\])

where Simd<T, LANES>: AsMut<\[T; LANES\]\>, T: SimdElement,

🔬This is a nightly-only experimental API. (`portable_simd` #86656)

Splits a mutable slice into a mutable prefix, a middle of aligned SIMD types, and a mutable suffix.

This is a safe wrapper around `slice::align_to_mut`, so inherits the same guarantees as that method.

This is the mutable version of `slice::as_simd`; see that for examples.

##### §Panics

This will panic if the size of the SIMD type is different from `LANES` times that of the scalar.

At the time of writing, the trait restrictions on `Simd<T, LANES>` keeps that from ever happening, as only power-of-two numbers of lanes are supported. It’s possible that, in the future, those restrictions might be lifted in a way that would make it possible to see panics from this method for something like `LANES == 3`.

1.82.0 · Source

#### pub fn is\_sorted(&self) -> bool

where T: PartialOrd,

Checks if the elements of this slice are sorted.

That is, for each element `a` and its following element `b`, `a <= b` must hold. If the slice yields exactly zero or one element, `true` is returned.

Note that if `Self::Item` is only `PartialOrd`, but not `Ord`, the above definition implies that this function returns `false` if any two consecutive items are not comparable.

##### §Examples

```
let empty: [i32; 0] = [];

assert!([1, 2, 2, 9].is_sorted());
assert!(![1, 3, 2, 4].is_sorted());
assert!([0].is_sorted());
assert!(empty.is_sorted());
assert!(![0.0, 1.0, f32::NAN].is_sorted());
```

1.82.0 · Source

#### pub fn is\_sorted\_by<'a, F>(&'a self, compare: F) -> bool

where F: FnMut(&'a T, &'a T) -> bool,

Checks if the elements of this slice are sorted using the given comparator function.

Instead of using `PartialOrd::partial_cmp`, this function uses the given `compare` function to determine whether two elements are to be considered in sorted order.

##### §Examples

```
assert!([1, 2, 2, 9].is_sorted_by(|a, b| a <= b));
assert!(![1, 2, 2, 9].is_sorted_by(|a, b| a < b));

assert!([0].is_sorted_by(|a, b| true));
assert!([0].is_sorted_by(|a, b| false));

let empty: [i32; 0] = [];
assert!(empty.is_sorted_by(|a, b| false));
assert!(empty.is_sorted_by(|a, b| true));
```

1.82.0 · Source

#### pub fn is\_sorted\_by\_key<'a, F, K>(&'a self, f: F) -> bool

where F: FnMut(&'a T) -> K, K: PartialOrd,

Checks if the elements of this slice are sorted using the given key extraction function.

Instead of comparing the slice’s elements directly, this function compares the keys of the elements, as determined by `f`. Apart from that, it’s equivalent to `is_sorted`; see its documentation for more information.

##### §Examples

```
assert!(["c", "bb", "aaa"].is_sorted_by_key(|s| s.len()));
assert!(![-2i32, -1, 0, 3].is_sorted_by_key(|n| n.abs()));
```

1.52.0 · Source

#### pub fn partition\_point<P>(&self, pred: P) -> usize

where P: FnMut(&T) -> bool,

Returns the index of the partition point according to the given predicate (the index of the first element of the second partition).

The slice is assumed to be partitioned according to the given predicate. This means that all elements for which the predicate returns true are at the start of the slice and all elements for which the predicate returns false are at the end. For example, `[7, 15, 3, 5, 4, 12, 6]` is partitioned under the predicate `x % 2 != 0` (all odd numbers are at the start, all even at the end).

If this slice is not partitioned, the returned result is unspecified and meaningless, as this method performs a kind of binary search.

See also `binary_search`, `binary_search_by`, and `binary_search_by_key`.

##### §Examples

```
let v = [1, 2, 3, 3, 5, 6, 7];
let i = v.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(v[..i].iter().all(|&x| x < 5));
assert!(v[i..].iter().all(|&x| !(x < 5)));
```

If all elements of the slice match the predicate, including if the slice is empty, then the length of the slice will be returned:

```
let a = [2, 4, 8];
assert_eq!(a.partition_point(|x| x < &100), a.len());
let a: [i32; 0] = [];
assert_eq!(a.partition_point(|x| x < &100), 0);
```

If you want to insert an item to a sorted vector, while maintaining sort order:

```
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

1.87.0 · Source

#### pub fn split\_off<'a, R>(self: &mut &'a \[T\], range: R) -> Option<&'a \[T\]\>

where R: OneSidedRange<usize\>,

Removes the subslice corresponding to the given range and returns a reference to it.

Returns `None` and does not modify the slice if the given range is out of bounds.

Note that this method only accepts one-sided ranges such as `2..` or `..6`, but not `2..6`.

##### §Examples

Splitting off the first three elements of a slice:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off(..3).unwrap();

assert_eq!(slice, &['d']);
assert_eq!(first_three, &['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut tail = slice.split_off(2..).unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(tail, &['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off(5..));
assert_eq!(None, slice.split_off(..5));
assert_eq!(None, slice.split_off(..=4));
let expected: &[char] = &['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off(..4));
```

1.87.0 · Source

#### pub fn split\_off\_mut<'a, R>( self: &mut &'a mut \[T\], range: R, ) -> Option<&'a mut \[T\]\>

where R: OneSidedRange<usize\>,

Removes the subslice corresponding to the given range and returns a mutable reference to it.

Returns `None` and does not modify the slice if the given range is out of bounds.

Note that this method only accepts one-sided ranges such as `2..` or `..6`, but not `2..6`.

##### §Examples

Splitting off the first three elements of a slice:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off_mut(..3).unwrap();

assert_eq!(slice, &mut ['d']);
assert_eq!(first_three, &mut ['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut tail = slice.split_off_mut(2..).unwrap();

assert_eq!(slice, &mut ['a', 'b']);
assert_eq!(tail, &mut ['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off_mut(5..));
assert_eq!(None, slice.split_off_mut(..5));
assert_eq!(None, slice.split_off_mut(..=4));
let expected: &mut [_] = &mut ['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off_mut(..4));
```

1.87.0 · Source

#### pub fn split\_off\_first<'a>(self: &mut &'a \[T\]) -> Option<&'a T\>

Removes the first element of the slice and returns a reference to it.

Returns `None` if the slice is empty.

##### §Examples

```
let mut slice: &[_] = &['a', 'b', 'c'];
let first = slice.split_off_first().unwrap();

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'a');
```

1.87.0 · Source

#### pub fn split\_off\_first\_mut<'a>(self: &mut &'a mut \[T\]) -> Option<&'a mut T\>

Removes the first element of the slice and returns a mutable reference to it.

Returns `None` if the slice is empty.

##### §Examples

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let first = slice.split_off_first_mut().unwrap();
*first = 'd';

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'d');
```

1.87.0 · Source

#### pub fn split\_off\_last<'a>(self: &mut &'a \[T\]) -> Option<&'a T\>

Removes the last element of the slice and returns a reference to it.

Returns `None` if the slice is empty.

##### §Examples

```
let mut slice: &[_] = &['a', 'b', 'c'];
let last = slice.split_off_last().unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'c');
```

1.87.0 · Source

#### pub fn split\_off\_last\_mut<'a>(self: &mut &'a mut \[T\]) -> Option<&'a mut T\>

Removes the last element of the slice and returns a mutable reference to it.

Returns `None` if the slice is empty.

##### §Examples

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let last = slice.split_off_last_mut().unwrap();
*last = 'd';

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'d');
```

1.86.0 · Source

#### pub unsafe fn get\_disjoint\_unchecked\_mut<I, const N: usize\>( &mut self, indices: \[I; N\], ) -> \[&mut <I as SliceIndex<\[T\]\>>::Output; N\]

where I: GetDisjointMutIndex + SliceIndex<\[T\]\>,

Returns mutable references to many indices at once, without doing any checks.

An index can be either a `usize`, a `Range` or a `RangeInclusive`. Note that this method takes an array, so all indices must be of the same type. If passed an array of `usize`s this method gives back an array of mutable references to single elements, while if passed an array of ranges it gives back an array of mutable references to slices.

For a safe alternative see `get_disjoint_mut`.

##### §Safety

Calling this method with overlapping or out-of-bounds indices is _undefined behavior_ even if the resulting references are not used.

##### §Examples

```
let x = &mut [1, 2, 4];

unsafe {
 let [a, b] = x.get_disjoint_unchecked_mut([0, 2]);
 *a *= 10;
 *b *= 100;
}
assert_eq!(x, &[10, 2, 400]);

unsafe {
 let [a, b] = x.get_disjoint_unchecked_mut([0..1, 1..3]);
 a[0] = 8;
 b[0] = 88;
 b[1] = 888;
}
assert_eq!(x, &[8, 88, 888]);

unsafe {
 let [a, b] = x.get_disjoint_unchecked_mut([1..=2, 0..=0]);
 a[0] = 11;
 a[1] = 111;
 b[0] = 1;
}
assert_eq!(x, &[1, 11, 111]);
```

1.86.0 · Source

#### pub fn get\_disjoint\_mut<I, const N: usize\>( &mut self, indices: \[I; N\], ) -> Result<\[&mut <I as SliceIndex<\[T\]\>>::Output; N\], GetDisjointMutError\>

where I: GetDisjointMutIndex + SliceIndex<\[T\]\>,

Returns mutable references to many indices at once.

An index can be either a `usize`, a `Range` or a `RangeInclusive`. Note that this method takes an array, so all indices must be of the same type. If passed an array of `usize`s this method gives back an array of mutable references to single elements, while if passed an array of ranges it gives back an array of mutable references to slices.

Returns an error if any index is out-of-bounds, or if there are overlapping indices. An empty range is not considered to overlap if it is located at the beginning or at the end of another range, but is considered to overlap if it is located in the middle.

This method does a O(n^2) check to check that there are no overlapping indices, so be careful when passing many indices.

##### §Examples

```
let v = &mut [1, 2, 3];
if let Ok([a, b]) = v.get_disjoint_mut([0, 2]) {
 *a = 413;
 *b = 612;
}
assert_eq!(v, &[413, 2, 612]);

if let Ok([a, b]) = v.get_disjoint_mut([0..1, 1..3]) {
 a[0] = 8;
 b[0] = 88;
 b[1] = 888;
}
assert_eq!(v, &[8, 88, 888]);

if let Ok([a, b]) = v.get_disjoint_mut([1..=2, 0..=0]) {
 a[0] = 11;
 a[1] = 111;
 b[0] = 1;
}
assert_eq!(v, &[1, 11, 111]);
```

1.94.0 · Source

#### pub fn element\_offset(&self, element: &T) -> Option<usize\>

Returns the index that an element reference points to.

Returns `None` if `element` does not point to the start of an element within the slice.

This method is useful for extending slice iterators like `slice::split`.

Note that this uses pointer arithmetic and **does not compare elements**. To find the index of an element via comparison, use `.iter().position()` instead.

##### §Panics

Panics if `T` is zero-sized.

##### §Examples

Basic usage:

```
let nums: &[u32] = &[1, 7, 1, 1];
let num = &nums[2];

assert_eq!(num, &1);
assert_eq!(nums.element_offset(num), Some(2));
```

Returning `None` with an unaligned element:

```
let arr: &[[u32; 2]] = &[[0, 1], [2, 3]];
let flat_arr: &[u32] = arr.as_flattened();

let ok_elm: &[u32; 2] = flat_arr[0..2].try_into().unwrap();
let weird_elm: &[u32; 2] = flat_arr[1..3].try_into().unwrap();

assert_eq!(ok_elm, &[0, 1]);
assert_eq!(weird_elm, &[1, 2]);

assert_eq!(arr.element_offset(ok_elm), Some(0)); assert_eq!(arr.element_offset(weird_elm), None); 
``` 

Source

#### pub fn subslice\_range(&self, subslice: &\[T\]) -> Option<Range<usize\>>

🔬This is a nightly-only experimental API. (`substr_range` #126769)

Returns the range of indices that a subslice points to.

Returns `None` if `subslice` does not point within the slice or if it is not aligned with the elements in the slice.

This method **does not compare elements**. Instead, this method finds the location in the slice that `subslice` was obtained from. To find the index of a subslice via comparison, instead use `.windows()``.position()`.

This method is useful for extending slice iterators like `slice::split`.

Note that this may return a false positive (either `Some(0..0)` or `Some(self.len()..self.len())`) if `subslice` has a length of zero and points to the beginning or end of another, separate, slice.

##### §Panics

Panics if `T` is zero-sized.

##### §Examples

Basic usage:

```
#![feature(substr_range)]

let nums = &[0, 5, 10, 0, 0, 5];

let mut iter = nums
 .split(|t| *t == 0)
 .map(|n| nums.subslice_range(n).unwrap());

assert_eq!(iter.next(), Some(0..0));
assert_eq!(iter.next(), Some(1..3));
assert_eq!(iter.next(), Some(4..4));
assert_eq!(iter.next(), Some(5..6));
```

Source

#### pub fn as\_slice(&self) -> &\[T\]

🔬This is a nightly-only experimental API. (`str_as_str` #130366)

Returns the same slice `&[T]`.

This method is redundant when used directly on `&[T]`, but it helps dereferencing other “container” types to slices, for example `Box<[T]>` or `Arc<[T]>`.

Source

#### pub fn as\_mut\_slice(&mut self) -> &mut \[T\]

🔬This is a nightly-only experimental API. (`str_as_str` #130366)

Returns the same slice `&mut [T]`.

This method is redundant when used directly on `&mut [T]`, but it helps dereferencing other “container” types to slices, for example `Box<[T]>` or `MutexGuard<[T]>`.

1.0.0 · Source

#### pub fn sort(&mut self)

where T: Ord,

Sorts the slice in ascending order, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of `Ord` for `T` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

When applicable, unstable sorting is preferred because it is generally faster than stable sorting and it doesn’t allocate auxiliary memory. See `sort_unstable`. The exception are partially sorted slices, which may be better served with `slice::sort`.

Sorting types that only implement `PartialOrd` such as `f32` and `f64` require additional precautions. For example, `f32::NAN != f32::NAN`, which doesn’t fulfill the reflexivity requirement of `Ord`. By using an alternative comparison function with `slice::sort_by` such as `f32::total_cmp` or `f64::total_cmp` that defines a total order users can sort slices containing floating-point values. Alternatively, if all values in the slice are guaranteed to be in a subset for which `PartialOrd::partial_cmp` forms a total order, it’s possible to sort the slice with `sort_by(|a, b| a.partial_cmp(b).unwrap())`.

##### §Current implementation

The current implementation is based on driftsort by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### §Panics

May panic if the implementation of `Ord` for `T` does not implement a total order, or if the `Ord` implementation itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### §Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

1.0.0 · Source

#### pub fn sort\_by<F>(&mut self, compare: F)

where F: FnMut(&T, &T) -> Ordering,

Sorts the slice in ascending order with a comparison function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_n_ \* log(_n_)) worst-case.

If the comparison function `compare` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the `Ord` documentation.

##### §Current implementation

The current implementation is based on driftsort by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### §Panics

May panic if `compare` does not implement a total order, or if `compare` itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### §Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

v.sort_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

1.7.0 · Source

#### pub fn sort\_by\_key<K, F>(&mut self, f: F)

where F: FnMut(&T) -> K, K: Ord,

Sorts the slice in ascending order with a key extraction function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_m_ \* _n_ \* log(_n_)) worst-case, where the key function is _O_(_m_).

If the implementation of `Ord` for `K` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

##### §Current implementation

The current implementation is based on driftsort by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### §Panics

May panic if the implementation of `Ord` for `K` does not implement a total order, or if the `Ord` implementation or the key-function `f` panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### §Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

1.34.0 · Source

#### pub fn sort\_by\_cached\_key<K, F>(&mut self, f: F)

where F: FnMut(&T) -> K, K: Ord,

Sorts the slice in ascending order with a key extraction function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_m_ \* _n_ + _n_ \* log(_n_)) worst-case, where the key function is _O_(_m_).

During sorting, the key function is called at most once per element, by using temporary storage to remember the results of key evaluation. The order of calls to the key function is unspecified and may change in future versions of the standard library.

If the implementation of `Ord` for `K` does not implement a total order, the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For simple key functions (e.g., functions that are property accesses or basic operations), `sort_by_key` is likely to be faster.

##### §Current implementation

The current implementation is based on instruction-parallel-network sort by Lukas Bergdoll, which combines the fast average case of randomized quicksort with the fast worst case of heapsort, while achieving linear time on fully sorted and reversed inputs. And _O_(_k_ \* log(_n_)) where _k_ is the number of distinct elements in the input. It leverages superscalar out-of-order execution capabilities commonly found in CPUs, to efficiently perform the operation.

In the worst case, the algorithm allocates temporary storage in a `Vec<(K, usize)>` the length of the slice.

##### §Panics

May panic if the implementation of `Ord` for `K` does not implement a total order, or if the `Ord` implementation panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### §Examples

```
let mut v = [4i32, -5, 1, -3, 2, 10];

v.sort_by_cached_key(|k| k.to_string());
assert_eq!(v, [-3, -5, 1, 10, 2, 4]);
```

1.0.0 · Source

#### pub fn to\_vec(&self) -> Vec<T>

where T: Clone,

Copies `self` into a new `Vec`.

##### §Examples

```
let s = [10, 40, 30];
let x = s.to_vec();
```
Source

#### pub fn to\_vec\_in<A>(&self, alloc: A) -> Vec<T, A>

where A: Allocator, T: Clone,

🔬This is a nightly-only experimental API. (`allocator_api` #32838)

Copies `self` into a new `Vec` with an allocator.

##### §Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let s = [10, 40, 30];
let x = s.to_vec_in(System);
```

1.40.0 · Source

#### pub fn repeat(&self, n: usize) -> Vec<T>

where T: Copy,

Creates a vector by copying a slice `n` times.

##### §Panics

This function will panic if the capacity would overflow.

##### §Examples

```
assert_eq!([1, 2].repeat(3), vec![1, 2, 1, 2, 1, 2]);
```

A panic upon overflow:

ⓘ

```
b"0123456789abcdef".repeat(usize::MAX);
```

1.0.0 · Source

#### pub fn concat<Item>(&self) -> <\[T\] as Concat<Item>>::Output ⓘ

where \[T\]: Concat<Item>, Item: ?Sized,

Flattens a slice of `T` into a single value `Self::Output`.

##### §Examples

```
assert_eq!(["hello", "world"].concat(), "helloworld");
assert_eq!([[1, 2], [3, 4]].concat(), [1, 2, 3, 4]);
```

1.3.0 · Source

#### pub fn join<Separator>( &self, sep: Separator, ) -> <\[T\] as Join<Separator>>::Output ⓘ

where \[T\]: Join<Separator>,

Flattens a slice of `T` into a single value `Self::Output`, placing a given separator between each.

##### §Examples

```
assert_eq!(["hello", "world"].join(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].join(&0), [1, 2, 0, 3, 4]);
assert_eq!([[1, 2], [3, 4]].join(&[0, 0][..]), [1, 2, 0, 0, 3, 4]);
```

1.0.0 · Source

#### pub fn connect<Separator>( &self, sep: Separator, ) -> <\[T\] as Join<Separator>>::Output ⓘ

where \[T\]: Join<Separator>,

👎Deprecated since 1.3.0: renamed to join

Flattens a slice of `T` into a single value `Self::Output`, placing a given separator between each.

##### §Examples

```
assert_eq!(["hello", "world"].connect(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].connect(&0), [1, 2, 0, 3, 4]);
```

1.5.0 · Source§

### impl<T, A> AsMut<\[T\]\> for Vec<T, A>

where A: Allocator,

Source§

#### fn as\_mut(&mut self) -> &mut \[T\]

Converts this type into a mutable reference of the (usually inferred) input type.

1.5.0 · Source§

### impl<T, A> AsMut<Vec<T, A>> for Vec<T, A>

where A: Allocator,

Source§

#### fn as\_mut(&mut self) -> &mut Vec<T, A>

Converts this type into a mutable reference of the (usually inferred) input type.

1.0.0 · Source§

### impl<T, A> AsRef<\[T\]\> for Vec<T, A>

where A: Allocator,

Source§

#### fn as\_ref(&self) -> &\[T\]

Converts this type into a shared reference of the (usually inferred) input type.

1.0.0 · Source§

### impl<T, A> AsRef<Vec<T, A>> for Vec<T, A>

where A: Allocator,

Source§

#### fn as\_ref(&self) -> &Vec<T, A>

Converts this type into a shared reference of the (usually inferred) input type.

1.0.0 · Source§

### impl<T, A> Borrow<\[T\]\> for Vec<T, A>

where A: Allocator,

Source§

#### fn borrow(&self) -> &\[T\]

Immutably borrows from an owned value. Read more

1.0.0 · Source§

### impl<T, A> BorrowMut<\[T\]\> for Vec<T, A>

where A: Allocator,

Source§

#### fn borrow\_mut(&mut self) -> &mut \[T\]

Mutably borrows from an owned value. Read more

1.0.0 · Source§

### impl<T, A> Clone for Vec<T, A>

where T: Clone, A: Allocator + Clone,

Source§

#### fn clone\_from(&mut self, source: &Vec<T, A>)

Overwrites the contents of `self` with a clone of the contents of `source`.

This method is preferred over simply assigning `source.clone()` to `self`, as it avoids reallocation if possible. Additionally, if the element type `T` overrides `clone_from()`, this will reuse the resources of `self`’s elements as well.

##### §Examples

```
let x = vec![5, 6, 7];
let mut y = vec![8, 9, 10];
let yp: *const i32 = y.as_ptr();

y.clone_from(&x);

assert_eq!(x, y);

assert_eq!(yp, y.as_ptr());
```

Source§

#### fn clone(&self) -> Vec<T, A>

Returns a duplicate of the value. Read more

1.0.0 · Source§

### impl<T, A> Debug for Vec<T, A>

where T: Debug, A: Allocator,

Source§

#### fn fmt(&self, f: &mut Formatter<'\_>) -> Result<(), Error\>

Formats the value using the given formatter. Read more

1.0.0 (const: unstable) · Source§

### impl<T> Default for Vec<T>

Source§

#### fn default() -> Vec<T>

Creates an empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

1.0.0 · Source§

### impl<T, A> Deref for Vec<T, A>

where A: Allocator,

Source§

#### type Target = \[T\]

The resulting type after dereferencing.

Source§

#### fn deref(&self) -> &\[T\]

Dereferences the value.

1.0.0 · Source§

### impl<T, A> DerefMut for Vec<T, A>

where A: Allocator,

Source§

#### fn deref\_mut(&mut self) -> &mut \[T\]

Mutably dereferences the value.

1.0.0 · Source§

### impl<T, A> Drop for Vec<T, A>

where A: Allocator,

Source§

#### fn drop(&mut self)

Executes the destructor for this type. Read more

1.2.0 · Source§

### impl<'a, T, A> Extend<&'a T\> for Vec<T, A>

where T: Copy + 'a, A: Allocator,

Extend implementation that copies elements out of references before pushing them onto the Vec.

This implementation is specialized for slice iterators, where it uses `copy_from_slice` to append the entire slice at once.

Source§

#### fn extend<I>(&mut self, iter: I)

where I: IntoIterator<Item = &'a T\>,

Extends a collection with the contents of an iterator. Read more

Source§

#### fn extend\_one(&mut self, \_: &'a T)

🔬This is a nightly-only experimental API. (`extend_one` #72631)

Extends a collection with exactly one element.

Source§

#### fn extend\_reserve(&mut self, additional: usize)

🔬This is a nightly-only experimental API. (`extend_one` #72631)

Reserves capacity in a collection for the given number of additional elements. Read more

1.0.0 · Source§

### impl<T, A> Extend<T> for Vec<T, A>

where A: Allocator,

Source§

#### fn extend<I>(&mut self, iter: I)

where I: IntoIterator<Item = T>,

Extends a collection with the contents of an iterator. Read more

Source§

#### fn extend\_one(&mut self, item: T)

🔬This is a nightly-only experimental API. (`extend_one` #72631)

Extends a collection with exactly one element.

Source§

#### fn extend\_reserve(&mut self, additional: usize)

🔬This is a nightly-only experimental API. (`extend_one` #72631)

Reserves capacity in a collection for the given number of additional elements. Read more

1.0.0 · Source§

### impl<T> From<&\[T\]\> for Vec<T>

where T: Clone,

Source§

#### fn from(s: &\[T\]) -> Vec<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### §Examples

```
assert_eq!(Vec::from(&[1, 2, 3][..]), vec![1, 2, 3]);
```

1.74.0 · Source§

### impl<T, const N: usize\> From<&\[T; N\]\> for Vec<T>

where T: Clone,

Source§

#### fn from(s: &\[T; N\]) -> Vec<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### §Examples

```
assert_eq!(Vec::from(&[1, 2, 3]), vec![1, 2, 3]);
```

1.28.0 · Source§

### impl<'a, T> From<&'a Vec<T>> for Cow<'a, \[T\]\>

where T: Clone,

Source§

#### fn from(v: &'a Vec<T>) -> Cow<'a, \[T\]\>

Creates a `Borrowed` variant of `Cow` from a reference to `Vec`.

This conversion does not allocate or clone the data.

1.19.0 · Source§

### impl<T> From<&mut \[T\]\> for Vec<T>

where T: Clone,

Source§

#### fn from(s: &mut \[T\]) -> Vec<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### §Examples

```
assert_eq!(Vec::from(&mut [1, 2, 3][..]), vec![1, 2, 3]);
```

1.74.0 · Source§

### impl<T, const N: usize\> From<&mut \[T; N\]\> for Vec<T>

where T: Clone,

Source§

#### fn from(s: &mut \[T; N\]) -> Vec<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### §Examples

```
assert_eq!(Vec::from(&mut [1, 2, 3]), vec![1, 2, 3]);
```

1.0.0 · Source§

### impl From<&str\> for Vec<u8\>

Source§

#### fn from(s: &str) -> Vec<u8\> ⓘ

Allocates a `Vec<u8>` and fills it with a UTF-8 string.

##### §Examples

```
assert_eq!(Vec::from("123"), vec![b'1', b'2', b'3']);
```

1.44.0 · Source§

### impl<T, const N: usize\> From<\[T; N\]\> for Vec<T>

Source§

#### fn from(s: \[T; N\]) -> Vec<T>

Allocates a `Vec<T>` and moves `s`’s items into it.

##### §Examples

```
assert_eq!(Vec::from([1, 2, 3]), vec![1, 2, 3]);
```

1.5.0 · Source§

### impl<T, A> From<BinaryHeap<T, A>> for Vec<T, A>

where A: Allocator,

Source§

#### fn from(heap: BinaryHeap<T, A>) -> Vec<T, A>

Converts a `BinaryHeap<T>` into a `Vec<T>`.

This conversion requires no data movement or allocation, and has constant time complexity.

1.18.0 · Source§

### impl<T, A> From<Box<\[T\], A>> for Vec<T, A>

where A: Allocator,

Source§

#### fn from(s: Box<\[T\], A>) -> Vec<T, A>

Converts a boxed slice into a vector by transferring ownership of the existing heap allocation.

##### §Examples

```
let b: Box<[i32]> = vec![1, 2, 3].into_boxed_slice();
assert_eq!(Vec::from(b), vec![1, 2, 3]);
```

Source§

### impl From<ByteString\> for Vec<u8\>

Source§

#### fn from(s: ByteString) -> Vec<u8\> ⓘ

Converts to this type from the input type.

1.7.0 · Source§

### impl From<CString\> for Vec<u8\>

Source§

#### fn from(s: CString) -> Vec<u8\> ⓘ

Converts a `CString` into a `Vec<u8>`.

The conversion consumes the `CString`, and removes the terminating NUL byte.

1.14.0 · Source§

### impl<'a, T> From<Cow<'a, \[T\]\>> for Vec<T>

where \[T\]: ToOwned<Owned = Vec<T>>,

Source§

#### fn from(s: Cow<'a, \[T\]\>) -> Vec<T>

Converts a clone-on-write slice into a vector.

If `s` already owns a `Vec<T>`, it will be returned directly. If `s` is borrowing a slice, a new `Vec<T>` will be allocated and filled by cloning `s`’s items into it.

##### §Examples

```
let o: Cow<'_, [i32]> = Cow::Owned(vec![1, 2, 3]);
let b: Cow<'_, [i32]> = Cow::Borrowed(&[1, 2, 3]);
assert_eq!(Vec::from(o), Vec::from(b));
```

1.14.0 · Source§

### impl From<String\> for Vec<u8\>

Source§

#### fn from(string: String) -> Vec<u8\> ⓘ

Converts the given `String` to a vector `Vec` that holds values of type `u8`.

##### §Examples

```
let s1 = String::from("hello world");
let v1 = Vec::from(s1);

for b in v1 {
 println!("{b}");
}
```

1.43.0 · Source§

### impl From<Vec<NonZero<u8\>>> for CString

Source§

#### fn from(v: Vec<NonZero<u8\>>) -> CString

Converts a `Vec<NonZero<u8>>` into a `CString` without copying nor checking for inner nul bytes.

1.8.0 · Source§

### impl<'a, T> From<Vec<T>> for Cow<'a, \[T\]\>

where T: Clone,

Source§

#### fn from(v: Vec<T>) -> Cow<'a, \[T\]\>

Creates an `Owned` variant of `Cow` from an owned instance of `Vec`.

This conversion does not allocate or clone the data.

1.21.0 · Source§

### impl<T, A> From<Vec<T, A>> for Arc<\[T\], A>

where A: Allocator + Clone,

Source§

#### fn from(v: Vec<T, A>) -> Arc<\[T\], A>

Allocates a reference-counted slice and moves `v`’s items into it.

##### §Example

```
let unique: Vec<i32> = vec![1, 2, 3];
let shared: Arc<[i32]> = Arc::from(unique);
assert_eq!(&[1, 2, 3], &shared[..]);
```

1.5.0 · Source§

### impl<T, A> From<Vec<T, A>> for BinaryHeap<T, A>

where T: Ord, A: Allocator,

Source§

#### fn from(vec: Vec<T, A>) -> BinaryHeap<T, A>

Converts a `Vec<T>` into a `BinaryHeap<T>`.

This conversion happens in-place, and has _O_(_n_) time complexity.

1.20.0 · Source§

### impl<T, A> From<Vec<T, A>> for Box<\[T\], A>

where A: Allocator,

Source§

#### fn from(v: Vec<T, A>) -> Box<\[T\], A>

Converts a vector into a boxed slice.

Before doing the conversion, this method discards excess capacity like `Vec::shrink_to_fit`.

##### §Examples

```
assert_eq!(Box::from(vec![1, 2, 3]), vec![1, 2, 3].into_boxed_slice());
```

Any excess capacity is removed:

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);

assert_eq!(Box::from(vec), vec![1, 2, 3].into_boxed_slice());
```

1.21.0 · Source§

### impl<T, A> From<Vec<T, A>> for Rc<\[T\], A>

where A: Allocator,

Source§

#### fn from(v: Vec<T, A>) -> Rc<\[T\], A>

Allocates a reference-counted slice and moves `v`’s items into it.

##### §Example

```
let unique: Vec<i32> = vec![1, 2, 3];
let shared: Rc<[i32]> = Rc::from(unique);
assert_eq!(&[1, 2, 3], &shared[..]);
```

1.10.0 · Source§

### impl<T, A> From<Vec<T, A>> for VecDeque<T, A>

where A: Allocator,

Source§

#### fn from(other: Vec<T, A>) -> VecDeque<T, A>

Turn a `Vec<T>` into a `VecDeque<T>`.

This conversion is guaranteed to run in _O_(1) time and to not re-allocate the `Vec`’s buffer or allocate any additional memory.

1.10.0 · Source§

### impl<T, A> From<VecDeque<T, A>> for Vec<T, A>

where A: Allocator,

Source§

#### fn from(other: VecDeque<T, A>) -> Vec<T, A>

Turn a `VecDeque<T>` into a `Vec<T>`.

This never needs to re-allocate, but does need to do _O_(_n_) data movement if the circular buffer doesn’t happen to be at the beginning of the allocation.

##### §Examples

```
use std::collections::VecDeque;

let deque: VecDeque<_> = (1..5).collect();
let ptr = deque.as_slices().0.as_ptr();
let vec = Vec::from(deque);
assert_eq!(vec, [1, 2, 3, 4]);
assert_eq!(vec.as_ptr(), ptr);

let mut deque: VecDeque<_> = (1..5).collect();
deque.push_front(9);
deque.push_front(8);
let ptr = deque.as_slices().1.as_ptr();
let vec = Vec::from(deque);
assert_eq!(vec, [8, 9, 1, 2, 3, 4]);
assert_eq!(vec.as_ptr(), ptr);
```

1.0.0 · Source§

### impl<T> FromIterator<T> for Vec<T>

Collects an iterator into a Vec, commonly called via `Iterator::collect()`

#### §Allocation behavior

In general `Vec` does not guarantee any particular growth or allocation strategy. That also applies to this trait impl.

**Note:** This section covers implementation details and is therefore exempt from stability guarantees.

Vec may use any or none of the following strategies, depending on the supplied iterator:

* preallocate based on `Iterator::size_hint()`
 * and panic if the number of items is outside the provided lower/upper bounds
* use an amortized growth strategy similar to `pushing` one item at a time
* perform the iteration in-place on the original allocation backing the iterator

The last case warrants some attention. It is an optimization that in many cases reduces peak memory consumption and improves cache locality. But when big, short-lived allocations are created, only a small fraction of their items get collected, no further use is made of the spare capacity and the resulting `Vec` is moved into a longer-lived structure, then this can lead to the large allocations having their lifetimes unnecessarily extended which can result in increased memory footprint.

In cases where this is an issue, the excess capacity can be discarded with `Vec::shrink_to()`, `Vec::shrink_to_fit()` or by collecting into `Box<[T]>` instead, which additionally reduces the size of the long-lived struct.

```
static LONG_LIVED: Mutex<Vec<Vec<u16>>> = Mutex::new(Vec::new());

for i in 0..10 {
 let big_temporary: Vec<u16> = (0..1024).collect();
 let mut result: Vec<_> = big_temporary.into_iter().filter(|i| i % 100 == 0).collect();
 result.shrink_to_fit();
 LONG_LIVED.lock().unwrap().push(result);
}
```

Source§

#### fn from\_iter<I>(iter: I) -> Vec<T>

where I: IntoIterator<Item = T>,

Creates a value from an iterator. Read more

1.0.0 · Source§

### impl<T, A> Hash for Vec<T, A>

where T: Hash, A: Allocator,

The hash of a vector is the same as that of the corresponding slice, as required by the `core::borrow::Borrow` implementation.

```
use std::hash::BuildHasher;

let b = std::hash::RandomState::new();
let v: Vec<u8> = vec![0xa8, 0x3c, 0x09];
let s: &[u8] = &[0xa8, 0x3c, 0x09];
assert_eq!(b.hash_one(v), b.hash_one(s));
```

Source§

#### fn hash<H>(&self, state: &mut H)

where H: Hasher,

Feeds this value into the given `Hasher`. Read more

1.3.0 · Source§

#### fn hash\_slice<H>(data: &\[Self\], state: &mut H)

where H: Hasher, Self: Sized,

Feeds a slice of this type into the given `Hasher`. Read more

1.0.0 · Source§

### impl<T, I, A> Index<I> for Vec<T, A>

where I: SliceIndex<\[T\]\>, A: Allocator,

Source§

#### type Output = <I as SliceIndex<\[T\]\>>::Output

The returned type after indexing.

Source§

#### fn index(&self, index: I) -> &<Vec<T, A> as Index<I>>::Output ⓘ

Performs the indexing (`container[index]`) operation. Read more

1.0.0 · Source§

### impl<T, I, A> IndexMut<I> for Vec<T, A>

where I: SliceIndex<\[T\]\>, A: Allocator,

Source§

#### fn index\_mut(&mut self, index: I) -> &mut <Vec<T, A> as Index<I>>::Output ⓘ

Performs the mutable indexing (`container[index]`) operation. Read more

1.0.0 · Source§

### impl<'a, T, A> IntoIterator for &'a Vec<T, A>

where A: Allocator,

Source§

#### type Item = &'a T

The type of the elements being iterated over.

Source§

#### type IntoIter = Iter<'a, T>

Which kind of iterator are we turning this into?

Source§

#### fn into\_iter(self) -> <&'a Vec<T, A> as IntoIterator\>::IntoIter ⓘ

Creates an iterator from a value. Read more

1.0.0 · Source§

### impl<'a, T, A> IntoIterator for &'a mut Vec<T, A>

where A: Allocator,

Source§

#### type Item = &'a mut T

The type of the elements being iterated over.

Source§

#### type IntoIter = IterMut<'a, T>

Which kind of iterator are we turning this into?

Source§

#### fn into\_iter(self) -> <&'a mut Vec<T, A> as IntoIterator\>::IntoIter ⓘ

Creates an iterator from a value. Read more

1.0.0 · Source§

### impl<T, A> IntoIterator for Vec<T, A>

where A: Allocator,

Source§

#### fn into\_iter(self) -> <Vec<T, A> as IntoIterator\>::IntoIter ⓘ

Creates a consuming iterator, that is, one that moves each value out of the vector (from start to end). The vector cannot be used after calling this.

##### §Examples

```
let v = vec!["a".to_string(), "b".to_string()];
let mut v_iter = v.into_iter();

let first_element: Option<String> = v_iter.next();

assert_eq!(first_element, Some("a".to_string()));
assert_eq!(v_iter.next(), Some("b".to_string()));
assert_eq!(v_iter.next(), None);
```

Source§

#### type Item = T

The type of the elements being iterated over.

Source§

#### type IntoIter = IntoIter<T, A>

Which kind of iterator are we turning this into?

1.0.0 · Source§

### impl<T, A> Ord for Vec<T, A>

where T: Ord, A: Allocator,

Implements ordering of vectors, lexicographically.

Source§

#### fn cmp(&self, other: &Vec<T, A>) -> Ordering

This method returns an `Ordering` between `self` and `other`. Read more

1.21.0 · Source§

#### fn max(self, other: Self) -> Self

where Self: Sized,

Compares and returns the maximum of two values. Read more

1.21.0 · Source§

#### fn min(self, other: Self) -> Self

where Self: Sized,

Compares and returns the minimum of two values. Read more

1.50.0 · Source§

#### fn clamp(self, min: Self, max: Self) -> Self

where Self: Sized,

Restrict a value to a certain interval. Read more

1.0.0 · Source§

### impl<T, U, A> PartialEq<&\[U\]\> for Vec<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &&\[U\]) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &&\[U\]) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, U, A, const N: usize\> PartialEq<&\[U; N\]\> for Vec<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &&\[U; N\]) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &&\[U; N\]) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, U, A> PartialEq<&mut \[U\]\> for Vec<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &&mut \[U\]) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &&mut \[U\]) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.48.0 · Source§

### impl<T, U, A> PartialEq<\[U\]\> for Vec<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &\[U\]) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &\[U\]) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, U, A, const N: usize\> PartialEq<\[U; N\]\> for Vec<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &\[U; N\]) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &\[U; N\]) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

Source§

### impl PartialEq<ByteStr\> for Vec<u8\>

Source§

#### fn eq(&self, other: &ByteStr) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · Source§

#### fn ne(&self, other: &Rhs) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

Source§

### impl PartialEq<ByteString\> for Vec<u8\>

Source§

#### fn eq(&self, other: &ByteString) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · Source§

#### fn ne(&self, other: &Rhs) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.46.0 · Source§

### impl<T, U, A> PartialEq<Vec<U, A>> for &\[T\]

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &Vec<U, A>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &Vec<U, A>) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.46.0 · Source§

### impl<T, U, A> PartialEq<Vec<U, A>> for &mut \[T\]

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &Vec<U, A>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &Vec<U, A>) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.48.0 · Source§

### impl<T, U, A> PartialEq<Vec<U, A>> for \[T\]

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &Vec<U, A>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &Vec<U, A>) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, U, A> PartialEq<Vec<U, A>> for Cow<'\_, \[T\]\>

where A: Allocator, T: PartialEq<U> + Clone,

Source§

#### fn eq(&self, other: &Vec<U, A>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &Vec<U, A>) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.17.0 · Source§

### impl<T, U, A> PartialEq<Vec<U, A>> for VecDeque<T, A>

where A: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &Vec<U, A>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · Source§

#### fn ne(&self, other: &Rhs) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, U, A1, A2> PartialEq<Vec<U, A2>> for Vec<T, A1>

where A1: Allocator, A2: Allocator, T: PartialEq<U>,

Source§

#### fn eq(&self, other: &Vec<U, A2>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

Source§

#### fn ne(&self, other: &Vec<U, A2>) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

Source§

### impl PartialEq<Vec<u8\>> for ByteStr

Source§

#### fn eq(&self, other: &Vec<u8\>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · Source§

#### fn ne(&self, other: &Rhs) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

Source§

### impl PartialEq<Vec<u8\>> for ByteString

Source§

#### fn eq(&self, other: &Vec<u8\>) -> bool

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · Source§

#### fn ne(&self, other: &Rhs) -> bool

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · Source§

### impl<T, A1, A2> PartialOrd<Vec<T, A2>> for Vec<T, A1>

where T: PartialOrd, A1: Allocator, A2: Allocator,

Implements comparison of vectors, lexicographically.

Source§

#### fn partial\_cmp(&self, other: &Vec<T, A2>) -> Option<Ordering\>

This method returns an ordering between `self` and `other` values if one exists. Read more

1.0.0 · Source§

#### fn lt(&self, other: &Rhs) -> bool

Tests less than (for `self` and `other`) and is used by the `<` operator. Read more

1.0.0 · Source§

#### fn le(&self, other: &Rhs) -> bool

Tests less than or equal to (for `self` and `other`) and is used by the `<=` operator. Read more

1.0.0 · Source§

#### fn gt(&self, other: &Rhs) -> bool

Tests greater than (for `self` and `other`) and is used by the `>` operator. Read more

1.0.0 · Source§

#### fn ge(&self, other: &Rhs) -> bool

Tests greater than or equal to (for `self` and `other`) and is used by the `>=` operator. Read more

1.66.0 · Source§

### impl<T, const N: usize\> TryFrom<Vec<T>> for Box<\[T; N\]\>

Source§

#### fn try\_from( vec: Vec<T>, ) -> Result<Box<\[T; N\]\>, <Box<\[T; N\]\> as TryFrom<Vec<T>>>::Error\>

Attempts to convert a `Vec<T>` into a `Box<[T; N]>`.

Like `Vec::into_boxed_slice`, this is in-place if `vec.capacity() == N`, but will require a reallocation otherwise.

##### §Errors

Returns the original `Vec<T>` in the `Err` variant if `boxed_slice.len()` does not equal `N`.

##### §Examples

This can be used with `vec!` to create an array on the heap:

```
let state: Box<[f32; 100]> = vec![1.0; 100].try_into().unwrap();
assert_eq!(state.len(), 100);
```

Source§

#### type Error = Vec<T>

The type returned in the event of a conversion error.

1.48.0 · Source§

### impl<T, A, const N: usize\> TryFrom<Vec<T, A>> for \[T; N\]

where A: Allocator,

Source§

#### fn try\_from(vec: Vec<T, A>) -> Result<\[T; N\], Vec<T, A>>

Gets the entire contents of the `Vec<T>` as an array, if its size exactly matches that of the requested array.

##### §Examples

```
assert_eq!(vec![1, 2, 3].try_into(), Ok([1, 2, 3]));
assert_eq!(<Vec<i32>>::new().try_into(), Ok([]));
```

If the length doesn’t match, the input comes back in `Err`:

```
let r: Result<[i32; 4], _> = (0..10).collect::<Vec<_>>().try_into();
assert_eq!(r, Err(vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
```

If you’re fine with just getting a prefix of the `Vec<T>`, you can call `.truncate(N)` first.

```
let mut v = String::from("hello world").into_bytes();
v.sort();
v.truncate(2);
let [a, b]: [_; 2] = v.try_into().unwrap();
assert_eq!(a, b' ');
assert_eq!(b, b'd');
```

Source§

#### type Error = Vec<T, A>

The type returned in the event of a conversion error.

1.87.0 · Source§

### impl TryFrom<Vec<u8\>> for String

Source§

#### fn try\_from( bytes: Vec<u8\>, ) -> Result<String, <String as TryFrom<Vec<u8\>>>::Error\>

Converts the given `Vec<u8>` into a `String` if it contains valid UTF-8 data.

##### §Examples

```
let s1 = b"hello world".to_vec();
let v1 = String::try_from(s1).unwrap();
assert_eq!(v1, "hello world");
```

Source§

#### type Error = FromUtf8Error

The type returned in the event of a conversion error.

1.0.0 · Source§

### impl<A: Allocator\> Write for Vec<u8, A>

Write is implemented for `Vec<u8>` by appending to the vector. The vector will grow as needed.

Source§

#### fn write(&mut self, buf: &\[u8\]) -> Result<usize\>

Writes a buffer into this writer, returning how many bytes were written. Read more

Source§

#### fn write\_vectored(&mut self, bufs: &\[IoSlice<'\_>\]) -> Result<usize\>

Like `write`, except that it writes from a slice of buffers. Read more

Source§

#### fn is\_write\_vectored(&self) -> bool

🔬This is a nightly-only experimental API. (`can_vector` #69941)

Determines if this `Write`r has an efficient `write_vectored` implementation. Read more

Source§

#### fn write\_all(&mut self, buf: &\[u8\]) -> Result<()\>

Attempts to write an entire buffer into this writer. Read more

Source§

#### fn write\_all\_vectored(&mut self, bufs: &mut \[IoSlice<'\_>\]) -> Result<()\>

🔬This is a nightly-only experimental API. (`write_all_vectored` #70436)

Attempts to write multiple buffers into this writer. Read more

Source§

#### fn flush(&mut self) -> Result<()\>

Flushes this output stream, ensuring that all intermediately buffered contents reach their destination. Read more

1.0.0 · Source§

#### fn write\_fmt(&mut self, args: Arguments<'\_>) -> Result<()\>

Writes a formatted string into this writer, returning any error encountered. Read more

1.0.0 · Source§

#### fn by\_ref(&mut self) -> &mut Self

where Self: Sized,

Creates a “by reference” adapter for this instance of `Write`. Read more

Source§

### impl<T, A> DerefPure for Vec<T, A>

where A: Allocator,

1.0.0 · Source§

### impl<T, A> Eq for Vec<T, A>

where T: Eq, A: Allocator,

§

### impl<T, A> Freeze for Vec<T, A>

where A: Freeze,

§

### impl<T, A> RefUnwindSafe for Vec<T, A>

where A: RefUnwindSafe, T: RefUnwindSafe,

§

### impl<T, A> Send for Vec<T, A>

where A: Send, T: Send,

§

### impl<T, A> Sync for Vec<T, A>

where A: Sync, T: Sync,

§

### impl<T, A> Unpin for Vec<T, A>

where A: Unpin, T: Unpin,

§

### impl<T, A> UnsafeUnpin for Vec<T, A>

where A: UnsafeUnpin,

§

### impl<T, A> UnwindSafe for Vec<T, A>

where A: UnwindSafe, T: UnwindSafe,

Source§

### impl<T> Any for T

where T: 'static + ?Sized,

Source§

#### fn type\_id(&self) -> TypeId

Gets the `TypeId` of `self`. Read more

Source§

### impl<T> Borrow<T> for T

where T: ?Sized,

Source§

#### fn borrow(&self) -> &T

Immutably borrows from an owned value. Read more

Source§

### impl<T> BorrowMut<T> for T

where T: ?Sized,

Source§

#### fn borrow\_mut(&mut self) -> &mut T

Mutably borrows from an owned value. Read more

Source§

### impl<T> CloneToUninit for T

where T: Clone,

Source§

#### unsafe fn clone\_to\_uninit(&self, dest: \*mut u8)

🔬This is a nightly-only experimental API. (`clone_to_uninit` #126799)

Performs copy-assignment from `self` to `dest`. Read more

Source§

### impl<T> From<T> for T

Source§

#### fn from(t: T) -> T

Returns the argument unchanged.

Source§

### impl<T, U> Into<U> for T

where U: From<T>,

Source§

#### fn into(self) -> U

Calls `U::from(self)`.

That is, this conversion is whatever the implementation of `From<T> for U` chooses to do.

Source§

### impl<P, T> Receiver for P

where P: Deref<Target = T> + ?Sized, T: ?Sized,

Source§

#### type Target = T

🔬This is a nightly-only experimental API. (`arbitrary_self_types` #44874)

The target type on which the method may be called.

Source§

### impl<T> ToOwned for T

where T: Clone,

Source§

#### type Owned = T

The resulting type after obtaining ownership.

Source§

#### fn to\_owned(&self) -> T

Creates owned data from borrowed data, usually by cloning. Read more

Source§

#### fn clone\_into(&self, target: &mut T)

Uses borrowed data to replace owned data, usually by cloning. Read more

Source§

### impl<T, U> TryFrom<U> for T

where U: Into<T>,

Source§

#### type Error = Infallible

The type returned in the event of a conversion error.

Source§

#### fn try\_from(value: U) -> Result<T, <T as TryFrom<U>>::Error\>

Performs the conversion.

Source§

### impl<T, U> TryInto<U> for T

where U: TryFrom<T>,

Source§

#### type Error = <U as TryFrom<T>>::Error

The type returned in the event of a conversion error.

Source§

#### fn try\_into(self) -> Result<U, <U as TryFrom<T>>::Error\>

Performs the conversion.
