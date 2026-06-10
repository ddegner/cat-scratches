[std](../index.html)::[vec](index.html)

# Struct Vec 

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#438)

```
pub struct Vec<T, A = Global>where
    A: Allocator,{ /* private fields */ }
```

Expand description

A contiguous growable array type, written as `Vec<T>`, short for ‘vector’.

## [§](#examples)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::new\(\);%0A++++vec.push\(1\);%0A++++vec.push\(2\);%0A++++%0A++++assert_eq!\(vec.len\(\),+2\);%0A++++assert_eq!\(vec%5B0%5D,+1\);%0A++++%0A++++assert_eq!\(vec.pop\(\),+Some\(2\)\);%0A++++assert_eq!\(vec.len\(\),+1\);%0A++++%0A++++vec%5B0%5D+=+7;%0A++++assert_eq!\(vec%5B0%5D,+7\);%0A++++%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++%0A++++for+x+in+%26vec+%7B%0A++++++++println!\(%22%7Bx%7D%22\);%0A++++%7D%0A++++assert_eq!\(vec,+%5B7,+1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

The [`vec!`](../macro.vec.html "macro std::vec") macro is provided for convenient initialization:

```
let mut vec1 = vec![1, 2, 3];
vec1.push(4);
let vec2 = Vec::from([1, 2, 3, 4]);
assert_eq!(vec1, vec2);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec1+=+vec!%5B1,+2,+3%5D;%0A++++vec1.push\(4\);%0A++++let+vec2+=+Vec::from\(%5B1,+2,+3,+4%5D\);%0A++++assert_eq!\(vec1,+vec2\);%0A%7D&edition=2024 "Run code")

It can also initialize each element of a `Vec<T>` with a given value. This may be more efficient than performing allocation and initialization in separate steps, especially when initializing a vector of zeros:

```
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

// The following is equivalent, but potentially slower:
let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+vec+=+vec!%5B0;+5%5D;%0A++++assert_eq!\(vec,+%5B0,+0,+0,+0,+0%5D\);%0A++++%0A++++//+The+following+is+equivalent,+but+potentially+slower:%0A++++let+mut+vec+=+Vec::with_capacity\(5\);%0A++++vec.resize\(5,+0\);%0A++++assert_eq!\(vec,+%5B0,+0,+0,+0,+0%5D\);%0A%7D&edition=2024 "Run code")

For more information, see [Capacity and Reallocation](#capacity-and-reallocation).

Use a `Vec<T>` as an efficient stack:

```
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    // Prints 3, 2, 1
    println!("{top}");
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+stack+=+Vec::new\(\);%0A++++%0A++++stack.push\(1\);%0A++++stack.push\(2\);%0A++++stack.push\(3\);%0A++++%0A++++while+let+Some\(top\)+=+stack.pop\(\)+%7B%0A++++++++//+Prints+3,+2,+1%0A++++++++println!\(%22%7Btop%7D%22\);%0A++++%7D%0A%7D&edition=2024 "Run code")

## [§](#indexing)Indexing

The `Vec` type allows access to values by index, because it implements the [`Index`](../ops/trait.Index.html "trait std::ops::Index") trait. An example will be more explicit:

```
let v = vec![0, 2, 4, 6];
println!("{}", v[1]); // it will display '2'
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+vec!%5B0,+2,+4,+6%5D;%0A++++println!\(%22%7B%7D%22,+v%5B1%5D\);%0A%7D&edition=2024 "Run code")

However be careful: if you try to access an index which isn’t in the `Vec`, your software will panic! You cannot do this:

[ⓘ](# "This example panics")

```
let v = vec![0, 2, 4, 6];
println!("{}", v[6]); // it will panic!
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+vec!%5B0,+2,+4,+6%5D;%0A++++println!\(%22%7B%7D%22,+v%5B6%5D\);%0A%7D&edition=2024 "Run code")

Use [`get`](../primitive.slice.html#method.get "method slice::get") and [`get_mut`](../primitive.slice.html#method.get_mut "method slice::get_mut") if you want to check whether the index is in the `Vec`.

## [§](#slicing)Slicing

A `Vec` can be mutable. On the other hand, slices are read-only objects. To get a [slice](../primitive.slice.html "primitive slice"), use [`&`](../primitive.reference.html "primitive reference"). Example:

```
fn read_slice(slice: &[usize]) {
    // ...
}

let v = vec![0, 1];
read_slice(&v);

// ... and that's all!
// you can also do it like this:
let u: &[usize] = &v;
// or like this:
let u: &[_] = &v;
```

%5D%0Afn+main\(\)+%7B%0A++++fn+read_slice\(slice:+%26%5Busize%5D\)+%7B%0A++++++++//+...%0A++++%7D%0A++++%0A++++let+v+=+vec!%5B0,+1%5D;%0A++++read_slice\(%26v\);%0A++++%0A++++//+...+and+that's+all!%0A++++//+you+can+also+do+it+like+this:%0A++++let+u:+%26%5Busize%5D+=+%26v;%0A++++//+or+like+this:%0A++++let+u:+%26%5B_%5D+=+%26v;%0A%7D&edition=2024 "Run code")

In Rust, it’s more common to pass slices as arguments rather than vectors when you just want to provide read access. The same goes for [`String`](../string/struct.String.html "struct std::string::String") and [`&str`](../primitive.str.html "primitive str").

## [§](#capacity-and-reallocation)Capacity and reallocation

The capacity of a vector is the amount of space allocated for any future elements that will be added onto the vector. This is not to be confused with the _length_ of a vector, which specifies the number of actual elements within the vector. If a vector’s length exceeds its capacity, its capacity will automatically be increased, but its elements will have to be reallocated.

For example, a vector with capacity 10 and length 0 would be an empty vector with space for 10 more elements. Pushing 10 or fewer elements onto the vector will not change its capacity or cause reallocation to occur. However, if the vector’s length is increased to 11, it will have to reallocate, which can be slow. For this reason, it is recommended to use [`Vec::with_capacity`](struct.Vec.html#method.with_capacity "associated function std::vec::Vec::with_capacity") whenever possible to specify how big the vector is expected to get.

## [§](#guarantees)Guarantees

Due to its incredibly fundamental nature, `Vec` makes a lot of guarantees about its design. This ensures that it’s as low-overhead as possible in the general case, and can be correctly manipulated in primitive ways by unsafe code. Note that these guarantees refer to an unqualified `Vec<T>`. If additional type parameters are added (e.g., to support custom allocators), overriding their defaults may change the behavior.

Most fundamentally, `Vec` is and always will be a (pointer, capacity, length) triplet. No more, no less. The order of these fields is completely unspecified, and you should use the appropriate methods to modify these. The pointer will never be null, so this type is null-pointer-optimized.

However, the pointer might not actually point to allocated memory. In particular, if you construct a `Vec` with capacity 0 via [`Vec::new`](struct.Vec.html#method.new "associated function std::vec::Vec::new"), [`vec![]`](../macro.vec.html "macro std::vec"), [`Vec::with_capacity(0)`](struct.Vec.html#method.with_capacity "associated function std::vec::Vec::with_capacity"), or by calling [`shrink_to_fit`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit") on an empty Vec, it will not allocate memory. Similarly, if you store zero-sized types inside a `Vec`, it will not allocate space for them. _Note that in this case the `Vec` might not report a [`capacity`](struct.Vec.html#method.capacity "method std::vec::Vec::capacity") of 0_. `Vec` will allocate if and only if `[size_of::<T>](../mem/fn.size_of.html "fn std::mem::size_of")() * [capacity](struct.Vec.html#method.capacity "method std::vec::Vec::capacity")() > 0`. In general, `Vec`’s allocation details are very subtle — if you intend to allocate memory using a `Vec` and use it for something else (either to pass to unsafe code, or to build your own memory-backed collection), be sure to deallocate this memory by using `from_raw_parts` to recover the `Vec` and then dropping it.

If a `Vec` _has_ allocated memory, then the memory it points to is on the heap (as defined by the allocator Rust is configured to use by default), and its pointer points to [`len`](struct.Vec.html#method.len "method std::vec::Vec::len") initialized, contiguous elements in order (what you would see if you coerced it to a slice), followed by `[capacity](struct.Vec.html#method.capacity "method std::vec::Vec::capacity") - [len](struct.Vec.html#method.len "method std::vec::Vec::len")` logically uninitialized, contiguous elements.

A vector containing the elements `'a'` and `'b'` with capacity 4 can be visualized as below. The top part is the `Vec` struct, it contains a pointer to the head of the allocation in the heap, length and capacity. The bottom part is the allocation on the heap, a contiguous memory block.

```
            ptr      len  capacity
       +--------+--------+--------+
       | 0x0123 |      2 |      4 |
       +--------+--------+--------+
            |
            v
Heap   +--------+--------+--------+--------+
       |    'a' |    'b' | uninit | uninit |
       +--------+--------+--------+--------+
```

* **uninit** represents memory that is not initialized, see [`MaybeUninit`](../mem/union.MaybeUninit.html "union std::mem::MaybeUninit").
* Note: the ABI is not stable and `Vec` makes no guarantees about its memory layout (including the order of fields).

`Vec` will never perform a “small optimization” where elements are actually stored on the stack for two reasons:

* It would make it more difficult for unsafe code to correctly manipulate a `Vec`. The contents of a `Vec` wouldn’t have a stable address if it were only moved, and it would be more difficult to determine if a `Vec` had actually allocated memory.
    
* It would penalize the general case, incurring an additional branch on every access.

`Vec` will never automatically shrink itself, even if completely empty. This ensures no unnecessary allocations or deallocations occur. Emptying a `Vec` and then filling it back up to the same [`len`](struct.Vec.html#method.len "method std::vec::Vec::len") should incur no calls to the allocator. If you wish to free up unused memory, use [`shrink_to_fit`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit") or [`shrink_to`](struct.Vec.html#method.shrink_to "method std::vec::Vec::shrink_to").

[`push`](struct.Vec.html#method.push "method std::vec::Vec::push") and [`insert`](struct.Vec.html#method.insert "method std::vec::Vec::insert") will never (re)allocate if the reported capacity is sufficient. [`push`](struct.Vec.html#method.push "method std::vec::Vec::push") and [`insert`](struct.Vec.html#method.insert "method std::vec::Vec::insert") _will_ (re)allocate if `[len](struct.Vec.html#method.len "method std::vec::Vec::len") == [capacity](struct.Vec.html#method.capacity "method std::vec::Vec::capacity")`. That is, the reported capacity is completely accurate, and can be relied on. It can even be used to manually free the memory allocated by a `Vec` if desired. Bulk insertion methods _may_ reallocate, even when not necessary.

`Vec` does not guarantee any particular growth strategy when reallocating when full, nor when [`reserve`](struct.Vec.html#method.reserve "method std::vec::Vec::reserve") is called. The current strategy is basic and it may prove desirable to use a non-constant growth factor. Whatever strategy is used will of course guarantee _O_(1) amortized [`push`](struct.Vec.html#method.push "method std::vec::Vec::push").

It is guaranteed, in order to respect the intentions of the programmer, that all of `vec![e_1, e_2, ..., e_n]`, `vec![x; n]`, and [`Vec::with_capacity(n)`](struct.Vec.html#method.with_capacity "associated function std::vec::Vec::with_capacity") produce a `Vec` that requests an allocation of the exact size needed for precisely `n` elements from the allocator, and no other size (such as, for example: a size rounded up to the nearest power of 2). The allocator will return an allocation that is at least as large as requested, but it may be larger.

It is guaranteed that the [`Vec::capacity`](struct.Vec.html#method.capacity "method std::vec::Vec::capacity") method returns a value that is at least the requested capacity and not more than the allocated capacity.

The method [`Vec::shrink_to_fit`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit") will attempt to discard excess capacity an allocator has given to a `Vec`. If `[len](struct.Vec.html#method.len "method std::vec::Vec::len") == [capacity](struct.Vec.html#method.capacity "method std::vec::Vec::capacity")`, then a `Vec<T>` can be converted to and from a [`Box<[T]>`](../boxed/struct.Box.html "struct std::boxed::Box") without reallocating or moving the elements. `Vec` exploits this fact as much as reasonable when implementing common conversions such as [`into_boxed_slice`](struct.Vec.html#method.into_boxed_slice "method std::vec::Vec::into_boxed_slice").

`Vec` will not specifically overwrite any data that is removed from it, but also won’t specifically preserve it. Its uninitialized memory is scratch space that it may use however it wants. It will generally just do whatever is most efficient or otherwise easy to implement. Do not rely on removed data to be erased for security purposes. Even if you drop a `Vec`, its buffer may simply be reused by another allocation. Even if you zero a `Vec`’s memory first, that might not actually happen because the optimizer does not consider this a side-effect that must be preserved. There is one case which we will not break, however: using `unsafe` code to write to the excess capacity, and then increasing the length to match, is always valid.

Currently, `Vec` does not guarantee the order in which elements are dropped. The order has changed in the past and may change again.

[Source](../../src/alloc/vec/mod.rs.html#447)[§](#impl-Vec%3CT%3E)

### impl<T> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

1.0.0 (const: 1.39.0) · [Source](../../src/alloc/vec/mod.rs.html#463)

#### pub const fn [new](#method.new)() -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Constructs a new, empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

##### [§](#examples-1)Examples

```
let mut vec: Vec<i32> = Vec::new();
```

%5D%0A%23!%5Ballow\(unused_mut\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+mut+vec:+Vec%3Ci32%3E+=+Vec::new\(\);%0A%7D&edition=2024 "Run code")

1.0.0 (const: [unstable](https://github.com/rust-lang/rust/issues/79597 "Tracking issue for const_heap")) · [Source](../../src/alloc/vec/mod.rs.html#523)

#### pub fn [with\_capacity](#method.with_capacity)(capacity: [usize](../primitive.usize.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Constructs a new, empty `Vec<T>` with at least the specified capacity.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

It is important to note that although the returned vector has the minimum _capacity_ specified, the vector will have a zero _length_. For an explanation of the difference between length and capacity, see _[Capacity and reallocation](#capacity-and-reallocation)_.

If it is important to know the exact allocated capacity of a `Vec`, always use the [`capacity`](struct.Vec.html#method.capacity "method std::vec::Vec::capacity") method after construction.

For `Vec<T>` where `T` is a zero-sized type, there will be no allocation and the capacity will always be `usize::MAX`.

##### [§](#panics)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-2)Examples

```
let mut vec = Vec::with_capacity(10);

// The vector contains no items, even though it has capacity for more
assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

// These are all done without reallocating...
for i in 0..10 {
    vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

// ...but this may make the vector reallocate
vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

// A vector of a zero-sized type will always over-allocate, since no
// allocation is necessary
let vec_units = Vec::<()>::with_capacity(10);
assert_eq!(vec_units.capacity(), usize::MAX);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++%0A++++//+The+vector+contains+no+items,+even+though+it+has+capacity+for+more%0A++++assert_eq!\(vec.len\(\),+0\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++%0A++++//+These+are+all+done+without+reallocating...%0A++++for+i+in+0..10+%7B%0A++++++++vec.push\(i\);%0A++++%7D%0A++++assert_eq!\(vec.len\(\),+10\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++%0A++++//+...but+this+may+make+the+vector+reallocate%0A++++vec.push\(11\);%0A++++assert_eq!\(vec.len\(\),+11\);%0A++++assert!\(vec.capacity\(\)+%3E=+11\);%0A++++%0A++++//+A+vector+of+a+zero-sized+type+will+always+over-allocate,+since+no%0A++++//+allocation+is+necessary%0A++++let+vec_units+=+Vec::%3C\(\)%3E::with_capacity\(10\);%0A++++assert_eq!\(vec_units.capacity\(\),+usize::MAX\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#539)

#### pub fn [try\_with\_capacity](#method.try_with_capacity)(capacity: [usize](../primitive.usize.html)) -> [Result](../result/enum.Result.html "enum std::result::Result")<[Vec](struct.Vec.html "struct std::vec::Vec")<T>, [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

🔬This is a nightly-only experimental API. (`try_with_capacity` [#91913](https://github.com/rust-lang/rust/issues/91913))

Constructs a new, empty `Vec<T>` with at least the specified capacity.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

##### [§](#errors)Errors

Returns an error if the capacity exceeds `isize::MAX` _bytes_, or if the allocator reports allocation failure.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#643)

#### pub unsafe fn [from\_raw\_parts](#method.from_raw_parts)( ptr: [\*mut T](../primitive.pointer.html), length: [usize](../primitive.usize.html), capacity: [usize](../primitive.usize.html), ) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Creates a `Vec<T>` directly from a pointer, a length, and a capacity.

##### [§](#safety)Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* If `T` is not a zero-sized type and the capacity is nonzero, `ptr` must have been allocated using the global allocator, such as via the [`alloc::alloc`](../alloc/fn.alloc.html "fn std::alloc::alloc") function. If `T` is a zero-sized type or the capacity is zero, `ptr` need only be non-null and aligned.
* `T` needs to have the same alignment as what `ptr` was allocated with, if the pointer is required to be allocated. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes), if nonzero, needs to be the same size as the pointer was allocated with. (Because similar to alignment, [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to be the capacity that the pointer was allocated with, if the pointer is required to be allocated.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of [`pointer::offset`](../primitive.pointer.html#method.offset "method pointer::offset").

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is normally **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`, doing so is only safe if the array was initially allocated by a `Vec` or `String`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1. To avoid these issues, it is often preferable to do casting/transmuting using [`slice::from_raw_parts`](../slice/fn.from_raw_parts.html "fn std::slice::from_raw_parts") instead.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### [§](#examples-3)Examples

```
use std::ptr;

let v = vec![1, 2, 3];

// Deconstruct the vector into parts.
let (p, len, cap) = v.into_raw_parts();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::ptr;%0A++++%0A++++let+v+=+vec!%5B1,+2,+3%5D;%0A++++%0A++++//+Deconstruct+the+vector+into+parts.%0A++++let+\(p,+len,+cap\)+=+v.into_raw_parts\(\);%0A++++%0A++++unsafe+%7B%0A++++++++//+Overwrite+memory+with+4,+5,+6%0A++++++++for+i+in+0..len+%7B%0A++++++++++++ptr::write\(p.add\(i\),+4+%2B+i\);%0A++++++++%7D%0A++++%0A++++++++//+Put+everything+back+together+into+a+Vec%0A++++++++let+rebuilt+=+Vec::from_raw_parts\(p,+len,+cap\);%0A++++++++assert_eq!\(rebuilt,+%5B4,+5,+6%5D\);%0A++++%7D%0A%7D&edition=2024 "Run code")

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

%5D%0Ause+std::alloc::%7Balloc,+Layout%7D;%0A%0Afn+main\(\)+%7B%0A++++let+layout+=+Layout::array::%3Cu32%3E\(16\).expect\(%22overflow+cannot+happen%22\);%0A%0A++++let+vec+=+unsafe+%7B%0A++++++++let+mem+=+alloc\(layout\).cast::%3Cu32%3E\(\);%0A++++++++if+mem.is_null\(\)+%7B%0A++++++++++++return;%0A++++++++%7D%0A%0A++++++++mem.write\(1_000_000\);%0A%0A++++++++Vec::from_raw_parts\(mem,+1,+16\)%0A++++%7D;%0A%0A++++assert_eq!\(vec,+%26%5B1_000_000%5D\);%0A++++assert_eq!\(vec.capacity\(\),+16\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#745)

#### pub unsafe fn [from\_parts](#method.from_parts)( ptr: [NonNull](../ptr/struct.NonNull.html "struct std::ptr::NonNull")<T>, length: [usize](../primitive.usize.html), capacity: [usize](../primitive.usize.html), ) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

🔬This is a nightly-only experimental API. (`box_vec_non_null` [#130364](https://github.com/rust-lang/rust/issues/130364))

Creates a `Vec<T>` directly from a `NonNull` pointer, a length, and a capacity.

##### [§](#safety-1)Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must have been allocated using the global allocator, such as via the [`alloc::alloc`](../alloc/fn.alloc.html "fn std::alloc::alloc") function.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to be the capacity that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of [`pointer::offset`](../primitive.pointer.html#method.offset "method pointer::offset").

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is normally **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`, doing so is only safe if the array was initially allocated by a `Vec` or `String`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1. To avoid these issues, it is often preferable to do casting/transmuting using [`NonNull::slice_from_raw_parts`](../ptr/struct.NonNull.html#method.slice_from_raw_parts "associated function std::ptr::NonNull::slice_from_raw_parts") instead.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### [§](#examples-4)Examples

```
#![feature(box_vec_non_null)]

let v = vec![1, 2, 3];

// Deconstruct the vector into parts.
let (p, len, cap) = v.into_parts();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        p.add(i).write(4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

%5D%0A%23!%5Bfeature\(box_vec_non_null\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+v+=+vec!%5B1,+2,+3%5D;%0A++++%0A++++//+Deconstruct+the+vector+into+parts.%0A++++let+\(p,+len,+cap\)+=+v.into_parts\(\);%0A++++%0A++++unsafe+%7B%0A++++++++//+Overwrite+memory+with+4,+5,+6%0A++++++++for+i+in+0..len+%7B%0A++++++++++++p.add\(i\).write\(4+%2B+i\);%0A++++++++%7D%0A++++%0A++++++++//+Put+everything+back+together+into+a+Vec%0A++++++++let+rebuilt+=+Vec::from_parts\(p,+len,+cap\);%0A++++++++assert_eq!\(rebuilt,+%5B4,+5,+6%5D\);%0A++++%7D%0A%7D&version=nightly&edition=2024 "Run code")

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

%5D%0A%23!%5Bfeature\(box_vec_non_null\)%5D%0A%0A%0Ause+std::alloc::%7Balloc,+Layout%7D;%0Ause+std::ptr::NonNull;%0A%0Afn+main\(\)+%7B%0A++++let+layout+=+Layout::array::%3Cu32%3E\(16\).expect\(%22overflow+cannot+happen%22\);%0A%0A++++let+vec+=+unsafe+%7B%0A++++++++let+Some\(mem\)+=+NonNull::new\(alloc\(layout\).cast::%3Cu32%3E\(\)\)+else+%7B%0A++++++++++++return;%0A++++++++%7D;%0A%0A++++++++mem.write\(1_000_000\);%0A%0A++++++++Vec::from_parts\(mem,+1,+16\)%0A++++%7D;%0A%0A++++assert_eq!\(vec,+%26%5B1_000_000%5D\);%0A++++assert_eq!\(vec.capacity\(\),+16\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#795-797)

#### pub fn [from\_fn](#method.from_fn)<F>(length: [usize](../primitive.usize.html), f: F) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([usize](../primitive.usize.html)) -> T,

🔬This is a nightly-only experimental API. (`vec_from_fn` [#149698](https://github.com/rust-lang/rust/issues/149698))

Creates a `Vec<T>` where each element is produced by calling `f` with that element’s index while walking forward through the `Vec<T>`.

This is essentially the same as writing

```
vec![f(0), f(1), f(2), …, f(length - 2), f(length - 1)]
```

and is similar to `(0..i).map(f)`, just for `Vec<T>`s not iterators.

If `length == 0`, this produces an empty `Vec<T>` without ever calling `f`.

##### [§](#example)Example

```
#![feature(vec_from_fn)]

let vec = Vec::from_fn(5, |i| i);

// indexes are:  0  1  2  3  4
assert_eq!(vec, [0, 1, 2, 3, 4]);

let vec2 = Vec::from_fn(8, |i| i * 2);

// indexes are:   0  1  2  3  4  5   6   7
assert_eq!(vec2, [0, 2, 4, 6, 8, 10, 12, 14]);

let bool_vec = Vec::from_fn(5, |i| i % 2 == 0);

// indexes are:       0     1      2     3      4
assert_eq!(bool_vec, [true, false, true, false, true]);
```

%5D%0A%23!%5Bfeature\(vec_from_fn\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+vec+=+Vec::from_fn\(5,+%7Ci%7C+i\);%0A++++%0A++++//+indexes+are:++0++1++2++3++4%0A++++assert_eq!\(vec,+%5B0,+1,+2,+3,+4%5D\);%0A++++%0A++++let+vec2+=+Vec::from_fn\(8,+%7Ci%7C+i+*+2\);%0A++++%0A++++//+indexes+are:+++0++1++2++3++4++5+++6+++7%0A++++assert_eq!\(vec2,+%5B0,+2,+4,+6,+8,+10,+12,+14%5D\);%0A++++%0A++++let+bool_vec+=+Vec::from_fn\(5,+%7Ci%7C+i+%25+2+==+0\);%0A++++%0A++++//+indexes+are:+++++++0+++++1++++++2+++++3++++++4%0A++++assert_eq!\(bool_vec,+%5Btrue,+false,+true,+false,+true%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

The `Vec<T>` is generated in ascending index order, starting from the front and going towards the back, so you can use closures with mutable state:

```
#![feature(vec_from_fn)]

let mut state = 1;
let a = Vec::from_fn(6, |_| { let x = state; state *= 2; x });

assert_eq!(a, [1, 2, 4, 8, 16, 32]);
```

%5D%0A%23!%5Bfeature\(vec_from_fn\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+state+=+1;%0A++++let+a+=+Vec::from_fn\(6,+%7C_%7C+%7B+let+x+=+state;+state+*=+2;+x+%7D\);%0A++++%0A++++assert_eq!\(a,+%5B1,+2,+4,+8,+16,+32%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.93.0 · [Source](../../src/alloc/vec/mod.rs.html#839)

#### pub fn [into\_raw\_parts](#method.into_raw_parts)(self) -> ([\*mut T](../primitive.pointer.html), [usize](../primitive.usize.html), [usize](../primitive.usize.html))

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity)`.

Returns the raw pointer to the underlying data, the length of the vector (in elements), and the allocated capacity of the data (in elements). These are the same arguments in the same order as the arguments to [`from_raw_parts`](struct.Vec.html#method.from_raw_parts "associated function std::vec::Vec::from_raw_parts").

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. Most often, one does this by converting the raw pointer, length, and capacity back into a `Vec` with the [`from_raw_parts`](struct.Vec.html#method.from_raw_parts "associated function std::vec::Vec::from_raw_parts") function; more generally, if `T` is non-zero-sized and the capacity is nonzero, one may use any method that calls [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") with a layout of `Layout::array::<T>(capacity)`; if `T` is zero-sized or the capacity is zero, nothing needs to be done.

##### [§](#examples-5)Examples

```
let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_raw_parts();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+v:+Vec%3Ci32%3E+=+vec!%5B-1,+0,+1%5D;%0A++++%0A++++let+\(ptr,+len,+cap\)+=+v.into_raw_parts\(\);%0A++++%0A++++let+rebuilt+=+unsafe+%7B%0A++++++++//+We+can+now+make+changes+to+the+components,+such+as%0A++++++++//+transmuting+the+raw+pointer+to+a+compatible+type.%0A++++++++let+ptr+=+ptr+as+*mut+u32;%0A++++%0A++++++++Vec::from_raw_parts\(ptr,+len,+cap\)%0A++++%7D;%0A++++assert_eq!\(rebuilt,+%5B4294967295,+0,+1%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#880)

#### pub fn [into\_parts](#method.into_parts)(self) -> ([NonNull](../ptr/struct.NonNull.html "struct std::ptr::NonNull")<T>, [usize](../primitive.usize.html), [usize](../primitive.usize.html))

🔬This is a nightly-only experimental API. (`box_vec_non_null` [#130364](https://github.com/rust-lang/rust/issues/130364))

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity)`.

Returns the `NonNull` pointer to the underlying data, the length of the vector (in elements), and the allocated capacity of the data (in elements). These are the same arguments in the same order as the arguments to [`from_parts`](struct.Vec.html#method.from_parts "associated function std::vec::Vec::from_parts").

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the `NonNull` pointer, length, and capacity back into a `Vec` with the [`from_parts`](struct.Vec.html#method.from_parts "associated function std::vec::Vec::from_parts") function, allowing the destructor to perform the cleanup.

##### [§](#examples-6)Examples

```
#![feature(box_vec_non_null)]

let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_parts();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr.cast::<u32>();

    Vec::from_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

%5D%0A%23!%5Bfeature\(box_vec_non_null\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+v:+Vec%3Ci32%3E+=+vec!%5B-1,+0,+1%5D;%0A++++%0A++++let+\(ptr,+len,+cap\)+=+v.into_parts\(\);%0A++++%0A++++let+rebuilt+=+unsafe+%7B%0A++++++++//+We+can+now+make+changes+to+the+components,+such+as%0A++++++++//+transmuting+the+raw+pointer+to+a+compatible+type.%0A++++++++let+ptr+=+ptr.cast::%3Cu32%3E\(\);%0A++++%0A++++++++Vec::from_parts\(ptr,+len,+cap\)%0A++++%7D;%0A++++assert_eq!\(rebuilt,+%5B4294967295,+0,+1%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#893-895)

#### pub const fn [const\_make\_global](#method.const_make_global)(self) -> &'static [\[T\]](../primitive.slice.html)

where T: [Freeze](../marker/trait.Freeze.html "trait std::marker::Freeze"),

🔬This is a nightly-only experimental API. (`const_heap` [#79597](https://github.com/rust-lang/rust/issues/79597))

Interns the `Vec<T>`, making the underlying memory read-only. This method should be called during compile time. (This is a no-op if called during runtime)

This method must be called if the memory used by `Vec` needs to appear in the final values of constants.

[Source](../../src/alloc/vec/mod.rs.html#906)[§](#impl-Vec%3CT,+A%3E)

### impl<T, A> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#964)

#### pub const fn [with\_capacity\_in](#method.with_capacity_in)(capacity: [usize](../primitive.usize.html), alloc: A) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Constructs a new, empty `Vec<T, A>` with at least the specified capacity with the provided allocator.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

It is important to note that although the returned vector has the minimum _capacity_ specified, the vector will have a zero _length_. For an explanation of the difference between length and capacity, see _[Capacity and reallocation](#capacity-and-reallocation)_.

If it is important to know the exact allocated capacity of a `Vec`, always use the [`capacity`](struct.Vec.html#method.capacity "method std::vec::Vec::capacity") method after construction.

For `Vec<T, A>` where `T` is a zero-sized type, there will be no allocation and the capacity will always be `usize::MAX`.

##### [§](#panics-1)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-7)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut vec = Vec::with_capacity_in(10, System);

// The vector contains no items, even though it has capacity for more
assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

// These are all done without reallocating...
for i in 0..10 {
    vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

// ...but this may make the vector reallocate
vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

// A vector of a zero-sized type will always over-allocate, since no
// allocation is necessary
let vec_units = Vec::<(), System>::with_capacity_in(10, System);
assert_eq!(vec_units.capacity(), usize::MAX);
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++let+mut+vec+=+Vec::with_capacity_in\(10,+System\);%0A++++%0A++++//+The+vector+contains+no+items,+even+though+it+has+capacity+for+more%0A++++assert_eq!\(vec.len\(\),+0\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++%0A++++//+These+are+all+done+without+reallocating...%0A++++for+i+in+0..10+%7B%0A++++++++vec.push\(i\);%0A++++%7D%0A++++assert_eq!\(vec.len\(\),+10\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++%0A++++//+...but+this+may+make+the+vector+reallocate%0A++++vec.push\(11\);%0A++++assert_eq!\(vec.len\(\),+11\);%0A++++assert!\(vec.capacity\(\)+%3E=+11\);%0A++++%0A++++//+A+vector+of+a+zero-sized+type+will+always+over-allocate,+since+no%0A++++//+allocation+is+necessary%0A++++let+vec_units+=+Vec::%3C\(\),+System%3E::with_capacity_in\(10,+System\);%0A++++assert_eq!\(vec_units.capacity\(\),+usize::MAX\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 (const: [unstable](https://github.com/rust-lang/rust/issues/79597 "Tracking issue for const_heap")) · [Source](../../src/alloc/vec/mod.rs.html#991)

#### pub fn [push](#method.push)(&mut self, value: T)

Appends an element to the back of a collection.

##### [§](#panics-2)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-8)Examples

```
let mut vec = vec![1, 2];
vec.push(3);
assert_eq!(vec, [1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2%5D;%0A++++vec.push\(3\);%0A++++assert_eq!\(vec,+%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

##### [§](#time-complexity)Time complexity

Takes amortized _O_(1) time. If the vector’s length would exceed its capacity after the push, _O_(_capacity_) time is taken to copy the vector’s elements to a larger allocation. This expensive operation is offset by the _capacity_ _O_(1) insertions it allows.

1.95.0 (const: [unstable](https://github.com/rust-lang/rust/issues/79597 "Tracking issue for const_heap")) · [Source](../../src/alloc/vec/mod.rs.html#1023)

#### pub fn [push\_mut](#method.push_mut)(&mut self, value: T) -> [&mut T](../primitive.reference.html)

Appends an element to the back of a collection, returning a reference to it.

##### [§](#panics-3)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-9)Examples

```
let mut vec = vec![1, 2];
let last = vec.push_mut(3);
assert_eq!(*last, 3);
assert_eq!(vec, [1, 2, 3]);

let last = vec.push_mut(3);
*last += 1;
assert_eq!(vec, [1, 2, 3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2%5D;%0A++++let+last+=+vec.push_mut\(3\);%0A++++assert_eq!\(*last,+3\);%0A++++assert_eq!\(vec,+%5B1,+2,+3%5D\);%0A++++%0A++++let+last+=+vec.push_mut\(3\);%0A++++*last+%2B=+1;%0A++++assert_eq!\(vec,+%5B1,+2,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

##### [§](#time-complexity-1)Time complexity

Takes amortized _O_(1) time. If the vector’s length would exceed its capacity after the push, _O_(_capacity_) time is taken to copy the vector’s elements to a larger allocation. This expensive operation is offset by the _capacity_ _O_(1) insertions it allows.

[Source](../../src/alloc/vec/mod.rs.html#1041)[§](#impl-Vec%3CT,+A%3E-1)

### impl<T, A> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#1058)

#### pub const fn [new\_in](#method.new_in)(alloc: A) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Constructs a new, empty `Vec<T, A>`.

The vector will not allocate until elements are pushed onto it.

##### [§](#examples-10)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut vec: Vec<i32, _> = Vec::new_in(System);
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++%23%5Ballow\(unused_mut\)%5D%0A++++let+mut+vec:+Vec%3Ci32,+_%3E+=+Vec::new_in\(System\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1076)

#### pub fn [try\_with\_capacity\_in](#method.try_with_capacity_in)( capacity: [usize](../primitive.usize.html), alloc: A, ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>, [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Constructs a new, empty `Vec<T, A>` with at least the specified capacity with the provided allocator.

The vector will be able to hold at least `capacity` elements without reallocating. This method is allowed to allocate for more elements than `capacity`. If `capacity` is zero, the vector will not allocate.

##### [§](#errors-1)Errors

Returns an error if the capacity exceeds `isize::MAX` _bytes_, or if the allocator reports allocation failure.

[Source](../../src/alloc/vec/mod.rs.html#1181)

#### pub unsafe fn [from\_raw\_parts\_in](#method.from_raw_parts_in)( ptr: [\*mut T](../primitive.pointer.html), length: [usize](../primitive.usize.html), capacity: [usize](../primitive.usize.html), alloc: A, ) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Creates a `Vec<T, A>` directly from a pointer, a length, a capacity, and an allocator.

##### [§](#safety-2)Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must be [_currently allocated_](../alloc/trait.Allocator.html#currently-allocated-memory "trait std::alloc::Allocator") via the given allocator `alloc`.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to [_fit_](../alloc/trait.Allocator.html#memory-fitting "trait std::alloc::Allocator") the layout size that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of [`pointer::offset`](../primitive.pointer.html#method.offset "method pointer::offset").

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T, A>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### [§](#examples-11)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

use std::ptr;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

// Deconstruct the vector into parts.
let (p, len, cap, alloc) = v.into_raw_parts_with_alloc();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts_in(p, len, cap, alloc.clone());
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++use+std::ptr;%0A++++%0A++++let+mut+v+=+Vec::with_capacity_in\(3,+System\);%0A++++v.push\(1\);%0A++++v.push\(2\);%0A++++v.push\(3\);%0A++++%0A++++//+Deconstruct+the+vector+into+parts.%0A++++let+\(p,+len,+cap,+alloc\)+=+v.into_raw_parts_with_alloc\(\);%0A++++%0A++++unsafe+%7B%0A++++++++//+Overwrite+memory+with+4,+5,+6%0A++++++++for+i+in+0..len+%7B%0A++++++++++++ptr::write\(p.add\(i\),+4+%2B+i\);%0A++++++++%7D%0A++++%0A++++++++//+Put+everything+back+together+into+a+Vec%0A++++++++let+rebuilt+=+Vec::from_raw_parts_in\(p,+len,+cap,+alloc.clone\(\)\);%0A++++++++assert_eq!\(rebuilt,+%5B4,+5,+6%5D\);%0A++++%7D%0A%7D&version=nightly&edition=2024 "Run code")

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

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Ause+std::alloc::%7BAllocError,+Allocator,+Global,+Layout%7D;%0A%0Afn+main\(\)+%7B%0A++++let+layout+=+Layout::array::%3Cu32%3E\(16\).expect\(%22overflow+cannot+happen%22\);%0A%0A++++let+vec+=+unsafe+%7B%0A++++++++let+mem+=+match+Global.allocate\(layout\)+%7B%0A++++++++++++Ok\(mem\)+=%3E+mem.cast::%3Cu32%3E\(\).as_ptr\(\),%0A++++++++++++Err\(AllocError\)+=%3E+return,%0A++++++++%7D;%0A%0A++++++++mem.write\(1_000_000\);%0A%0A++++++++Vec::from_raw_parts_in\(mem,+1,+16,+Global\)%0A++++%7D;%0A%0A++++assert_eq!\(vec,+%26%5B1_000_000%5D\);%0A++++assert_eq!\(vec.capacity\(\),+16\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1291)

#### pub unsafe fn [from\_parts\_in](#method.from_parts_in)( ptr: [NonNull](../ptr/struct.NonNull.html "struct std::ptr::NonNull")<T>, length: [usize](../primitive.usize.html), capacity: [usize](../primitive.usize.html), alloc: A, ) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Creates a `Vec<T, A>` directly from a `NonNull` pointer, a length, a capacity, and an allocator.

##### [§](#safety-3)Safety

This is highly unsafe, due to the number of invariants that aren’t checked:

* `ptr` must be [_currently allocated_](../alloc/trait.Allocator.html#currently-allocated-memory "trait std::alloc::Allocator") via the given allocator `alloc`.
* `T` needs to have the same alignment as what `ptr` was allocated with. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") requirement that memory must be allocated and deallocated with the same layout.)
* The size of `T` times the `capacity` (ie. the allocated size in bytes) needs to be the same size as the pointer was allocated with. (Because similar to alignment, [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") must be called with the same layout `size`.)
* `length` needs to be less than or equal to `capacity`.
* The first `length` values must be properly initialized values of type `T`.
* `capacity` needs to [_fit_](../alloc/trait.Allocator.html#memory-fitting "trait std::alloc::Allocator") the layout size that the pointer was allocated with.
* The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of [`pointer::offset`](../primitive.pointer.html#method.offset "method pointer::offset").

These requirements are always upheld by any `ptr` that has been allocated via `Vec<T, A>`. Other allocation sources are allowed if the invariants are upheld.

Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is **not** safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1.

The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

##### [§](#examples-12)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

// Deconstruct the vector into parts.
let (p, len, cap, alloc) = v.into_parts_with_alloc();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        p.add(i).write(4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_parts_in(p, len, cap, alloc.clone());
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++let+mut+v+=+Vec::with_capacity_in\(3,+System\);%0A++++v.push\(1\);%0A++++v.push\(2\);%0A++++v.push\(3\);%0A++++%0A++++//+Deconstruct+the+vector+into+parts.%0A++++let+\(p,+len,+cap,+alloc\)+=+v.into_parts_with_alloc\(\);%0A++++%0A++++unsafe+%7B%0A++++++++//+Overwrite+memory+with+4,+5,+6%0A++++++++for+i+in+0..len+%7B%0A++++++++++++p.add\(i\).write\(4+%2B+i\);%0A++++++++%7D%0A++++%0A++++++++//+Put+everything+back+together+into+a+Vec%0A++++++++let+rebuilt+=+Vec::from_parts_in\(p,+len,+cap,+alloc.clone\(\)\);%0A++++++++assert_eq!\(rebuilt,+%5B4,+5,+6%5D\);%0A++++%7D%0A%7D&version=nightly&edition=2024 "Run code")

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

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Ause+std::alloc::%7BAllocError,+Allocator,+Global,+Layout%7D;%0A%0Afn+main\(\)+%7B%0A++++let+layout+=+Layout::array::%3Cu32%3E\(16\).expect\(%22overflow+cannot+happen%22\);%0A%0A++++let+vec+=+unsafe+%7B%0A++++++++let+mem+=+match+Global.allocate\(layout\)+%7B%0A++++++++++++Ok\(mem\)+=%3E+mem.cast::%3Cu32%3E\(\),%0A++++++++++++Err\(AllocError\)+=%3E+return,%0A++++++++%7D;%0A%0A++++++++mem.write\(1_000_000\);%0A%0A++++++++Vec::from_parts_in\(mem,+1,+16,+Global\)%0A++++%7D;%0A%0A++++assert_eq!\(vec,+%26%5B1_000_000%5D\);%0A++++assert_eq!\(vec.capacity\(\),+16\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1339)

#### pub fn [into\_raw\_parts\_with\_alloc](#method.into_raw_parts_with_alloc)(self) -> ([\*mut T](../primitive.pointer.html), [usize](../primitive.usize.html), [usize](../primitive.usize.html), A)

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity, allocator)`.

Returns the raw pointer to the underlying data, the length of the vector (in elements), the allocated capacity of the data (in elements), and the allocator. These are the same arguments in the same order as the arguments to [`from_raw_parts_in`](struct.Vec.html#method.from_raw_parts_in "associated function std::vec::Vec::from_raw_parts_in").

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the raw pointer, length, and capacity back into a `Vec` with the [`from_raw_parts_in`](struct.Vec.html#method.from_raw_parts_in "associated function std::vec::Vec::from_raw_parts_in") function, allowing the destructor to perform the cleanup.

##### [§](#examples-13)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_raw_parts_with_alloc();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++let+mut+v:+Vec%3Ci32,+System%3E+=+Vec::new_in\(System\);%0A++++v.push\(-1\);%0A++++v.push\(0\);%0A++++v.push\(1\);%0A++++%0A++++let+\(ptr,+len,+cap,+alloc\)+=+v.into_raw_parts_with_alloc\(\);%0A++++%0A++++let+rebuilt+=+unsafe+%7B%0A++++++++//+We+can+now+make+changes+to+the+components,+such+as%0A++++++++//+transmuting+the+raw+pointer+to+a+compatible+type.%0A++++++++let+ptr+=+ptr+as+*mut+u32;%0A++++%0A++++++++Vec::from_raw_parts_in\(ptr,+len,+cap,+alloc\)%0A++++%7D;%0A++++assert_eq!\(rebuilt,+%5B4294967295,+0,+1%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1389)

#### pub fn [into\_parts\_with\_alloc](#method.into_parts_with_alloc)(self) -> ([NonNull](../ptr/struct.NonNull.html "struct std::ptr::NonNull")<T>, [usize](../primitive.usize.html), [usize](../primitive.usize.html), A)

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity, allocator)`.

Returns the `NonNull` pointer to the underlying data, the length of the vector (in elements), the allocated capacity of the data (in elements), and the allocator. These are the same arguments in the same order as the arguments to [`from_parts_in`](struct.Vec.html#method.from_parts_in "associated function std::vec::Vec::from_parts_in").

After calling this function, the caller is responsible for the memory previously managed by the `Vec`. The only way to do this is to convert the `NonNull` pointer, length, and capacity back into a `Vec` with the [`from_parts_in`](struct.Vec.html#method.from_parts_in "associated function std::vec::Vec::from_parts_in") function, allowing the destructor to perform the cleanup.

##### [§](#examples-14)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_parts_with_alloc();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr.cast::<u32>();

    Vec::from_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++let+mut+v:+Vec%3Ci32,+System%3E+=+Vec::new_in\(System\);%0A++++v.push\(-1\);%0A++++v.push\(0\);%0A++++v.push\(1\);%0A++++%0A++++let+\(ptr,+len,+cap,+alloc\)+=+v.into_parts_with_alloc\(\);%0A++++%0A++++let+rebuilt+=+unsafe+%7B%0A++++++++//+We+can+now+make+changes+to+the+components,+such+as%0A++++++++//+transmuting+the+raw+pointer+to+a+compatible+type.%0A++++++++let+ptr+=+ptr.cast::%3Cu32%3E\(\);%0A++++%0A++++++++Vec::from_parts_in\(ptr,+len,+cap,+alloc\)%0A++++%7D;%0A++++assert_eq!\(rebuilt,+%5B4294967295,+0,+1%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#1421)

#### pub const fn [capacity](#method.capacity)(&self) -> [usize](../primitive.usize.html)

Returns the total number of elements the vector can hold without reallocating.

##### [§](#examples-15)Examples

```
let mut vec: Vec<i32> = Vec::with_capacity(10);
vec.push(42);
assert!(vec.capacity() >= 10);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec:+Vec%3Ci32%3E+=+Vec::with_capacity\(10\);%0A++++vec.push\(42\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A%7D&edition=2024 "Run code")

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

%5D%0A%23%5Bderive\(Clone\)%5D%0Astruct+ZeroSized;%0A%0Afn+main\(\)+%7B%0A++++assert_eq!\(std::mem::size_of::%3CZeroSized%3E\(\),+0\);%0A++++let+v+=+vec!%5BZeroSized;+0%5D;%0A++++assert_eq!\(v.capacity\(\),+usize::MAX\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#1445)

#### pub fn [reserve](#method.reserve)(&mut self, additional: [usize](../primitive.usize.html))

Reserves capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. The collection may reserve more space to speculatively avoid frequent reallocations. After calling `reserve`, capacity will be greater than or equal to `self.len() + additional`. Does nothing if capacity is already sufficient.

##### [§](#panics-4)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-16)Examples

```
let mut vec = vec![1];
vec.reserve(10);
assert!(vec.capacity() >= 11);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1%5D;%0A++++vec.reserve\(10\);%0A++++assert!\(vec.capacity\(\)+%3E=+11\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#1475)

#### pub fn [reserve\_exact](#method.reserve_exact)(&mut self, additional: [usize](../primitive.usize.html))

Reserves the minimum capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. Unlike [`reserve`](struct.Vec.html#method.reserve "method std::vec::Vec::reserve"), this will not deliberately over-allocate to speculatively avoid frequent allocations. After calling `reserve_exact`, capacity will be greater than or equal to `self.len() + additional`. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it requests. Therefore, capacity can not be relied upon to be precisely minimal. Prefer [`reserve`](struct.Vec.html#method.reserve "method std::vec::Vec::reserve") if future insertions are expected.

##### [§](#panics-5)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-17)Examples

```
let mut vec = vec![1];
vec.reserve_exact(10);
assert!(vec.capacity() >= 11);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1%5D;%0A++++vec.reserve_exact\(10\);%0A++++assert!\(vec.capacity\(\)+%3E=+11\);%0A%7D&edition=2024 "Run code")

1.57.0 · [Source](../../src/alloc/vec/mod.rs.html#1512)

#### pub fn [try\_reserve](#method.try_reserve)(&mut self, additional: [usize](../primitive.usize.html)) -> [Result](../result/enum.Result.html "enum std::result::Result")<[()](../primitive.unit.html), [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

Tries to reserve capacity for at least `additional` more elements to be inserted in the given `Vec<T>`. The collection may reserve more space to speculatively avoid frequent reallocations. After calling `try_reserve`, capacity will be greater than or equal to `self.len() + additional` if it returns `Ok(())`. Does nothing if capacity is already sufficient. This method preserves the contents even if an error occurs.

##### [§](#errors-2)Errors

If the capacity overflows, or the allocator reports a failure, then an error is returned.

##### [§](#examples-18)Examples

```
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::collections::TryReserveError;%0A++++%0A++++fn+process_data\(data:+%26%5Bu32%5D\)+-%3E+Result%3CVec%3Cu32%3E,+TryReserveError%3E+%7B%0A++++++++let+mut+output+=+Vec::new\(\);%0A++++%0A++++++++//+Pre-reserve+the+memory,+exiting+if+we+can't%0A++++++++output.try_reserve\(data.len\(\)\)?;%0A++++%0A++++++++//+Now+we+know+this+can't+OOM+in+the+middle+of+our+complex+work%0A++++++++output.extend\(data.iter\(\).map\(%7C%26val%7C+%7B%0A++++++++++++val+*+2+%2B+5+//+very+complicated%0A++++++++%7D\)\);%0A++++%0A++++++++Ok\(output\)%0A++++%7D%0A++++process_data\(%26%5B1,+2,+3%5D\).expect\(%22why+is+the+test+harness+OOMing+on+12+bytes?%22\);%0A%7D&edition=2024 "Run code")

1.57.0 · [Source](../../src/alloc/vec/mod.rs.html#1555)

#### pub fn [try\_reserve\_exact](#method.try_reserve_exact)( &mut self, additional: [usize](../primitive.usize.html), ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[()](../primitive.unit.html), [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

Tries to reserve the minimum capacity for at least `additional` elements to be inserted in the given `Vec<T>`. Unlike [`try_reserve`](struct.Vec.html#method.try_reserve "method std::vec::Vec::try_reserve"), this will not deliberately over-allocate to speculatively avoid frequent allocations. After calling `try_reserve_exact`, capacity will be greater than or equal to `self.len() + additional` if it returns `Ok(())`. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it requests. Therefore, capacity can not be relied upon to be precisely minimal. Prefer [`try_reserve`](struct.Vec.html#method.try_reserve "method std::vec::Vec::try_reserve") if future insertions are expected.

##### [§](#errors-3)Errors

If the capacity overflows, or the allocator reports a failure, then an error is returned.

##### [§](#examples-19)Examples

```
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::collections::TryReserveError;%0A++++%0A++++fn+process_data\(data:+%26%5Bu32%5D\)+-%3E+Result%3CVec%3Cu32%3E,+TryReserveError%3E+%7B%0A++++++++let+mut+output+=+Vec::new\(\);%0A++++%0A++++++++//+Pre-reserve+the+memory,+exiting+if+we+can't%0A++++++++output.try_reserve_exact\(data.len\(\)\)?;%0A++++%0A++++++++//+Now+we+know+this+can't+OOM+in+the+middle+of+our+complex+work%0A++++++++output.extend\(data.iter\(\).map\(%7C%26val%7C+%7B%0A++++++++++++val+*+2+%2B+5+//+very+complicated%0A++++++++%7D\)\);%0A++++%0A++++++++Ok\(output\)%0A++++%7D%0A++++process_data\(%26%5B1,+2,+3%5D\).expect\(%22why+is+the+test+harness+OOMing+on+12+bytes?%22\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#1579)

#### pub fn [shrink\_to\_fit](#method.shrink_to_fit)(&mut self)

Shrinks the capacity of the vector as much as possible.

The behavior of this method depends on the allocator, which may either shrink the vector in-place or reallocate. The resulting vector might still have some excess capacity, just as is the case for [`with_capacity`](struct.Vec.html#method.with_capacity "associated function std::vec::Vec::with_capacity"). See [`Allocator::shrink`](../alloc/trait.Allocator.html#method.shrink "method std::alloc::Allocator::shrink") for more details.

##### [§](#examples-20)Examples

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to_fit();
assert!(vec.capacity() >= 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++vec.shrink_to_fit\(\);%0A++++assert!\(vec.capacity\(\)+%3E=+3\);%0A%7D&edition=2024 "Run code")

1.56.0 · [Source](../../src/alloc/vec/mod.rs.html#1608)

#### pub fn [shrink\_to](#method.shrink_to)(&mut self, min\_capacity: [usize](../primitive.usize.html))

Shrinks the capacity of the vector with a lower bound.

The capacity will remain at least as large as both the length and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

##### [§](#examples-21)Examples

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to(4);
assert!(vec.capacity() >= 4);
vec.shrink_to(0);
assert!(vec.capacity() >= 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++vec.shrink_to\(4\);%0A++++assert!\(vec.capacity\(\)+%3E=+4\);%0A++++vec.shrink_to\(0\);%0A++++assert!\(vec.capacity\(\)+%3E=+3\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1641)

#### pub fn [try\_shrink\_to\_fit](#method.try_shrink_to_fit)(&mut self) -> [Result](../result/enum.Result.html "enum std::result::Result")<[()](../primitive.unit.html), [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

🔬This is a nightly-only experimental API. (`vec_fallible_shrink` [#152350](https://github.com/rust-lang/rust/issues/152350))

Tries to shrink the capacity of the vector as much as possible

The behavior of this method depends on the allocator, which may either shrink the vector in-place or reallocate. The resulting vector might still have some excess capacity, just as is the case for [`with_capacity`](struct.Vec.html#method.with_capacity "associated function std::vec::Vec::with_capacity"). See [`Allocator::shrink`](../alloc/trait.Allocator.html#method.shrink "method std::alloc::Allocator::shrink") for more details.

##### [§](#errors-4)Errors

This function returns an error if the allocator fails to shrink the allocation, the vector thereafter is still safe to use, the capacity remains unchanged however. See [`Allocator::shrink`](../alloc/trait.Allocator.html#method.shrink "method std::alloc::Allocator::shrink").

##### [§](#examples-22)Examples

```
#![feature(vec_fallible_shrink)]

let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.try_shrink_to_fit().expect("why is the test harness failing to shrink to 12 bytes");
assert!(vec.capacity() >= 3);
```

%5D%0A%23!%5Bfeature\(vec_fallible_shrink\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++vec.try_shrink_to_fit\(\).expect\(%22why+is+the+test+harness+failing+to+shrink+to+12+bytes%22\);%0A++++assert!\(vec.capacity\(\)+%3E=+3\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#1673)

#### pub fn [try\_shrink\_to](#method.try_shrink_to)( &mut self, min\_capacity: [usize](../primitive.usize.html), ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[()](../primitive.unit.html), [TryReserveError](../collections/struct.TryReserveError.html "struct std::collections::TryReserveError")\>

🔬This is a nightly-only experimental API. (`vec_fallible_shrink` [#152350](https://github.com/rust-lang/rust/issues/152350))

Shrinks the capacity of the vector with a lower bound.

The capacity will remain at least as large as both the length and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

##### [§](#errors-5)Errors

This function returns an error if the allocator fails to shrink the allocation, the vector thereafter is still safe to use, the capacity remains unchanged however. See [`Allocator::shrink`](../alloc/trait.Allocator.html#method.shrink "method std::alloc::Allocator::shrink").

##### [§](#examples-23)Examples

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

%5D%0A%23!%5Bfeature\(vec_fallible_shrink\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++vec.try_shrink_to\(4\).expect\(%22why+is+the+test+harness+failing+to+shrink+to+12+bytes%22\);%0A++++assert!\(vec.capacity\(\)+%3E=+4\);%0A++++vec.try_shrink_to\(0\).expect\(%22this+is+a+no-op+and+thus+the+allocator+isn't+involved.%22\);%0A++++assert!\(vec.capacity\(\)+%3E=+3\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#1708)

#### pub fn [into\_boxed\_slice](#method.into_boxed_slice)(self) -> [Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T\]](../primitive.slice.html), A>

Converts the vector into [`Box<[T]>`](../boxed/struct.Box.html "struct std::boxed::Box").

Before doing the conversion, this method discards excess capacity like [`shrink_to_fit`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit").

##### [§](#examples-24)Examples

```
let v = vec![1, 2, 3];

let slice = v.into_boxed_slice();
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+vec!%5B1,+2,+3%5D;%0A++++%0A++++let+slice+=+v.into_boxed_slice\(\);%0A%7D&edition=2024 "Run code")

Any excess capacity is removed:

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);

assert!(vec.capacity() >= 10);
let slice = vec.into_boxed_slice();
assert_eq!(slice.into_vec().capacity(), 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++%0A++++assert!\(vec.capacity\(\)+%3E=+10\);%0A++++let+slice+=+vec.into_boxed_slice\(\);%0A++++assert_eq!\(slice.into_vec\(\).capacity\(\),+3\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#1761)

#### pub fn [truncate](#method.truncate)(&mut self, len: [usize](../primitive.usize.html))

Shortens the vector, keeping the first `len` elements and dropping the rest.

If `len` is greater or equal to the vector’s current length, this has no effect.

The [`drain`](struct.Vec.html#method.drain "method std::vec::Vec::drain") method can emulate `truncate`, but causes the excess elements to be returned instead of dropped.

Note that this method has no effect on the allocated capacity of the vector.

##### [§](#examples-25)Examples

Truncating a five element vector to two elements:

```
let mut vec = vec![1, 2, 3, 4, 5];
vec.truncate(2);
assert_eq!(vec, [1, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3,+4,+5%5D;%0A++++vec.truncate\(2\);%0A++++assert_eq!\(vec,+%5B1,+2%5D\);%0A%7D&edition=2024 "Run code")

No truncation occurs when `len` is greater than the vector’s current length:

```
let mut vec = vec![1, 2, 3];
vec.truncate(8);
assert_eq!(vec, [1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3%5D;%0A++++vec.truncate\(8\);%0A++++assert_eq!\(vec,+%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

Truncating when `len == 0` is equivalent to calling the [`clear`](struct.Vec.html#method.clear "method std::vec::Vec::clear") method.

```
let mut vec = vec![1, 2, 3];
vec.truncate(0);
assert_eq!(vec, []);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3%5D;%0A++++vec.truncate\(0\);%0A++++assert_eq!\(vec,+%5B%5D\);%0A%7D&edition=2024 "Run code")

1.7.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#1798)

#### pub const fn [as\_slice](#method.as_slice)(&self) -> &[\[T\]](../primitive.slice.html)

Extracts a slice containing the entire vector.

Equivalent to `&s[..]`.

##### [§](#examples-26)Examples

```
use std::io::{self, Write};
let buffer = vec![1, 2, 3, 5, 8];
io::sink().write(buffer.as_slice()).unwrap();
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::io::%7Bself,+Write%7D;%0A++++let+buffer+=+vec!%5B1,+2,+3,+5,+8%5D;%0A++++io::sink\(\).write\(buffer.as_slice\(\)\).unwrap\(\);%0A%7D&edition=2024 "Run code")

1.7.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#1834)

#### pub const fn [as\_mut\_slice](#method.as_mut_slice)(&mut self) -> &mut [\[T\]](../primitive.slice.html)

Extracts a mutable slice of the entire vector.

Equivalent to `&mut s[..]`.

##### [§](#examples-27)Examples

```
use std::io::{self, Read};
let mut buffer = vec![0; 3];
io::repeat(0b101).read_exact(buffer.as_mut_slice()).unwrap();
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::io::%7Bself,+Read%7D;%0A++++let+mut+buffer+=+vec!%5B0;+3%5D;%0A++++io::repeat\(0b101\).read_exact\(buffer.as_mut_slice\(\)\).unwrap\(\);%0A%7D&edition=2024 "Run code")

1.37.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#1913)

#### pub const fn [as\_ptr](#method.as_ptr)(&self) -> [\*const T](../primitive.pointer.html)

Returns a raw pointer to the vector’s buffer, or a dangling raw pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

The caller must also ensure that the memory the pointer (non-transitively) points to is never written to (except inside an `UnsafeCell`) using this pointer or any pointer derived from it. If you need to mutate the contents of the slice, use [`as_mut_ptr`](struct.Vec.html#method.as_mut_ptr "method std::vec::Vec::as_mut_ptr").

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to [`as_ptr`](struct.Vec.html#method.as_ptr "method std::vec::Vec::as_ptr"), [`as_mut_ptr`](struct.Vec.html#method.as_mut_ptr "method std::vec::Vec::as_mut_ptr"), and [`as_non_null`](struct.Vec.html#method.as_non_null "method std::vec::Vec::as_non_null"). Note that calling other methods that materialize mutable references to the slice, or mutable references to specific elements you are planning on accessing through this pointer, as well as writing to those elements, may still invalidate this pointer. See the second example below for how this guarantee can be used.

##### [§](#examples-28)Examples

```
let x = vec![1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(*x_ptr.add(i), 1 << i);
    }
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+vec!%5B1,+2,+4%5D;%0A++++let+x_ptr+=+x.as_ptr\(\);%0A++++%0A++++unsafe+%7B%0A++++++++for+i+in+0..x.len\(\)+%7B%0A++++++++++++assert_eq!\(*x_ptr.add\(i\),+1+%3C%3C+i\);%0A++++++++%7D%0A++++%7D%0A%7D&edition=2024 "Run code")

Due to the aliasing guarantee, the following code is legal:

```
unsafe {
    let mut v = vec![0, 1, 2];
    let ptr1 = v.as_ptr();
    let _ = ptr1.read();
    let ptr2 = v.as_mut_ptr().offset(2);
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`
    // because it mutated a different element:
    let _ = ptr1.read();
}
```

%5D%0Afn+main\(\)+%7B%0A++++unsafe+%7B%0A++++++++let+mut+v+=+vec!%5B0,+1,+2%5D;%0A++++++++let+ptr1+=+v.as_ptr\(\);%0A++++++++let+_+=+ptr1.read\(\);%0A++++++++let+ptr2+=+v.as_mut_ptr\(\).offset\(2\);%0A++++++++ptr2.write\(2\);%0A++++++++//+Notably,+the+write+to+%60ptr2%60+did+*not*+invalidate+%60ptr1%60%0A++++++++//+because+it+mutated+a+different+element:%0A++++++++let+_+=+ptr1.read\(\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.37.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#1997)

#### pub const fn [as\_mut\_ptr](#method.as_mut_ptr)(&mut self) -> [\*mut T](../primitive.pointer.html)

Returns a raw mutable pointer to the vector’s buffer, or a dangling raw pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to [`as_ptr`](struct.Vec.html#method.as_ptr "method std::vec::Vec::as_ptr"), [`as_mut_ptr`](struct.Vec.html#method.as_mut_ptr "method std::vec::Vec::as_mut_ptr"), and [`as_non_null`](struct.Vec.html#method.as_non_null "method std::vec::Vec::as_non_null"). Note that calling other methods that materialize references to the slice, or references to specific elements you are planning on accessing through this pointer, may still invalidate this pointer. See the second example below for how this guarantee can be used.

The method also guarantees that, as long as `T` is not zero-sized and the capacity is nonzero, the pointer may be passed into [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") with a layout of `Layout::array::<T>(capacity)` in order to deallocate the backing memory. If this is done, be careful not to run the destructor of the `Vec`, as dropping it will result in double-frees. Wrapping the `Vec` in a [`ManuallyDrop`](../mem/struct.ManuallyDrop.html "struct std::mem::ManuallyDrop") is the typical way to achieve this.

##### [§](#examples-29)Examples

```
// Allocate vector big enough for 4 elements.
let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_mut_ptr();

// Initialize elements via raw pointer writes, then set length.
unsafe {
    for i in 0..size {
        *x_ptr.add(i) = i as i32;
    }
    x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++//+Allocate+vector+big+enough+for+4+elements.%0A++++let+size+=+4;%0A++++let+mut+x:+Vec%3Ci32%3E+=+Vec::with_capacity\(size\);%0A++++let+x_ptr+=+x.as_mut_ptr\(\);%0A++++%0A++++//+Initialize+elements+via+raw+pointer+writes,+then+set+length.%0A++++unsafe+%7B%0A++++++++for+i+in+0..size+%7B%0A++++++++++++*x_ptr.add\(i\)+=+i+as+i32;%0A++++++++%7D%0A++++++++x.set_len\(size\);%0A++++%7D%0A++++assert_eq!\(%26*x,+%26%5B0,+1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

Due to the aliasing guarantee, the following code is legal:

```
unsafe {
    let mut v = vec![0];
    let ptr1 = v.as_mut_ptr();
    ptr1.write(1);
    let ptr2 = v.as_mut_ptr();
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`:
    ptr1.write(3);
}
```

%5D%0Afn+main\(\)+%7B%0A++++unsafe+%7B%0A++++++++let+mut+v+=+vec!%5B0%5D;%0A++++++++let+ptr1+=+v.as_mut_ptr\(\);%0A++++++++ptr1.write\(1\);%0A++++++++let+ptr2+=+v.as_mut_ptr\(\);%0A++++++++ptr2.write\(2\);%0A++++++++//+Notably,+the+write+to+%60ptr2%60+did+*not*+invalidate+%60ptr1%60:%0A++++++++ptr1.write\(3\);%0A++++%7D%0A%7D&edition=2024 "Run code")

Deallocating a vector using [`Box`](../boxed/struct.Box.html "struct std::boxed::Box") (which uses [`dealloc`](../alloc/trait.GlobalAlloc.html#tymethod.dealloc "method std::alloc::GlobalAlloc::dealloc") internally):

```
use std::mem::{ManuallyDrop, MaybeUninit};

let mut v = ManuallyDrop::new(vec![0, 1, 2]);
let ptr = v.as_mut_ptr();
let capacity = v.capacity();
let slice_ptr: *mut [MaybeUninit<i32>] =
    std::ptr::slice_from_raw_parts_mut(ptr.cast(), capacity);
drop(unsafe { Box::from_raw(slice_ptr) });
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::mem::%7BManuallyDrop,+MaybeUninit%7D;%0A++++%0A++++let+mut+v+=+ManuallyDrop::new\(vec!%5B0,+1,+2%5D\);%0A++++let+ptr+=+v.as_mut_ptr\(\);%0A++++let+capacity+=+v.capacity\(\);%0A++++let+slice_ptr:+*mut+%5BMaybeUninit%3Ci32%3E%5D+=%0A++++++++std::ptr::slice_from_raw_parts_mut\(ptr.cast\(\),+capacity\);%0A++++drop\(unsafe+%7B+Box::from_raw\(slice_ptr\)+%7D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#2062)

#### pub const fn [as\_non\_null](#method.as_non_null)(&mut self) -> [NonNull](../ptr/struct.NonNull.html "struct std::ptr::NonNull")<T>

🔬This is a nightly-only experimental API. (`box_vec_non_null` [#130364](https://github.com/rust-lang/rust/issues/130364))

Returns a `NonNull` pointer to the vector’s buffer, or a dangling `NonNull` pointer valid for zero sized reads if the vector didn’t allocate.

The caller must ensure that the vector outlives the pointer this function returns, or else it will end up dangling. Modifying the vector may cause its buffer to be reallocated, which would also make any pointers to it invalid.

This method guarantees that for the purpose of the aliasing model, this method does not materialize a reference to the underlying slice, and thus the returned pointer will remain valid when mixed with other calls to [`as_ptr`](struct.Vec.html#method.as_ptr "method std::vec::Vec::as_ptr"), [`as_mut_ptr`](struct.Vec.html#method.as_mut_ptr "method std::vec::Vec::as_mut_ptr"), and [`as_non_null`](struct.Vec.html#method.as_non_null "method std::vec::Vec::as_non_null"). Note that calling other methods that materialize references to the slice, or references to specific elements you are planning on accessing through this pointer, may still invalidate this pointer. See the second example below for how this guarantee can be used.

##### [§](#examples-30)Examples

```
#![feature(box_vec_non_null)]

// Allocate vector big enough for 4 elements.
let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_non_null();

// Initialize elements via raw pointer writes, then set length.
unsafe {
    for i in 0..size {
        x_ptr.add(i).write(i as i32);
    }
    x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);
```

%5D%0A%23!%5Bfeature\(box_vec_non_null\)%5D%0A%0A%0A//+Allocate+vector+big+enough+for+4+elements.%0Afn+main\(\)+%7B%0A++++let+size+=+4;%0A++++let+mut+x:+Vec%3Ci32%3E+=+Vec::with_capacity\(size\);%0A++++let+x_ptr+=+x.as_non_null\(\);%0A++++%0A++++//+Initialize+elements+via+raw+pointer+writes,+then+set+length.%0A++++unsafe+%7B%0A++++++++for+i+in+0..size+%7B%0A++++++++++++x_ptr.add\(i\).write\(i+as+i32\);%0A++++++++%7D%0A++++++++x.set_len\(size\);%0A++++%7D%0A++++assert_eq!\(%26*x,+%26%5B0,+1,+2,+3%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

Due to the aliasing guarantee, the following code is legal:

```
#![feature(box_vec_non_null)]

unsafe {
    let mut v = vec![0];
    let ptr1 = v.as_non_null();
    ptr1.write(1);
    let ptr2 = v.as_non_null();
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`:
    ptr1.write(3);
}
```

%5D%0A%23!%5Bfeature\(box_vec_non_null\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++unsafe+%7B%0A++++++++let+mut+v+=+vec!%5B0%5D;%0A++++++++let+ptr1+=+v.as_non_null\(\);%0A++++++++ptr1.write\(1\);%0A++++++++let+ptr2+=+v.as_non_null\(\);%0A++++++++ptr2.write\(2\);%0A++++++++//+Notably,+the+write+to+%60ptr2%60+did+*not*+invalidate+%60ptr1%60:%0A++++++++ptr1.write\(3\);%0A++++%7D%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#2069)

#### pub fn [allocator](#method.allocator)(&self) -> [&A](../primitive.reference.html)

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Returns a reference to the underlying allocator.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2161)

#### pub unsafe fn [set\_len](#method.set_len)(&mut self, new\_len: [usize](../primitive.usize.html))

Forces the length of the vector to `new_len`.

This is a low-level operation that maintains none of the normal invariants of the type. Normally changing the length of a vector is done using one of the safe operations instead, such as [`truncate`](struct.Vec.html#method.truncate "method std::vec::Vec::truncate"), [`resize`](struct.Vec.html#method.resize "method std::vec::Vec::resize"), [`extend`](../iter/trait.Extend.html#tymethod.extend "method std::iter::Extend::extend"), or [`clear`](struct.Vec.html#method.clear "method std::vec::Vec::clear").

##### [§](#safety-4)Safety

* `new_len` must be less than or equal to [`capacity()`](struct.Vec.html#method.capacity "method std::vec::Vec::capacity").
* The elements at `old_len..new_len` must be initialized.

##### [§](#examples-31)Examples

See [`spare_capacity_mut()`](struct.Vec.html#method.spare_capacity_mut "method std::vec::Vec::spare_capacity_mut") for an example with safe initialization of capacity elements and use of this method.

`set_len()` can be useful for situations in which the vector is serving as a buffer for other code, particularly over FFI:

```
pub fn get_dictionary(&self) -> Option<Vec<u8>> {
    // Per the FFI method's docs, "32768 bytes is always enough".
    let mut dict = Vec::with_capacity(32_768);
    let mut dict_length = 0;
    // SAFETY: When `deflateGetDictionary` returns `Z_OK`, it holds that:
    // 1. `dict_length` elements were initialized.
    // 2. `dict_length` <= the capacity (32_768)
    // which makes `set_len` safe to call.
    unsafe {
        // Make the FFI call...
        let r = deflateGetDictionary(self.strm, dict.as_mut_ptr(), &mut dict_length);
        if r == Z_OK {
            // ...and update the length to what was initialized.
            dict.set_len(dict_length);
            Some(dict)
        } else {
            None
        }
    }
}
```

%5D%0A%23!%5Ballow\(dead_code\)%5D%0A%0A//+This+is+just+a+minimal+skeleton+for+the+doc+example;%0A//+don't+use+this+as+a+starting+point+for+a+real+library.%0Afn+main\(\)+%7B%0A++++pub+struct+StreamWrapper+%7B+strm:+*mut+std::ffi::c_void+%7D%0A++++const+Z_OK:+i32+=+0;%0A++++unsafe+extern+%22C%22+%7B%0A++++++++fn+deflateGetDictionary\(%0A++++++++++++strm:+*mut+std::ffi::c_void,%0A++++++++++++dictionary:+*mut+u8,%0A++++++++++++dictLength:+*mut+usize,%0A++++++++\)+-%3E+i32;%0A++++%7D%0A++++impl+StreamWrapper+%7B%0A++++pub+fn+get_dictionary\(%26self\)+-%3E+Option%3CVec%3Cu8%3E%3E+%7B%0A++++++++//+Per+the+FFI+method's+docs,+%2232768+bytes+is+always+enough%22.%0A++++++++let+mut+dict+=+Vec::with_capacity\(32_768\);%0A++++++++let+mut+dict_length+=+0;%0A++++++++//+SAFETY:+When+%60deflateGetDictionary%60+returns+%60Z_OK%60,+it+holds+that:%0A++++++++//+1.+%60dict_length%60+elements+were+initialized.%0A++++++++//+2.+%60dict_length%60+%3C=+the+capacity+\(32_768\)%0A++++++++//+which+makes+%60set_len%60+safe+to+call.%0A++++++++unsafe+%7B%0A++++++++++++//+Make+the+FFI+call...%0A++++++++++++let+r+=+deflateGetDictionary\(self.strm,+dict.as_mut_ptr\(\),+%26mut+dict_length\);%0A++++++++++++if+r+==+Z_OK+%7B%0A++++++++++++++++//+...and+update+the+length+to+what+was+initialized.%0A++++++++++++++++dict.set_len\(dict_length\);%0A++++++++++++++++Some\(dict\)%0A++++++++++++%7D+else+%7B%0A++++++++++++++++None%0A++++++++++++%7D%0A++++++++%7D%0A++++%7D%0A++++%7D%0A%7D&edition=2024 "Run code")

While the following example is sound, there is a memory leak since the inner vectors were not freed prior to the `set_len` call:

```
let mut vec = vec![vec![1, 0, 0],
                   vec![0, 1, 0],
                   vec![0, 0, 1]];
// SAFETY:
// 1. `old_len..0` is empty so no elements need to be initialized.
// 2. `0 <= capacity` always holds whatever `capacity` is.
unsafe {
    vec.set_len(0);
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5Bvec!%5B1,+0,+0%5D,%0A+++++++++++++++++++++++vec!%5B0,+1,+0%5D,%0A+++++++++++++++++++++++vec!%5B0,+0,+1%5D%5D;%0A++++//+SAFETY:%0A++++//+1.+%60old_len..0%60+is+empty+so+no+elements+need+to+be+initialized.%0A++++//+2.+%600+%3C=+capacity%60+always+holds+whatever+%60capacity%60+is.%0A++++unsafe+%7B%0A++++++++vec.set_len\(0\);%0A++++++//+FIXME\(https://github.com/rust-lang/miri/issues/3670\):%0A++++++//+use+-Zmiri-disable-leak-check+instead+of+unleaking+in+tests+meant+to+leak.%0A++++++vec.set_len\(3\);%0A++++%7D%0A%7D&edition=2024 "Run code")

Normally, here, one would use [`clear`](struct.Vec.html#method.clear "method std::vec::Vec::clear") instead to correctly drop the contents and thus not leak memory.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2197)

#### pub fn [swap\_remove](#method.swap_remove)(&mut self, index: [usize](../primitive.usize.html)) -> T

Removes an element from the vector and returns it.

The removed element is replaced by the last element of the vector.

This does not preserve ordering of the remaining elements, but is _O_(1). If you need to preserve the element order, use [`remove`](struct.Vec.html#method.remove "method std::vec::Vec::remove") instead.

##### [§](#panics-6)Panics

Panics if `index` is out of bounds.

##### [§](#examples-32)Examples

```
let mut v = vec!["foo", "bar", "baz", "qux"];

assert_eq!(v.swap_remove(1), "bar");
assert_eq!(v, ["foo", "qux", "baz"]);

assert_eq!(v.swap_remove(0), "foo");
assert_eq!(v, ["baz", "qux"]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B%22foo%22,+%22bar%22,+%22baz%22,+%22qux%22%5D;%0A++++%0A++++assert_eq!\(v.swap_remove\(1\),+%22bar%22\);%0A++++assert_eq!\(v,+%5B%22foo%22,+%22qux%22,+%22baz%22%5D\);%0A++++%0A++++assert_eq!\(v.swap_remove\(0\),+%22foo%22\);%0A++++assert_eq!\(v,+%5B%22baz%22,+%22qux%22%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2246)

#### pub fn [insert](#method.insert)(&mut self, index: [usize](../primitive.usize.html), element: T)

Inserts an element at position `index` within the vector, shifting all elements after it to the right.

##### [§](#panics-7)Panics

Panics if `index > len`.

##### [§](#examples-33)Examples

```
let mut vec = vec!['a', 'b', 'c'];
vec.insert(1, 'd');
assert_eq!(vec, ['a', 'd', 'b', 'c']);
vec.insert(4, 'e');
assert_eq!(vec, ['a', 'd', 'b', 'c', 'e']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B'a',+'b',+'c'%5D;%0A++++vec.insert\(1,+'d'\);%0A++++assert_eq!\(vec,+%5B'a',+'d',+'b',+'c'%5D\);%0A++++vec.insert\(4,+'e'\);%0A++++assert_eq!\(vec,+%5B'a',+'d',+'b',+'c',+'e'%5D\);%0A%7D&edition=2024 "Run code")

##### [§](#time-complexity-2)Time complexity

Takes _O_([`Vec::len`](struct.Vec.html#method.len "method std::vec::Vec::len")) time. All items after the insertion index must be shifted to the right. In the worst case, all elements are shifted when the insertion index is 0.

1.95.0 · [Source](../../src/alloc/vec/mod.rs.html#2277)

#### pub fn [insert\_mut](#method.insert_mut)(&mut self, index: [usize](../primitive.usize.html), element: T) -> [&mut T](../primitive.reference.html)

Inserts an element at position `index` within the vector, shifting all elements after it to the right, and returning a reference to the new element.

##### [§](#panics-8)Panics

Panics if `index > len`.

##### [§](#examples-34)Examples

```
let mut vec = vec![1, 3, 5, 9];
let x = vec.insert_mut(3, 6);
*x += 1;
assert_eq!(vec, [1, 3, 5, 7, 9]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+3,+5,+9%5D;%0A++++let+x+=+vec.insert_mut\(3,+6\);%0A++++*x+%2B=+1;%0A++++assert_eq!\(vec,+%5B1,+3,+5,+7,+9%5D\);%0A%7D&edition=2024 "Run code")

##### [§](#time-complexity-3)Time complexity

Takes _O_([`Vec::len`](struct.Vec.html#method.len "method std::vec::Vec::len")) time. All items after the insertion index must be shifted to the right. In the worst case, all elements are shifted when the insertion index is 0.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2341)

#### pub fn [remove](#method.remove)(&mut self, index: [usize](../primitive.usize.html)) -> T

Removes and returns the element at position `index` within the vector, shifting all elements after it to the left.

Note: Because this shifts over the remaining elements, it has a worst-case performance of _O_(_n_). If you don’t need the order of elements to be preserved, use [`swap_remove`](struct.Vec.html#method.swap_remove "method std::vec::Vec::swap_remove") instead. If you’d like to remove elements from the beginning of the `Vec`, consider using [`VecDeque::pop_front`](../collections/struct.VecDeque.html#method.pop_front "method std::collections::VecDeque::pop_front") instead.

##### [§](#panics-9)Panics

Panics if `index` is out of bounds.

##### [§](#examples-35)Examples

```
let mut v = vec!['a', 'b', 'c'];
assert_eq!(v.remove(1), 'b');
assert_eq!(v, ['a', 'c']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B'a',+'b',+'c'%5D;%0A++++assert_eq!\(v.remove\(1\),+'b'\);%0A++++assert_eq!\(v,+%5B'a',+'c'%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#2377)

#### pub fn [try\_remove](#method.try_remove)(&mut self, index: [usize](../primitive.usize.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<T>

🔬This is a nightly-only experimental API. (`vec_try_remove` [#146954](https://github.com/rust-lang/rust/issues/146954))

Remove and return the element at position `index` within the vector, shifting all elements after it to the left, or [`None`](../option/enum.Option.html#variant.None "variant std::option::Option::None") if it does not exist.

Note: Because this shifts over the remaining elements, it has a worst-case performance of _O_(_n_). If you’d like to remove elements from the beginning of the `Vec`, consider using [`VecDeque::pop_front`](../collections/struct.VecDeque.html#method.pop_front "method std::collections::VecDeque::pop_front") instead.

##### [§](#examples-36)Examples

```
#![feature(vec_try_remove)]
let mut v = vec![1, 2, 3];
assert_eq!(v.try_remove(0), Some(1));
assert_eq!(v.try_remove(2), None);
```

%5D%0A%23!%5Bfeature\(vec_try_remove\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+2,+3%5D;%0A++++assert_eq!\(v.try_remove\(0\),+Some\(1\)\);%0A++++assert_eq!\(v.try_remove\(2\),+None\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2425-2427)

#### pub fn [retain](#method.retain)<F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns `false`. This method operates in place, visiting each element exactly once in the original order, and preserves the order of the retained elements.

##### [§](#examples-37)Examples

```
let mut vec = vec![1, 2, 3, 4];
vec.retain(|&x| x % 2 == 0);
assert_eq!(vec, [2, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3,+4%5D;%0A++++vec.retain\(%7C%26x%7C+x+%25+2+==+0\);%0A++++assert_eq!\(vec,+%5B2,+4%5D\);%0A%7D&edition=2024 "Run code")

Because the elements are visited exactly once in the original order, external state may be used to decide which elements to keep.

```
let mut vec = vec![1, 2, 3, 4, 5];
let keep = [false, true, true, false, true];
let mut iter = keep.iter();
vec.retain(|_| *iter.next().unwrap());
assert_eq!(vec, [2, 3, 5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3,+4,+5%5D;%0A++++let+keep+=+%5Bfalse,+true,+true,+false,+true%5D;%0A++++let+mut+iter+=+keep.iter\(\);%0A++++vec.retain\(%7C_%7C+*iter.next\(\).unwrap\(\)\);%0A++++assert_eq!\(vec,+%5B2,+3,+5%5D\);%0A%7D&edition=2024 "Run code")

1.61.0 · [Source](../../src/alloc/vec/mod.rs.html#2451-2453)

#### pub fn [retain\_mut](#method.retain_mut)<F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Retains only the elements specified by the predicate, passing a mutable reference to it.

In other words, remove all elements `e` such that `f(&mut e)` returns `false`. This method operates in place, visiting each element exactly once in the original order, and preserves the order of the retained elements.

##### [§](#examples-38)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3,+4%5D;%0A++++vec.retain_mut\(%7Cx%7C+if+*x+%3C=+3+%7B%0A++++++++*x+%2B=+1;%0A++++++++true%0A++++%7D+else+%7B%0A++++++++false%0A++++%7D\);%0A++++assert_eq!\(vec,+%5B2,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

1.16.0 · [Source](../../src/alloc/vec/mod.rs.html#2561-2564)

#### pub fn [dedup\_by\_key](#method.dedup_by_key)<F, K>(&mut self, key: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html)) -> K, K: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Removes all but the first of consecutive elements in the vector that resolve to the same key.

If the vector is sorted, this removes all duplicates.

##### [§](#examples-39)Examples

```
let mut vec = vec![10, 20, 21, 30, 20];

vec.dedup_by_key(|i| *i / 10);

assert_eq!(vec, [10, 20, 30, 20]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B10,+20,+21,+30,+20%5D;%0A++++%0A++++vec.dedup_by_key\(%7Ci%7C+*i+/+10\);%0A++++%0A++++assert_eq!\(vec,+%5B10,+20,+30,+20%5D\);%0A%7D&edition=2024 "Run code")

1.16.0 · [Source](../../src/alloc/vec/mod.rs.html#2588-2590)

#### pub fn [dedup\_by](#method.dedup_by)<F>(&mut self, same\_bucket: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html), [&mut T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Removes all but the first of consecutive elements in the vector satisfying a given equality relation.

The `same_bucket` function is passed references to two elements from the vector and must determine if the elements compare equal. The elements are passed in opposite order from their order in the slice, so if `same_bucket(a, b)` returns `true`, `a` is removed.

If the vector is sorted, this removes all duplicates.

##### [§](#examples-40)Examples

```
let mut vec = vec!["foo", "bar", "Bar", "baz", "bar"];

vec.dedup_by(|a, b| a.eq_ignore_ascii_case(b));

assert_eq!(vec, ["foo", "bar", "baz", "bar"]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B%22foo%22,+%22bar%22,+%22Bar%22,+%22baz%22,+%22bar%22%5D;%0A++++%0A++++vec.dedup_by\(%7Ca,+b%7C+a.eq_ignore_ascii_case\(b\)\);%0A++++%0A++++assert_eq!\(vec,+%5B%22foo%22,+%22bar%22,+%22baz%22,+%22bar%22%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#2753)

#### pub fn [push\_within\_capacity](#method.push_within_capacity)(&mut self, value: T) -> [Result](../result/enum.Result.html "enum std::result::Result")<[&mut T](../primitive.reference.html), T>

🔬This is a nightly-only experimental API. (`vec_push_within_capacity` [#100486](https://github.com/rust-lang/rust/issues/100486))

Appends an element and returns a reference to it if there is sufficient spare capacity, otherwise an error is returned with the element.

Unlike [`push`](struct.Vec.html#method.push "method std::vec::Vec::push") this method will not reallocate when there’s insufficient capacity. The caller should use [`reserve`](struct.Vec.html#method.reserve "method std::vec::Vec::reserve") or [`try_reserve`](struct.Vec.html#method.try_reserve "method std::vec::Vec::try_reserve") to ensure that there is enough capacity.

##### [§](#examples-41)Examples

A manual, panic-free alternative to [`FromIterator`](../iter/trait.FromIterator.html "trait std::iter::FromIterator"):

```
#![feature(vec_push_within_capacity)]

use std::collections::TryReserveError;
fn from_iter_fallible<T>(iter: impl Iterator<Item=T>) -> Result<Vec<T>, TryReserveError> {
    let mut vec = Vec::new();
    for value in iter {
        if let Err(value) = vec.push_within_capacity(value) {
            vec.try_reserve(1)?;
            // this cannot fail, the previous line either returned or added at least 1 free slot
            let _ = vec.push_within_capacity(value);
        }
    }
    Ok(vec)
}
assert_eq!(from_iter_fallible(0..100), Ok(Vec::from_iter(0..100)));
```

%5D%0A%23!%5Bfeature\(vec_push_within_capacity\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::collections::TryReserveError;%0A++++fn+from_iter_fallible%3CT%3E\(iter:+impl+Iterator%3CItem=T%3E\)+-%3E+Result%3CVec%3CT%3E,+TryReserveError%3E+%7B%0A++++++++let+mut+vec+=+Vec::new\(\);%0A++++++++for+value+in+iter+%7B%0A++++++++++++if+let+Err\(value\)+=+vec.push_within_capacity\(value\)+%7B%0A++++++++++++++++vec.try_reserve\(1\)?;%0A++++++++++++++++//+this+cannot+fail,+the+previous+line+either+returned+or+added+at+least+1+free+slot%0A++++++++++++++++let+_+=+vec.push_within_capacity\(value\);%0A++++++++++++%7D%0A++++++++%7D%0A++++++++Ok\(vec\)%0A++++%7D%0A++++assert_eq!\(from_iter_fallible\(0..100\),+Ok\(Vec::from_iter\(0..100\)\)\);%0A%7D&version=nightly&edition=2024 "Run code")

##### [§](#time-complexity-4)Time complexity

Takes _O_(1) time.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2790)

#### pub fn [pop](#method.pop)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<T>

Removes the last element from a vector and returns it, or [`None`](../option/enum.Option.html#variant.None "variant std::option::Option::None") if it is empty.

If you’d like to pop the first element, consider using [`VecDeque::pop_front`](../collections/struct.VecDeque.html#method.pop_front "method std::collections::VecDeque::pop_front") instead.

##### [§](#examples-42)Examples

```
let mut vec = vec![1, 2, 3];
assert_eq!(vec.pop(), Some(3));
assert_eq!(vec, [1, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3%5D;%0A++++assert_eq!\(vec.pop\(\),+Some\(3\)\);%0A++++assert_eq!\(vec,+%5B1,+2%5D\);%0A%7D&edition=2024 "Run code")

##### [§](#time-complexity-5)Time complexity

Takes _O_(1) time.

1.86.0 · [Source](../../src/alloc/vec/mod.rs.html#2817)

#### pub fn [pop\_if](#method.pop_if)(&mut self, predicate: impl [FnOnce](../ops/trait.FnOnce.html "trait std::ops::FnOnce")([&mut T](../primitive.reference.html)) -> [bool](../primitive.bool.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<T>

Removes and returns the last element from a vector if the predicate returns `true`, or [`None`](../option/enum.Option.html#variant.None "variant std::option::Option::None") if the predicate returns false or the vector is empty (the predicate will not be called in that case).

##### [§](#examples-43)Examples

```
let mut vec = vec![1, 2, 3, 4];
let pred = |x: &mut i32| *x % 2 == 0;

assert_eq!(vec.pop_if(pred), Some(4));
assert_eq!(vec, [1, 2, 3]);
assert_eq!(vec.pop_if(pred), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3,+4%5D;%0A++++let+pred+=+%7Cx:+%26mut+i32%7C+*x+%25+2+==+0;%0A++++%0A++++assert_eq!\(vec.pop_if\(pred\),+Some\(4\)\);%0A++++assert_eq!\(vec,+%5B1,+2,+3%5D\);%0A++++assert_eq!\(vec.pop_if\(pred\),+None\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#2845)

#### pub fn [peek\_mut](#method.peek_mut)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<[PeekMut](struct.PeekMut.html "struct std::vec::PeekMut")<'\_, T, A>>

🔬This is a nightly-only experimental API. (`vec_peek_mut` [#122742](https://github.com/rust-lang/rust/issues/122742))

Returns a mutable reference to the last item in the vector, or `None` if it is empty.

##### [§](#examples-44)Examples

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

%5D%0A%23!%5Bfeature\(vec_peek_mut\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::new\(\);%0A++++assert!\(vec.peek_mut\(\).is_none\(\)\);%0A++++%0A++++vec.push\(1\);%0A++++vec.push\(5\);%0A++++vec.push\(2\);%0A++++assert_eq!\(vec.last\(\),+Some\(%262\)\);%0A++++if+let+Some\(mut+val\)+=+vec.peek_mut\(\)+%7B%0A++++++++*val+=+0;%0A++++%7D%0A++++assert_eq!\(vec.last\(\),+Some\(%260\)\);%0A%7D&version=nightly&edition=2024 "Run code")

1.4.0 · [Source](../../src/alloc/vec/mod.rs.html#2867)

#### pub fn [append](#method.append)(&mut self, other: &mut [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>)

Moves all the elements of `other` into `self`, leaving `other` empty.

##### [§](#panics-10)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-45)Examples

```
let mut vec = vec![1, 2, 3];
let mut vec2 = vec![4, 5, 6];
vec.append(&mut vec2);
assert_eq!(vec, [1, 2, 3, 4, 5, 6]);
assert_eq!(vec2, []);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3%5D;%0A++++let+mut+vec2+=+vec!%5B4,+5,+6%5D;%0A++++vec.append\(%26mut+vec2\);%0A++++assert_eq!\(vec,+%5B1,+2,+3,+4,+5,+6%5D\);%0A++++assert_eq!\(vec2,+%5B%5D\);%0A%7D&edition=2024 "Run code")

1.6.0 · [Source](../../src/alloc/vec/mod.rs.html#2922-2924)

#### pub fn [drain](#method.drain)<R>(&mut self, range: R) -> [Drain](struct.Drain.html "struct std::vec::Drain")<'\_, T, A> [ⓘ](#)

where R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

Removes the subslice indicated by the given range from the vector, returning a double-ended iterator over the removed subslice.

If the iterator is dropped before being fully consumed, it drops the remaining removed elements.

The returned iterator keeps a mutable borrow on the vector to optimize its implementation.

##### [§](#panics-11)Panics

Panics if the range has `start_bound > end_bound`, or, if the range is bounded on either end and past the length of the vector.

##### [§](#leaking)Leaking

If the returned iterator goes out of scope without being dropped (due to [`mem::forget`](../mem/fn.forget.html "fn std::mem::forget"), for example), the vector may have lost and leaked elements arbitrarily, including elements outside the range.

##### [§](#examples-46)Examples

```
let mut v = vec![1, 2, 3];
let u: Vec<_> = v.drain(1..).collect();
assert_eq!(v, &[1]);
assert_eq!(u, &[2, 3]);

// A full range clears the vector, like `clear()` does
v.drain(..);
assert_eq!(v, &[]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+2,+3%5D;%0A++++let+u:+Vec%3C_%3E+=+v.drain\(1..\).collect\(\);%0A++++assert_eq!\(v,+%26%5B1%5D\);%0A++++assert_eq!\(u,+%26%5B2,+3%5D\);%0A++++%0A++++//+A+full+range+clears+the+vector,+like+%60clear\(\)%60+does%0A++++v.drain\(..\);%0A++++assert_eq!\(v,+%26%5B%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#2968)

#### pub fn [clear](#method.clear)(&mut self)

Clears the vector, removing all values.

Note that this method has no effect on the allocated capacity of the vector.

##### [§](#examples-47)Examples

```
let mut v = vec![1, 2, 3];

v.clear();

assert!(v.is_empty());
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+2,+3%5D;%0A++++%0A++++v.clear\(\);%0A++++%0A++++assert!\(v.is_empty\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#2996)

#### pub const fn [len](#method.len)(&self) -> [usize](../primitive.usize.html)

Returns the number of elements in the vector, also referred to as its ‘length’.

##### [§](#examples-48)Examples

```
let a = vec![1, 2, 3];
assert_eq!(a.len(), 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+a+=+vec!%5B1,+2,+3%5D;%0A++++assert_eq!\(a.len\(\),+3\);%0A%7D&edition=2024 "Run code")

1.0.0 (const: 1.87.0) · [Source](../../src/alloc/vec/mod.rs.html#3021)

#### pub const fn [is\_empty](#method.is_empty)(&self) -> [bool](../primitive.bool.html)

Returns `true` if the vector contains no elements.

##### [§](#examples-49)Examples

```
let mut v = Vec::new();
assert!(v.is_empty());

v.push(1);
assert!(!v.is_empty());
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+Vec::new\(\);%0A++++assert!\(v.is_empty\(\)\);%0A++++%0A++++v.push\(1\);%0A++++assert!\(!v.is_empty\(\)\);%0A%7D&edition=2024 "Run code")

1.4.0 · [Source](../../src/alloc/vec/mod.rs.html#3054-3056)

#### pub fn [split\_off](#method.split_off)(&mut self, at: [usize](../primitive.usize.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

Splits the collection into two at the given index.

Returns a newly allocated vector containing the elements in the range `[at, len)`. After the call, the original vector will be left containing the elements `[0, at)` with its previous capacity unchanged.

* If you want to take ownership of the entire contents and capacity of the vector, see [`mem::take`](../mem/fn.take.html "fn std::mem::take") or [`mem::replace`](../mem/fn.replace.html "fn std::mem::replace").
* If you don’t need the returned vector at all, see [`Vec::truncate`](struct.Vec.html#method.truncate "method std::vec::Vec::truncate").
* If you want to take ownership of an arbitrary subslice, or you don’t necessarily want to store the removed items in a vector, see [`Vec::drain`](struct.Vec.html#method.drain "method std::vec::Vec::drain").

##### [§](#panics-12)Panics

Panics if `at > len`.

##### [§](#examples-50)Examples

```
let mut vec = vec!['a', 'b', 'c'];
let vec2 = vec.split_off(1);
assert_eq!(vec, ['a']);
assert_eq!(vec2, ['b', 'c']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B'a',+'b',+'c'%5D;%0A++++let+vec2+=+vec.split_off\(1\);%0A++++assert_eq!\(vec,+%5B'a'%5D\);%0A++++assert_eq!\(vec2,+%5B'b',+'c'%5D\);%0A%7D&edition=2024 "Run code")

1.33.0 · [Source](../../src/alloc/vec/mod.rs.html#3115-3117)

#### pub fn [resize\_with](#method.resize_with)<F>(&mut self, new\_len: [usize](../primitive.usize.html), f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")() -> T,

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the difference, with each additional slot filled with the result of calling the closure `f`. The return values from `f` will end up in the `Vec` in the order they have been generated.

If `new_len` is less than `len`, the `Vec` is simply truncated.

This method uses a closure to create new values on every push. If you’d rather [`Clone`](../clone/trait.Clone.html "trait std::clone::Clone") a given value, use [`Vec::resize`](struct.Vec.html#method.resize "method std::vec::Vec::resize"). If you want to use the [`Default`](../default/trait.Default.html "trait std::default::Default") trait to generate values, you can pass [`Default::default`](../default/trait.Default.html#tymethod.default "associated function std::default::Default::default") as the second argument.

##### [§](#panics-13)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-51)Examples

```
let mut vec = vec![1, 2, 3];
vec.resize_with(5, Default::default);
assert_eq!(vec, [1, 2, 3, 0, 0]);

let mut vec = vec![];
let mut p = 1;
vec.resize_with(4, || { p *= 2; p });
assert_eq!(vec, [2, 4, 8, 16]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+3%5D;%0A++++vec.resize_with\(5,+Default::default\);%0A++++assert_eq!\(vec,+%5B1,+2,+3,+0,+0%5D\);%0A++++%0A++++let+mut+vec+=+vec!%5B%5D;%0A++++let+mut+p+=+1;%0A++++vec.resize_with\(4,+%7C%7C+%7B+p+*=+2;+p+%7D\);%0A++++assert_eq!\(vec,+%5B2,+4,+8,+16%5D\);%0A%7D&edition=2024 "Run code")

1.47.0 · [Source](../../src/alloc/vec/mod.rs.html#3157-3159)

#### pub fn [leak](#method.leak)<'a>(self) -> &'a mut [\[T\]](../primitive.slice.html)

where A: 'a,

Consumes and leaks the `Vec`, returning a mutable reference to the contents, `&'a mut [T]`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type has only static references, or none at all, then this may be chosen to be `'static`.

As of Rust 1.57, this method does not reallocate or shrink the `Vec`, so the leaked allocation may include unused capacity that is not part of the returned slice.

This function is mainly useful for data that lives for the remainder of the program’s life. Dropping the returned reference will cause a memory leak.

##### [§](#examples-52)Examples

Simple usage:

```
let x = vec![1, 2, 3];
let static_ref: &'static mut [usize] = x.leak();
static_ref[0] += 1;
assert_eq!(static_ref, &[2, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+vec!%5B1,+2,+3%5D;%0A++++let+static_ref:+%26'static+mut+%5Busize%5D+=+x.leak\(\);%0A++++static_ref%5B0%5D+%2B=+1;%0A++++assert_eq!\(static_ref,+%26%5B2,+2,+3%5D\);%0A++++//+FIXME\(https://github.com/rust-lang/miri/issues/3670\):%0A++++//+use+-Zmiri-disable-leak-check+instead+of+unleaking+in+tests+meant+to+leak.%0A++++drop\(unsafe+%7B+Box::from_raw\(static_ref\)+%7D\);%0A%7D&edition=2024 "Run code")

1.60.0 · [Source](../../src/alloc/vec/mod.rs.html#3195)

#### pub fn [spare\_capacity\_mut](#method.spare_capacity_mut)(&mut self) -> &mut \[[MaybeUninit](../mem/union.MaybeUninit.html "union std::mem::MaybeUninit")<T>\]

Returns the remaining spare capacity of the vector as a slice of `MaybeUninit<T>`.

The returned slice can be used to fill the vector with data (e.g. by reading from a file) before marking the data as initialized using the [`set_len`](struct.Vec.html#method.set_len "method std::vec::Vec::set_len") method.

##### [§](#examples-53)Examples

```
// Allocate vector big enough for 10 elements.
let mut v = Vec::with_capacity(10);

// Fill in the first 3 elements.
let uninit = v.spare_capacity_mut();
uninit[0].write(0);
uninit[1].write(1);
uninit[2].write(2);

// Mark the first 3 elements of the vector as being initialized.
unsafe {
    v.set_len(3);
}

assert_eq!(&v, &[0, 1, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++//+Allocate+vector+big+enough+for+10+elements.%0A++++let+mut+v+=+Vec::with_capacity\(10\);%0A++++%0A++++//+Fill+in+the+first+3+elements.%0A++++let+uninit+=+v.spare_capacity_mut\(\);%0A++++uninit%5B0%5D.write\(0\);%0A++++uninit%5B1%5D.write\(1\);%0A++++uninit%5B2%5D.write\(2\);%0A++++%0A++++//+Mark+the+first+3+elements+of+the+vector+as+being+initialized.%0A++++unsafe+%7B%0A++++++++v.set_len\(3\);%0A++++%7D%0A++++%0A++++assert_eq!\(%26v,+%26%5B0,+1,+2%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3260)

#### pub fn [split\_at\_spare\_mut](#method.split_at_spare_mut)(&mut self) -> (&mut [\[T\]](../primitive.slice.html), &mut \[[MaybeUninit](../mem/union.MaybeUninit.html "union std::mem::MaybeUninit")<T>\])

🔬This is a nightly-only experimental API. (`vec_split_at_spare` [#81944](https://github.com/rust-lang/rust/issues/81944))

Returns vector content as a slice of `T`, along with the remaining spare capacity of the vector as a slice of `MaybeUninit<T>`.

The returned spare capacity slice can be used to fill the vector with data (e.g. by reading from a file) before marking the data as initialized using the [`set_len`](struct.Vec.html#method.set_len "method std::vec::Vec::set_len") method.

Note that this is a low-level API, which should be used with care for optimization purposes. If you need to append data to a `Vec` you can use [`push`](struct.Vec.html#method.push "method std::vec::Vec::push"), [`extend`](struct.Vec.html#method.extend "method std::vec::Vec::extend"), [`extend_from_slice`](struct.Vec.html#method.extend_from_slice "method std::vec::Vec::extend_from_slice"), [`extend_from_within`](struct.Vec.html#method.extend_from_within "method std::vec::Vec::extend_from_within"), [`insert`](struct.Vec.html#method.insert "method std::vec::Vec::insert"), [`append`](struct.Vec.html#method.append "method std::vec::Vec::append"), [`resize`](struct.Vec.html#method.resize "method std::vec::Vec::resize") or [`resize_with`](struct.Vec.html#method.resize_with "method std::vec::Vec::resize_with"), depending on your exact needs.

##### [§](#examples-54)Examples

```
#![feature(vec_split_at_spare)]

let mut v = vec![1, 1, 2];

// Reserve additional space big enough for 10 elements.
v.reserve(10);

let (init, uninit) = v.split_at_spare_mut();
let sum = init.iter().copied().sum::<u32>();

// Fill in the next 4 elements.
uninit[0].write(sum);
uninit[1].write(sum * 2);
uninit[2].write(sum * 3);
uninit[3].write(sum * 4);

// Mark the 4 elements of the vector as being initialized.
unsafe {
    let len = v.len();
    v.set_len(len + 4);
}

assert_eq!(&v, &[1, 1, 2, 4, 8, 12, 16]);
```

%5D%0A%23!%5Bfeature\(vec_split_at_spare\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+1,+2%5D;%0A++++%0A++++//+Reserve+additional+space+big+enough+for+10+elements.%0A++++v.reserve\(10\);%0A++++%0A++++let+\(init,+uninit\)+=+v.split_at_spare_mut\(\);%0A++++let+sum+=+init.iter\(\).copied\(\).sum::%3Cu32%3E\(\);%0A++++%0A++++//+Fill+in+the+next+4+elements.%0A++++uninit%5B0%5D.write\(sum\);%0A++++uninit%5B1%5D.write\(sum+*+2\);%0A++++uninit%5B2%5D.write\(sum+*+3\);%0A++++uninit%5B3%5D.write\(sum+*+4\);%0A++++%0A++++//+Mark+the+4+elements+of+the+vector+as+being+initialized.%0A++++unsafe+%7B%0A++++++++let+len+=+v.len\(\);%0A++++++++v.set_len\(len+%2B+4\);%0A++++%7D%0A++++%0A++++assert_eq!\(%26v,+%26%5B1,+1,+2,+4,+8,+12,+16%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3319)

#### pub fn [into\_chunks](#method.into_chunks)<const N: [usize](../primitive.usize.html)\>(self) -> [Vec](struct.Vec.html "struct std::vec::Vec")<[\[T; N\]](../primitive.array.html), A>

🔬This is a nightly-only experimental API. (`vec_into_chunks` [#142137](https://github.com/rust-lang/rust/issues/142137))

Groups every `N` elements in the `Vec<T>` into chunks to produce a `Vec<[T; N]>`, dropping elements in the remainder. `N` must be greater than zero.

If the capacity is not a multiple of the chunk size, the buffer will shrink down to the nearest multiple with a reallocation or deallocation.

This function can be used to reverse [`Vec::into_flattened`](struct.Vec.html#method.into_flattened "method std::vec::Vec::into_flattened").

##### [§](#examples-55)Examples

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

%5D%0A%23!%5Bfeature\(vec_into_chunks\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+vec+=+vec!%5B0,+1,+2,+3,+4,+5,+6,+7%5D;%0A++++assert_eq!\(vec.into_chunks::%3C3%3E\(\),+%5B%5B0,+1,+2%5D,+%5B3,+4,+5%5D%5D\);%0A++++%0A++++let+vec+=+vec!%5B0,+1,+2,+3%5D;%0A++++let+chunks:+Vec%3C%5Bu8;+10%5D%3E+=+vec.into_chunks\(\);%0A++++assert!\(chunks.is_empty\(\)\);%0A++++%0A++++let+flat+=+vec!%5B0;+8+*+8+*+8%5D;%0A++++let+reshaped:+Vec%3C%5B%5B%5Bu8;+8%5D;+8%5D;+8%5D%3E+=+flat.into_chunks\(\).into_chunks\(\).into_chunks\(\);%0A++++assert_eq!\(reshaped.len\(\),+1\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3399-3401)

#### pub fn [recycle](#method.recycle)<U>(self) -> [Vec](struct.Vec.html "struct std::vec::Vec")<U, A>

where U: Recyclable<T>,

🔬This is a nightly-only experimental API. (`vec_recycle` [#148227](https://github.com/rust-lang/rust/issues/148227))

This clears out this `Vec` and recycles the allocation into a new `Vec`. The item type of the resulting `Vec` needs to have the same size and alignment as the item type of the original `Vec`.

##### [§](#examples-56)Examples

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

%5D%0A%23!%5Bfeature\(vec_recycle,+transmutability\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+a:+Vec%3Cu8%3E+=+vec!%5B0;+100%5D;%0A++++let+capacity+=+a.capacity\(\);%0A++++let+addr+=+a.as_ptr\(\).addr\(\);%0A++++let+b:+Vec%3Ci8%3E+=+a.recycle\(\);%0A++++assert_eq!\(b.len\(\),+0\);%0A++++assert_eq!\(b.capacity\(\),+capacity\);%0A++++assert_eq!\(b.as_ptr\(\).addr\(\),+addr\);%0A%7D&version=nightly&edition=2024 "Run code")

The `Recyclable` bound prevents this method from being called when `T` and `U` have different sizes; e.g.:

[ⓘ](# "This example deliberately fails to compile")

```
#![feature(vec_recycle, transmutability)]
let vec: Vec<[u8; 2]> = Vec::new();
let _: Vec<[u8; 1]> = vec.recycle();
```

%5D%0A%23!%5Bfeature\(vec_recycle,+transmutability\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+vec:+Vec%3C%5Bu8;+2%5D%3E+=+Vec::new\(\);%0A++++let+_:+Vec%3C%5Bu8;+1%5D%3E+=+vec.recycle\(\);%0A%7D&version=nightly&edition=2024 "Run code")

…or different alignments:

[ⓘ](# "This example deliberately fails to compile")

```
#![feature(vec_recycle, transmutability)]
let vec: Vec<[u16; 0]> = Vec::new();
let _: Vec<[u8; 0]> = vec.recycle();
```

%5D%0A%23!%5Bfeature\(vec_recycle,+transmutability\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+vec:+Vec%3C%5Bu16;+0%5D%3E+=+Vec::new\(\);%0A++++let+_:+Vec%3C%5Bu8;+0%5D%3E+=+vec.recycle\(\);%0A%7D&version=nightly&edition=2024 "Run code")

However, due to temporary implementation limitations of `Recyclable`, this method is not yet callable when `T` or `U` are slices, trait objects, or other exotic types; e.g.:

[ⓘ](# "This example deliberately fails to compile")

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

%5D%0A%23!%5Bfeature\(vec_recycle,+transmutability\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+inputs+=+%5B%22a+b+c%22,+%22d+e+f%22%5D;%0A++++fn+process\(_:+%26%5B%26str%5D\)+%7B%7D%0A++++let+mut+storage:+Vec%3C%26%5B%26str%5D%3E+=+Vec::new\(\);%0A++++%0A++++for+input+in+inputs+%7B%0A++++++++let+mut+buffer:+Vec%3C%26str%3E+=+storage.recycle\(\);%0A++++++++buffer.extend\(input.split\(%22+%22\)\);%0A++++++++process\(%26buffer\);%0A++++++++storage+=+buffer.recycle\(\);%0A++++%7D%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3435)[§](#impl-Vec%3CT,+A%3E-2)

### impl<T, A> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

1.5.0 · [Source](../../src/alloc/vec/mod.rs.html#3465)

#### pub fn [resize](#method.resize)(&mut self, new\_len: [usize](../primitive.usize.html), value: T)

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the difference, with each additional slot filled with `value`. If `new_len` is less than `len`, the `Vec` is simply truncated.

This method requires `T` to implement [`Clone`](../clone/trait.Clone.html "trait std::clone::Clone"), in order to be able to clone the passed value. If you need more flexibility (or want to rely on [`Default`](../default/trait.Default.html "trait std::default::Default") instead of [`Clone`](../clone/trait.Clone.html "trait std::clone::Clone")), use [`Vec::resize_with`](struct.Vec.html#method.resize_with "method std::vec::Vec::resize_with"). If you only need to resize to a smaller size, use [`Vec::truncate`](struct.Vec.html#method.truncate "method std::vec::Vec::truncate").

##### [§](#panics-14)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-57)Examples

```
let mut vec = vec!["hello"];
vec.resize(3, "world");
assert_eq!(vec, ["hello", "world", "world"]);

let mut vec = vec!['a', 'b', 'c', 'd'];
vec.resize(2, '_');
assert_eq!(vec, ['a', 'b']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B%22hello%22%5D;%0A++++vec.resize\(3,+%22world%22\);%0A++++assert_eq!\(vec,+%5B%22hello%22,+%22world%22,+%22world%22%5D\);%0A++++%0A++++let+mut+vec+=+vec!%5B'a',+'b',+'c',+'d'%5D;%0A++++vec.resize\(2,+'_'\);%0A++++assert_eq!\(vec,+%5B'a',+'b'%5D\);%0A%7D&edition=2024 "Run code")

1.6.0 · [Source](../../src/alloc/vec/mod.rs.html#3499)

#### pub fn [extend\_from\_slice](#method.extend_from_slice)(&mut self, other: &[\[T\]](../primitive.slice.html))

Clones and appends all elements in a slice to the `Vec`.

Iterates over the slice `other`, clones each element, and then appends it to this `Vec`. The `other` slice is traversed in-order.

Note that this function is the same as [`extend`](struct.Vec.html#method.extend "method std::vec::Vec::extend"), except that it also works with slice elements that are Clone but not Copy. If Rust gets specialization this function may be deprecated.

##### [§](#panics-15)Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-58)Examples

```
let mut vec = vec![1];
vec.extend_from_slice(&[2, 3, 4]);
assert_eq!(vec, [1, 2, 3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1%5D;%0A++++vec.extend_from_slice\(%26%5B2,+3,+4%5D\);%0A++++assert_eq!\(vec,+%5B1,+2,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

1.53.0 · [Source](../../src/alloc/vec/mod.rs.html#3530-3532)

#### pub fn [extend\_from\_within](#method.extend_from_within)<R>(&mut self, src: R)

where R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

Given a range `src`, clones a slice of elements in that range and appends it to the end.

`src` must be a range that can form a valid subslice of the `Vec`.

##### [§](#panics-16)Panics

Panics if starting index is greater than the end index, if the index is greater than the length of the vector, or if the new capacity exceeds `isize::MAX` _bytes_.

##### [§](#examples-59)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+mut+characters+=+vec!%5B'a',+'b',+'c',+'d',+'e'%5D;%0A++++characters.extend_from_within\(2..\);%0A++++assert_eq!\(characters,+%5B'a',+'b',+'c',+'d',+'e',+'c',+'d',+'e'%5D\);%0A++++%0A++++let+mut+numbers+=+vec!%5B0,+1,+2,+3,+4%5D;%0A++++numbers.extend_from_within\(..2\);%0A++++assert_eq!\(numbers,+%5B0,+1,+2,+3,+4,+0,+1%5D\);%0A++++%0A++++let+mut+strings+=+vec!%5BString::from\(%22hello%22\),+String::from\(%22world%22\),+String::from\(%22!%22\)%5D;%0A++++strings.extend_from_within\(1..=2\);%0A++++assert_eq!\(strings,+%5B%22hello%22,+%22world%22,+%22!%22,+%22world%22,+%22!%22%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3545)[§](#impl-Vec%3C%5BT;+N%5D,+A%3E)

### impl<T, A, const N: [usize](../primitive.usize.html)\> [Vec](struct.Vec.html "struct std::vec::Vec")<[\[T; N\]](../primitive.array.html), A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

1.80.0 · [Source](../../src/alloc/vec/mod.rs.html#3566)

#### pub fn [into\_flattened](#method.into_flattened)(self) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Takes a `Vec<[T; N]>` and flattens it into a `Vec<T>`.

##### [§](#panics-17)Panics

Panics if the length of the resulting vector would overflow a `usize`.

This is only possible when flattening a vector of arrays of zero-sized types, and thus tends to be irrelevant in practice. If `size_of::<T>() > 0`, this will never panic.

##### [§](#examples-60)Examples

```
let mut vec = vec![[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert_eq!(vec.pop(), Some([7, 8, 9]));

let mut flattened = vec.into_flattened();
assert_eq!(flattened.pop(), Some(6));
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B%5B1,+2,+3%5D,+%5B4,+5,+6%5D,+%5B7,+8,+9%5D%5D;%0A++++assert_eq!\(vec.pop\(\),+Some\(%5B7,+8,+9%5D\)\);%0A++++%0A++++let+mut+flattened+=+vec.into_flattened\(\);%0A++++assert_eq!\(flattened.pop\(\),+Some\(6\)\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3620)[§](#impl-Vec%3CT,+A%3E-3)

### impl<T, A> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3637)

#### pub fn [dedup](#method.dedup)(&mut self)

Removes consecutive repeated elements in the vector according to the [`PartialEq`](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq") trait implementation.

If the vector is sorted, this removes all duplicates.

##### [§](#examples-61)Examples

```
let mut vec = vec![1, 2, 2, 3, 2];

vec.dedup();

assert_eq!(vec, [1, 2, 3, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+vec!%5B1,+2,+2,+3,+2%5D;%0A++++%0A++++vec.dedup\(\);%0A++++%0A++++assert_eq!\(vec,+%5B1,+2,+3,+2%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3957)[§](#impl-Vec%3CT,+A%3E-4)

### impl<T, A> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

1.21.0 · [Source](../../src/alloc/vec/mod.rs.html#4065-4068)

#### pub fn [splice](#method.splice)<R, I>( &mut self, range: R, replace\_with: I, ) -> [Splice](struct.Splice.html "struct std::vec::Splice")<'\_, <I as [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")\>::[IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter "type std::iter::IntoIterator::IntoIter"), A> [ⓘ](#)

where R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>, I: [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")<Item = T>,

Creates a splicing iterator that replaces the specified range in the vector with the given `replace_with` iterator and yields the removed items. `replace_with` does not need to be the same length as `range`.

`range` is removed even if the `Splice` iterator is not consumed before it is dropped.

It is unspecified how many elements are removed from the vector if the `Splice` value is leaked.

The input iterator `replace_with` is only consumed when the `Splice` value is dropped.

This is optimal if:

* The tail (elements in the vector after `range`) is empty,
* or `replace_with` yields fewer or equal elements than `range`’s length
* or the lower bound of its `size_hint()` is exact.

Otherwise, a temporary vector is allocated and the tail is moved twice.

##### [§](#panics-18)Panics

Panics if the range has `start_bound > end_bound`, or, if the range is bounded on either end and past the length of the vector.

##### [§](#examples-62)Examples

```
let mut v = vec![1, 2, 3, 4];
let new = [7, 8, 9];
let u: Vec<_> = v.splice(1..3, new).collect();
assert_eq!(v, [1, 7, 8, 9, 4]);
assert_eq!(u, [2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+2,+3,+4%5D;%0A++++let+new+=+%5B7,+8,+9%5D;%0A++++let+u:+Vec%3C_%3E+=+v.splice\(1..3,+new\).collect\(\);%0A++++assert_eq!\(v,+%5B1,+7,+8,+9,+4%5D\);%0A++++assert_eq!\(u,+%5B2,+3%5D\);%0A%7D&edition=2024 "Run code")

Using `splice` to insert new items into a vector efficiently at a specific position indicated by an empty range:

```
let mut v = vec![1, 5];
let new = [2, 3, 4];
v.splice(1..1, new);
assert_eq!(v, [1, 2, 3, 4, 5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+vec!%5B1,+5%5D;%0A++++let+new+=+%5B2,+3,+4%5D;%0A++++v.splice\(1..1,+new\);%0A++++assert_eq!\(v,+%5B1,+2,+3,+4,+5%5D\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/alloc/vec/mod.rs.html#4148-4151)

#### pub fn [extract\_if](#method.extract_if)<F, R>( &mut self, range: R, filter: F, ) -> [ExtractIf](struct.ExtractIf.html "struct std::vec::ExtractIf")<'\_, T, F, A> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html)) -> [bool](../primitive.bool.html), R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

Creates an iterator which uses a closure to determine if an element in the range should be removed.

If the closure returns `true`, the element is removed from the vector and yielded. If the closure returns `false`, or panics, the element remains in the vector and will not be yielded.

Only elements that fall in the provided range are considered for extraction, but any elements after the range will still have to be moved if any element has been extracted.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating or the iteration short-circuits, then the remaining elements will be retained. Use `extract_if().for_each(drop)` if you do not need the returned iterator, or [`retain_mut`](struct.Vec.html#method.retain_mut "method std::vec::Vec::retain_mut") with a negated predicate if you also do not need to restrict the range.

Using this method is equivalent to the following code:

```
let mut i = range.start;
let end_items = vec.len() - range.end;

while i < vec.len() - end_items {
    if some_predicate(&mut vec[i]) {
        let val = vec.remove(i);
        // your code here
    } else {
        i += 1;
    }
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+some_predicate+=+%7Cx:+%26mut+i32%7C+%7B+*x+%25+2+==+1+%7D;%0A++++let+mut+vec+=+vec!%5B0,+1,+2,+3,+4,+5,+6%5D;%0A++++let+mut+vec2+=+vec.clone\(\);%0A++++let+range+=+1..5;%0A++++let+mut+i+=+range.start;%0A++++let+end_items+=+vec.len\(\)+-+range.end;%0A++++let+mut+extracted+=+vec!%5B%5D;%0A++++%0A++++while+i+%3C+vec.len\(\)+-+end_items+%7B%0A++++++++if+some_predicate\(%26mut+vec%5Bi%5D\)+%7B%0A++++++++++++let+val+=+vec.remove\(i\);%0A++++++++++++//+your+code+here%0A++++++++++++extracted.push\(val\);%0A++++++++%7D+else+%7B%0A++++++++++++i+%2B=+1;%0A++++++++%7D%0A++++%7D%0A++++%0A++++let+extracted2:+Vec%3C_%3E+=+vec2.extract_if\(range,+some_predicate\).collect\(\);%0A++++assert_eq!\(vec,+vec2\);%0A++++assert_eq!\(extracted,+extracted2\);%0A%7D&edition=2024 "Run code")

But `extract_if` is easier to use. `extract_if` is also more efficient, because it can backshift the elements of the array in bulk.

The iterator also lets you mutate the value of each element in the closure, regardless of whether you choose to keep or remove it.

##### [§](#panics-19)Panics

If `range` is out of bounds.

##### [§](#examples-63)Examples

Splitting a vector into even and odd values, reusing the original vector:

```
let mut numbers = vec![1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 15];

let evens = numbers.extract_if(.., |x| *x % 2 == 0).collect::<Vec<_>>();
let odds = numbers;

assert_eq!(evens, vec![2, 4, 6, 8, 14]);
assert_eq!(odds, vec![1, 3, 5, 9, 11, 13, 15]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+numbers+=+vec!%5B1,+2,+3,+4,+5,+6,+8,+9,+11,+13,+14,+15%5D;%0A++++%0A++++let+evens+=+numbers.extract_if\(..,+%7Cx%7C+*x+%25+2+==+0\).collect::%3CVec%3C_%3E%3E\(\);%0A++++let+odds+=+numbers;%0A++++%0A++++assert_eq!\(evens,+vec!%5B2,+4,+6,+8,+14%5D\);%0A++++assert_eq!\(odds,+vec!%5B1,+3,+5,+9,+11,+13,+15%5D\);%0A%7D&edition=2024 "Run code")

Using the range argument to only process a part of the vector:

```
let mut items = vec![0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2];
let ones = items.extract_if(7.., |x| *x == 1).collect::<Vec<_>>();
assert_eq!(items, vec![0, 0, 0, 0, 0, 0, 0, 2, 2, 2]);
assert_eq!(ones.len(), 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+items+=+vec!%5B0,+0,+0,+0,+0,+0,+0,+1,+2,+1,+2,+1,+2%5D;%0A++++let+ones+=+items.extract_if\(7..,+%7Cx%7C+*x+==+1\).collect::%3CVec%3C_%3E%3E\(\);%0A++++assert_eq!\(items,+vec!%5B0,+0,+0,+0,+0,+0,+0,+2,+2,+2%5D\);%0A++++assert_eq!\(ones.len\(\),+3\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#116)

#### pub fn [len](#method.len-1)(&self) -> [usize](../primitive.usize.html)

Returns the number of elements in the slice.

##### [§](#examples-64)Examples

```
let a = [1, 2, 3];
assert_eq!(a.len(), 3);
```

%5D%0Afn+main\(\)+%7B%0A++++let+a+=+%5B1,+2,+3%5D;%0A++++assert_eq!\(a.len\(\),+3\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#136)

#### pub fn [is\_empty](#method.is_empty-1)(&self) -> [bool](../primitive.bool.html)

Returns `true` if the slice has a length of 0.

##### [§](#examples-65)Examples

```
let a = [1, 2, 3];
assert!(!a.is_empty());

let b: &[i32] = &[];
assert!(b.is_empty());
```

%5D%0Afn+main\(\)+%7B%0A++++let+a+=+%5B1,+2,+3%5D;%0A++++assert!\(!a.is_empty\(\)\);%0A++++%0A++++let+b:+%26%5Bi32%5D+=+%26%5B%5D;%0A++++assert!\(b.is_empty\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#155)

#### pub fn [first](#method.first)(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&T](../primitive.reference.html)\>

Returns the first element of the slice, or `None` if it is empty.

##### [§](#examples-66)Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&10), v.first());

let w: &[i32] = &[];
assert_eq!(None, w.first());
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert_eq!\(Some\(%2610\),+v.first\(\)\);%0A++++%0A++++let+w:+%26%5Bi32%5D+=+%26%5B%5D;%0A++++assert_eq!\(None,+w.first\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#178)

#### pub fn [first\_mut](#method.first_mut)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&mut T](../primitive.reference.html)\>

Returns a mutable reference to the first element of the slice, or `None` if it is empty.

##### [§](#examples-67)Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_mut() {
    *first = 5;
}
assert_eq!(x, &[5, 1, 2]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.first_mut());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(first\)+=+x.first_mut\(\)+%7B%0A++++++++*first+=+5;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B5,+1,+2%5D\);%0A++++%0A++++let+y:+%26mut+%5Bi32%5D+=+%26mut+%5B%5D;%0A++++assert_eq!\(None,+y.first_mut\(\)\);%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/core/slice/mod.rs.html#198)

#### pub fn [split\_first](#method.split_first)(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<([&T](../primitive.reference.html), &[\[T\]](../primitive.slice.html))>

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

##### [§](#examples-68)Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first() {
    assert_eq!(first, &0);
    assert_eq!(elements, &[1, 2]);
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(first,+elements\)\)+=+x.split_first\(\)+%7B%0A++++++++assert_eq!\(first,+%260\);%0A++++++++assert_eq!\(elements,+%26%5B1,+2%5D\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/core/slice/mod.rs.html#220)

#### pub fn [split\_first\_mut](#method.split_first_mut)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<([&mut T](../primitive.reference.html), &mut [\[T\]](../primitive.slice.html))>

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

##### [§](#examples-69)Examples

```
let x = &mut [0, 1, 2];

if let Some((first, elements)) = x.split_first_mut() {
    *first = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[3, 4, 5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(first,+elements\)\)+=+x.split_first_mut\(\)+%7B%0A++++++++*first+=+3;%0A++++++++elements%5B0%5D+=+4;%0A++++++++elements%5B1%5D+=+5;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B3,+4,+5%5D\);%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/core/slice/mod.rs.html#240)

#### pub fn [split\_last](#method.split_last)(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<([&T](../primitive.reference.html), &[\[T\]](../primitive.slice.html))>

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

##### [§](#examples-70)Examples

```
let x = &[0, 1, 2];

if let Some((last, elements)) = x.split_last() {
    assert_eq!(last, &2);
    assert_eq!(elements, &[0, 1]);
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(last,+elements\)\)+=+x.split_last\(\)+%7B%0A++++++++assert_eq!\(last,+%262\);%0A++++++++assert_eq!\(elements,+%26%5B0,+1%5D\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/core/slice/mod.rs.html#262)

#### pub fn [split\_last\_mut](#method.split_last_mut)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<([&mut T](../primitive.reference.html), &mut [\[T\]](../primitive.slice.html))>

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

##### [§](#examples-71)Examples

```
let x = &mut [0, 1, 2];

if let Some((last, elements)) = x.split_last_mut() {
    *last = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[4, 5, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(last,+elements\)\)+=+x.split_last_mut\(\)+%7B%0A++++++++*last+=+3;%0A++++++++elements%5B0%5D+=+4;%0A++++++++elements%5B1%5D+=+5;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B4,+5,+3%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#281)

#### pub fn [last](#method.last)(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&T](../primitive.reference.html)\>

Returns the last element of the slice, or `None` if it is empty.

##### [§](#examples-72)Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&30), v.last());

let w: &[i32] = &[];
assert_eq!(None, w.last());
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert_eq!\(Some\(%2630\),+v.last\(\)\);%0A++++%0A++++let+w:+%26%5Bi32%5D+=+%26%5B%5D;%0A++++assert_eq!\(None,+w.last\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#304)

#### pub fn [last\_mut](#method.last_mut)(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&mut T](../primitive.reference.html)\>

Returns a mutable reference to the last item in the slice, or `None` if it is empty.

##### [§](#examples-73)Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_mut() {
    *last = 10;
}
assert_eq!(x, &[0, 1, 10]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.last_mut());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(last\)+=+x.last_mut\(\)+%7B%0A++++++++*last+=+10;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B0,+1,+10%5D\);%0A++++%0A++++let+y:+%26mut+%5Bi32%5D+=+%26mut+%5B%5D;%0A++++assert_eq!\(None,+y.last_mut\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#327)

#### pub fn [first\_chunk](#method.first_chunk)<const N: [usize](../primitive.usize.html)\>(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T; N\]](../primitive.array.html)\>

Returns an array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-74)Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[10, 40]), u.first_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.first_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.first_chunk::<0>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+u+=+%5B10,+40,+30%5D;%0A++++assert_eq!\(Some\(%26%5B10,+40%5D\),+u.first_chunk::%3C2%3E\(\)\);%0A++++%0A++++let+v:+%26%5Bi32%5D+=+%26%5B10%5D;%0A++++assert_eq!\(None,+v.first_chunk::%3C2%3E\(\)\);%0A++++%0A++++let+w:+%26%5Bi32%5D+=+%26%5B%5D;%0A++++assert_eq!\(Some\(%26%5B%5D\),+w.first_chunk::%3C0%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#357)

#### pub fn [first\_chunk\_mut](#method.first_chunk_mut)<const N: [usize](../primitive.usize.html)\>(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&mut [\[T; N\]](../primitive.array.html)\>

Returns a mutable array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-75)Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_chunk_mut::<2>() {
    first[0] = 5;
    first[1] = 4;
}
assert_eq!(x, &[5, 4, 2]);

assert_eq!(None, x.first_chunk_mut::<4>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(first\)+=+x.first_chunk_mut::%3C2%3E\(\)+%7B%0A++++++++first%5B0%5D+=+5;%0A++++++++first%5B1%5D+=+4;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B5,+4,+2%5D\);%0A++++%0A++++assert_eq!\(None,+x.first_chunk_mut::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#387)

#### pub fn [split\_first\_chunk](#method.split_first_chunk)<const N: [usize](../primitive.usize.html)\>(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&[\[T; N\]](../primitive.array.html), &[\[T\]](../primitive.slice.html))>

Returns an array reference to the first `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-76)Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first_chunk::<2>() {
    assert_eq!(first, &[0, 1]);
    assert_eq!(elements, &[2]);
}

assert_eq!(None, x.split_first_chunk::<4>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(first,+elements\)\)+=+x.split_first_chunk::%3C2%3E\(\)+%7B%0A++++++++assert_eq!\(first,+%26%5B0,+1%5D\);%0A++++++++assert_eq!\(elements,+%26%5B2%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(None,+x.split_first_chunk::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#417-419)

#### pub fn [split\_first\_chunk\_mut](#method.split_first_chunk_mut)<const N: [usize](../primitive.usize.html)\>( &mut self, ) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&mut [\[T; N\]](../primitive.array.html), &mut [\[T\]](../primitive.slice.html))>

Returns a mutable array reference to the first `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-77)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(first,+elements\)\)+=+x.split_first_chunk_mut::%3C2%3E\(\)+%7B%0A++++++++first%5B0%5D+=+3;%0A++++++++first%5B1%5D+=+4;%0A++++++++elements%5B0%5D+=+5;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B3,+4,+5%5D\);%0A++++%0A++++assert_eq!\(None,+x.split_first_chunk_mut::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#447)

#### pub fn [split\_last\_chunk](#method.split_last_chunk)<const N: [usize](../primitive.usize.html)\>(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&[\[T\]](../primitive.slice.html), &[\[T; N\]](../primitive.array.html))>

Returns an array reference to the last `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-78)Examples

```
let x = &[0, 1, 2];

if let Some((elements, last)) = x.split_last_chunk::<2>() {
    assert_eq!(elements, &[0]);
    assert_eq!(last, &[1, 2]);
}

assert_eq!(None, x.split_last_chunk::<4>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(elements,+last\)\)+=+x.split_last_chunk::%3C2%3E\(\)+%7B%0A++++++++assert_eq!\(elements,+%26%5B0%5D\);%0A++++++++assert_eq!\(last,+%26%5B1,+2%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(None,+x.split_last_chunk::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#478-480)

#### pub fn [split\_last\_chunk\_mut](#method.split_last_chunk_mut)<const N: [usize](../primitive.usize.html)\>( &mut self, ) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&mut [\[T\]](../primitive.slice.html), &mut [\[T; N\]](../primitive.array.html))>

Returns a mutable array reference to the last `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-79)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(\(elements,+last\)\)+=+x.split_last_chunk_mut::%3C2%3E\(\)+%7B%0A++++++++last%5B0%5D+=+3;%0A++++++++last%5B1%5D+=+4;%0A++++++++elements%5B0%5D+=+5;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B5,+3,+4%5D\);%0A++++%0A++++assert_eq!\(None,+x.split_last_chunk_mut::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#509)

#### pub fn [last\_chunk](#method.last_chunk)<const N: [usize](../primitive.usize.html)\>(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T; N\]](../primitive.array.html)\>

Returns an array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-80)Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[40, 30]), u.last_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.last_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.last_chunk::<0>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+u+=+%5B10,+40,+30%5D;%0A++++assert_eq!\(Some\(%26%5B40,+30%5D\),+u.last_chunk::%3C2%3E\(\)\);%0A++++%0A++++let+v:+%26%5Bi32%5D+=+%26%5B10%5D;%0A++++assert_eq!\(None,+v.last_chunk::%3C2%3E\(\)\);%0A++++%0A++++let+w:+%26%5Bi32%5D+=+%26%5B%5D;%0A++++assert_eq!\(Some\(%26%5B%5D\),+w.last_chunk::%3C0%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#539)

#### pub fn [last\_chunk\_mut](#method.last_chunk_mut)<const N: [usize](../primitive.usize.html)\>(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&mut [\[T; N\]](../primitive.array.html)\>

Returns a mutable array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

##### [§](#examples-81)Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_chunk_mut::<2>() {
    last[0] = 10;
    last[1] = 20;
}
assert_eq!(x, &[0, 10, 20]);

assert_eq!(None, x.last_chunk_mut::<4>());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(last\)+=+x.last_chunk_mut::%3C2%3E\(\)+%7B%0A++++++++last%5B0%5D+=+10;%0A++++++++last%5B1%5D+=+20;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B0,+10,+20%5D\);%0A++++%0A++++assert_eq!\(None,+x.last_chunk_mut::%3C4%3E\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#572-574)

#### pub fn [get](#method.get)<I>(&self, index: I) -> [Option](../option/enum.Option.html "enum std::option::Option")<&<I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output")\>

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns a reference to an element or subslice depending on the type of index.

* If given a position, returns a reference to the element at that position or `None` if out of bounds.
* If given a range, returns the subslice corresponding to that range, or `None` if out of bounds.

##### [§](#examples-82)Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&40), v.get(1));
assert_eq!(Some(&[10, 40][..]), v.get(0..2));
assert_eq!(None, v.get(3));
assert_eq!(None, v.get(0..4));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert_eq!\(Some\(%2640\),+v.get\(1\)\);%0A++++assert_eq!\(Some\(%26%5B10,+40%5D%5B..%5D\),+v.get\(0..2\)\);%0A++++assert_eq!\(None,+v.get\(3\)\);%0A++++assert_eq!\(None,+v.get\(0..4\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#599-601)

#### pub fn [get\_mut](#method.get_mut)<I>( &mut self, index: I, ) -> [Option](../option/enum.Option.html "enum std::option::Option")<&mut <I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output")\>

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns a mutable reference to an element or subslice depending on the type of index (see [`get`](../primitive.slice.html#method.get "method slice::get")) or `None` if the index is out of bounds.

##### [§](#examples-83)Examples

```
let x = &mut [0, 1, 2];

if let Some(elem) = x.get_mut(1) {
    *elem = 42;
}
assert_eq!(x, &[0, 42, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B0,+1,+2%5D;%0A++++%0A++++if+let+Some\(elem\)+=+x.get_mut\(1\)+%7B%0A++++++++*elem+=+42;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B0,+42,+2%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#639-641)

#### pub unsafe fn [get\_unchecked](#method.get_unchecked)<I>( &self, index: I, ) -> &<I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output")

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns a reference to an element or subslice, without doing bounds checking.

For a safe alternative see [`get`](../primitive.slice.html#method.get "method slice::get").

##### [§](#safety-5)Safety

Calling this method with an out-of-bounds index is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_ even if the resulting reference is not used.

You can think of this like `.get(index).unwrap_unchecked()`. It’s UB to call `.get_unchecked(len)`, even if you immediately convert to a pointer. And it’s UB to call `.get_unchecked(..len + 1)`, `.get_unchecked(..=len)`, or similar.

##### [§](#examples-84)Examples

```
let x = &[1, 2, 4];

unsafe {
    assert_eq!(x.get_unchecked(1), &2);
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B1,+2,+4%5D;%0A++++%0A++++unsafe+%7B%0A++++++++assert_eq!\(x.get_unchecked\(1\),+%262\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#684-686)

#### pub unsafe fn [get\_unchecked\_mut](#method.get_unchecked_mut)<I>( &mut self, index: I, ) -> &mut <I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output")

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns a mutable reference to an element or subslice, without doing bounds checking.

For a safe alternative see [`get_mut`](../primitive.slice.html#method.get_mut "method slice::get_mut").

##### [§](#safety-6)Safety

Calling this method with an out-of-bounds index is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_ even if the resulting reference is not used.

You can think of this like `.get_mut(index).unwrap_unchecked()`. It’s UB to call `.get_unchecked_mut(len)`, even if you immediately convert to a pointer. And it’s UB to call `.get_unchecked_mut(..len + 1)`, `.get_unchecked_mut(..=len)`, or similar.

##### [§](#examples-85)Examples

```
let x = &mut [1, 2, 4];

unsafe {
    let elem = x.get_unchecked_mut(1);
    *elem = 13;
}
assert_eq!(x, &[1, 13, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B1,+2,+4%5D;%0A++++%0A++++unsafe+%7B%0A++++++++let+elem+=+x.get_unchecked_mut\(1\);%0A++++++++*elem+=+13;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B1,+13,+4%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#726)

#### pub fn [as\_ptr](#method.as_ptr-1)(&self) -> [\*const T](../primitive.pointer.html)

Returns a raw pointer to the slice’s buffer.

The caller must ensure that the slice outlives the pointer this function returns, or else it will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to is never written to (except inside an `UnsafeCell`) using this pointer or any pointer derived from it. If you need to mutate the contents of the slice, use [`as_mut_ptr`](../primitive.slice.html#method.as_mut_ptr "method slice::as_mut_ptr").

Modifying the container referenced by this slice may cause its buffer to be reallocated, which would also make any pointers to it invalid.

##### [§](#examples-86)Examples

```
let x = &[1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(x.get_unchecked(i), &*x_ptr.add(i));
    }
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B1,+2,+4%5D;%0A++++let+x_ptr+=+x.as_ptr\(\);%0A++++%0A++++unsafe+%7B%0A++++++++for+i+in+0..x.len\(\)+%7B%0A++++++++++++assert_eq!\(x.get_unchecked\(i\),+%26*x_ptr.add\(i\)\);%0A++++++++%7D%0A++++%7D%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#757)

#### pub fn [as\_mut\_ptr](#method.as_mut_ptr-1)(&mut self) -> [\*mut T](../primitive.pointer.html)

Returns an unsafe mutable pointer to the slice’s buffer.

The caller must ensure that the slice outlives the pointer this function returns, or else it will end up dangling.

Modifying the container referenced by this slice may cause its buffer to be reallocated, which would also make any pointers to it invalid.

##### [§](#examples-87)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B1,+2,+4%5D;%0A++++let+x_ptr+=+x.as_mut_ptr\(\);%0A++++%0A++++unsafe+%7B%0A++++++++for+i+in+0..x.len\(\)+%7B%0A++++++++++++*x_ptr.add\(i\)+%2B=+2;%0A++++++++%7D%0A++++%7D%0A++++assert_eq!\(x,+%26%5B3,+4,+6%5D\);%0A%7D&edition=2024 "Run code")

1.48.0 · [Source](../../src/core/slice/mod.rs.html#793)

#### pub fn [as\_ptr\_range](#method.as_ptr_range)(&self) -> [Range](../ops/struct.Range.html "struct std::ops::Range")<[\*const T](../primitive.pointer.html)\> [ⓘ](#)

Returns the two raw pointers spanning the slice.

The returned range is half-open, which means that the end pointer points _one past_ the last element of the slice. This way, an empty slice is represented by two equal pointers, and the difference between the two pointers represents the size of the slice.

See [`as_ptr`](../primitive.slice.html#method.as_ptr "method slice::as_ptr") for warnings on using these pointers. The end pointer requires extra caution, as it does not point to a valid element in the slice.

This function is useful for interacting with foreign interfaces which use two pointers to refer to a range of elements in memory, as is common in C++.

It can also be useful to check if a pointer to an element refers to an element of this slice:

```
let a = [1, 2, 3];
let x = &a[1] as *const _;
let y = &5 as *const _;

assert!(a.as_ptr_range().contains(&x));
assert!(!a.as_ptr_range().contains(&y));
```

%5D%0Afn+main\(\)+%7B%0A++++let+a+=+%5B1,+2,+3%5D;%0A++++let+x+=+%26a%5B1%5D+as+*const+_;%0A++++let+y+=+%265+as+*const+_;%0A++++%0A++++assert!\(a.as_ptr_range\(\).contains\(%26x\)\);%0A++++assert!\(!a.as_ptr_range\(\).contains\(%26y\)\);%0A%7D&edition=2024 "Run code")

1.48.0 · [Source](../../src/core/slice/mod.rs.html#836)

#### pub fn [as\_mut\_ptr\_range](#method.as_mut_ptr_range)(&mut self) -> [Range](../ops/struct.Range.html "struct std::ops::Range")<[\*mut T](../primitive.pointer.html)\> [ⓘ](#)

Returns the two unsafe mutable pointers spanning the slice.

The returned range is half-open, which means that the end pointer points _one past_ the last element of the slice. This way, an empty slice is represented by two equal pointers, and the difference between the two pointers represents the size of the slice.

See [`as_mut_ptr`](../primitive.slice.html#method.as_mut_ptr "method slice::as_mut_ptr") for warnings on using these pointers. The end pointer requires extra caution, as it does not point to a valid element in the slice.

This function is useful for interacting with foreign interfaces which use two pointers to refer to a range of elements in memory, as is common in C++.

1.93.0 · [Source](../../src/core/slice/mod.rs.html#850)

#### pub fn [as\_array](#method.as_array)<const N: [usize](../primitive.usize.html)\>(&self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T; N\]](../primitive.array.html)\>

Gets a reference to the underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

1.93.0 · [Source](../../src/core/slice/mod.rs.html#869)

#### pub fn [as\_mut\_array](#method.as_mut_array)<const N: [usize](../primitive.usize.html)\>(&mut self) -> [Option](../option/enum.Option.html "enum std::option::Option")<&mut [\[T; N\]](../primitive.array.html)\>

Gets a mutable reference to the slice’s underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

1.0.0 · [Source](../../src/core/slice/mod.rs.html#905)

#### pub fn [swap](#method.swap)(&mut self, a: [usize](../primitive.usize.html), b: [usize](../primitive.usize.html))

Swaps two elements in the slice.

If `a` equals to `b`, it’s guaranteed that elements won’t change value.

##### [§](#arguments)Arguments

* a - The index of the first element
* b - The index of the second element

##### [§](#panics-20)Panics

Panics if `a` or `b` are out of bounds.

##### [§](#examples-88)Examples

```
let mut v = ["a", "b", "c", "d", "e"];
v.swap(2, 4);
assert!(v == ["a", "b", "e", "d", "c"]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B%22a%22,+%22b%22,+%22c%22,+%22d%22,+%22e%22%5D;%0A++++v.swap\(2,+4\);%0A++++assert!\(v+==+%5B%22a%22,+%22b%22,+%22e%22,+%22d%22,+%22c%22%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#948)

#### pub unsafe fn [swap\_unchecked](#method.swap_unchecked)(&mut self, a: [usize](../primitive.usize.html), b: [usize](../primitive.usize.html))

🔬This is a nightly-only experimental API. (`slice_swap_unchecked` [#88539](https://github.com/rust-lang/rust/issues/88539))

Swaps two elements in the slice, without doing bounds checking.

For a safe alternative see [`swap`](../primitive.slice.html#method.swap "method slice::swap").

##### [§](#arguments-1)Arguments

* a - The index of the first element
* b - The index of the second element

##### [§](#safety-7)Safety

Calling this method with an out-of-bounds index is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_. The caller has to ensure that `a < self.len()` and `b < self.len()`.

##### [§](#examples-89)Examples

```
#![feature(slice_swap_unchecked)]

let mut v = ["a", "b", "c", "d"];
// SAFETY: we know that 1 and 3 are both indices of the slice
unsafe { v.swap_unchecked(1, 3) };
assert!(v == ["a", "d", "c", "b"]);
```

%5D%0A%23!%5Bfeature\(slice_swap_unchecked\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B%22a%22,+%22b%22,+%22c%22,+%22d%22%5D;%0A++++//+SAFETY:+we+know+that+1+and+3+are+both+indices+of+the+slice%0A++++unsafe+%7B+v.swap_unchecked\(1,+3\)+%7D;%0A++++assert!\(v+==+%5B%22a%22,+%22d%22,+%22c%22,+%22b%22%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#978)

#### pub fn [reverse](#method.reverse)(&mut self)

Reverses the order of elements in the slice, in place.

##### [§](#examples-90)Examples

```
let mut v = [1, 2, 3];
v.reverse();
assert!(v == [3, 2, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B1,+2,+3%5D;%0A++++v.reverse\(\);%0A++++assert!\(v+==+%5B3,+2,+1%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1040)

#### pub fn [iter](#method.iter)(&self) -> [Iter](../slice/struct.Iter.html "struct std::slice::Iter")<'\_, T> [ⓘ](#)

Returns an iterator over the slice.

The iterator yields all items from start to end.

##### [§](#examples-91)Examples

```
let x = &[1, 2, 4];
let mut iterator = x.iter();

assert_eq!(iterator.next(), Some(&1));
assert_eq!(iterator.next(), Some(&2));
assert_eq!(iterator.next(), Some(&4));
assert_eq!(iterator.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26%5B1,+2,+4%5D;%0A++++let+mut+iterator+=+x.iter\(\);%0A++++%0A++++assert_eq!\(iterator.next\(\),+Some\(%261\)\);%0A++++assert_eq!\(iterator.next\(\),+Some\(%262\)\);%0A++++assert_eq!\(iterator.next\(\),+Some\(%264\)\);%0A++++assert_eq!\(iterator.next\(\),+None\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1060)

#### pub fn [iter\_mut](#method.iter_mut)(&mut self) -> [IterMut](../slice/struct.IterMut.html "struct std::slice::IterMut")<'\_, T> [ⓘ](#)

Returns an iterator that allows modifying each value.

The iterator yields all items from start to end.

##### [§](#examples-92)Examples

```
let x = &mut [1, 2, 4];
for elem in x.iter_mut() {
    *elem += 2;
}
assert_eq!(x, &[3, 4, 6]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B1,+2,+4%5D;%0A++++for+elem+in+x.iter_mut\(\)+%7B%0A++++++++*elem+%2B=+2;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B3,+4,+6%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1115)

#### pub fn [windows](#method.windows)(&self, size: [usize](../primitive.usize.html)) -> [Windows](../slice/struct.Windows.html "struct std::slice::Windows")<'\_, T> [ⓘ](#)

Returns an iterator over all contiguous windows of length `size`. The windows overlap. If the slice is shorter than `size`, the iterator returns no values.

##### [§](#panics-21)Panics

Panics if `size` is zero.

##### [§](#examples-93)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.windows(3);
assert_eq!(iter.next().unwrap(), &['l', 'o', 'r']);
assert_eq!(iter.next().unwrap(), &['o', 'r', 'e']);
assert_eq!(iter.next().unwrap(), &['r', 'e', 'm']);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+mut+iter+=+slice.windows\(3\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'l',+'o',+'r'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'o',+'r',+'e'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'r',+'e',+'m'%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

If the slice is shorter than `size`:

```
let slice = ['f', 'o', 'o'];
let mut iter = slice.windows(4);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'f',+'o',+'o'%5D;%0A++++let+mut+iter+=+slice.windows\(4\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

Because the [Iterator](../iter/trait.Iterator.html "trait std::iter::Iterator") trait cannot represent the required lifetimes, there is no `windows_mut` analog to `windows`; `[0,1,2].windows_mut(2).collect()` would violate [the rules of references](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#the-rules-of-references) (though a [LendingIterator](https://blog.rust-lang.org/2022/10/28/gats-stabilization.html) analog is possible). You can sometimes use [`Cell::as_slice_of_cells`](../cell/struct.Cell.html#method.as_slice_of_cells "method std::cell::Cell::as_slice_of_cells") in conjunction with `windows` instead:

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

%5D%0Afn+main\(\)+%7B%0A++++use+std::cell::Cell;%0A++++%0A++++let+mut+array+=+%5B'R',+'u',+'s',+'t',+'+',+'2',+'0',+'1',+'5'%5D;%0A++++let+slice+=+%26mut+array%5B..%5D;%0A++++let+slice_of_cells:+%26%5BCell%3Cchar%3E%5D+=+Cell::from_mut\(slice\).as_slice_of_cells\(\);%0A++++for+w+in+slice_of_cells.windows\(3\)+%7B%0A++++++++Cell::swap\(%26w%5B0%5D,+%26w%5B2%5D\);%0A++++%7D%0A++++assert_eq!\(array,+%5B's',+'t',+'+',+'2',+'0',+'1',+'5',+'u',+'R'%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1155)

#### pub fn [chunks](#method.chunks)(&self, chunk\_size: [usize](../primitive.usize.html)) -> [Chunks](../slice/struct.Chunks.html "struct std::slice::Chunks")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See [`chunks_exact`](../primitive.slice.html#method.chunks_exact "method slice::chunks_exact") for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and [`rchunks`](../primitive.slice.html#method.rchunks "method slice::rchunks") for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks`](../primitive.slice.html#method.as_chunks "method slice::as_chunks") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-22)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-94)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert_eq!(iter.next().unwrap(), &['m']);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+mut+iter+=+slice.chunks\(2\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'l',+'o'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'r',+'e'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'm'%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1199)

#### pub fn [chunks\_mut](#method.chunks_mut)(&mut self, chunk\_size: [usize](../primitive.usize.html)) -> [ChunksMut](../slice/struct.ChunksMut.html "struct std::slice::ChunksMut")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See [`chunks_exact_mut`](../primitive.slice.html#method.chunks_exact_mut "method slice::chunks_exact_mut") for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and [`rchunks_mut`](../primitive.slice.html#method.rchunks_mut "method slice::rchunks_mut") for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks_mut`](../primitive.slice.html#method.as_chunks_mut "method slice::as_chunks_mut") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-23)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-95)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++for+chunk+in+v.chunks_mut\(2\)+%7B%0A++++++++for+elem+in+chunk.iter_mut\(\)+%7B%0A++++++++++++*elem+%2B=+count;%0A++++++++%7D%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B1,+1,+2,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1242)

#### pub fn [chunks\_exact](#method.chunks_exact)(&self, chunk\_size: [usize](../primitive.usize.html)) -> [ChunksExact](../slice/struct.ChunksExact.html "struct std::slice::ChunksExact")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of [`chunks`](../primitive.slice.html#method.chunks "method slice::chunks").

See [`chunks`](../primitive.slice.html#method.chunks "method slice::chunks") for a variant of this iterator that also returns the remainder as a smaller chunk, and [`rchunks_exact`](../primitive.slice.html#method.rchunks_exact "method slice::rchunks_exact") for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks`](../primitive.slice.html#method.as_chunks "method slice::as_chunks") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-24)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-96)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['m']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+mut+iter+=+slice.chunks_exact\(2\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'l',+'o'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'r',+'e'%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A++++assert_eq!\(iter.remainder\(\),+%26%5B'm'%5D\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1290)

#### pub fn [chunks\_exact\_mut](#method.chunks_exact_mut)(&mut self, chunk\_size: [usize](../primitive.usize.html)) -> [ChunksExactMut](../slice/struct.ChunksExactMut.html "struct std::slice::ChunksExactMut")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of [`chunks_mut`](../primitive.slice.html#method.chunks_mut "method slice::chunks_mut").

See [`chunks_mut`](../primitive.slice.html#method.chunks_mut "method slice::chunks_mut") for a variant of this iterator that also returns the remainder as a smaller chunk, and [`rchunks_exact_mut`](../primitive.slice.html#method.rchunks_exact_mut "method slice::rchunks_exact_mut") for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks_mut`](../primitive.slice.html#method.as_chunks_mut "method slice::as_chunks_mut") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-25)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-97)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++for+chunk+in+v.chunks_exact_mut\(2\)+%7B%0A++++++++for+elem+in+chunk.iter_mut\(\)+%7B%0A++++++++++++*elem+%2B=+count;%0A++++++++%7D%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B1,+1,+2,+2,+0%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1338)

#### pub unsafe fn [as\_chunks\_unchecked](#method.as_chunks_unchecked)<const N: [usize](../primitive.usize.html)\>(&self) -> &\[[\[T; N\]](../primitive.array.html)\]

Splits the slice into a slice of `N`\-element arrays, assuming that there’s no remainder.

This is the inverse operation to [`as_flattened`](../primitive.slice.html#method.as_flattened "method slice::as_flattened").

As this is `unsafe`, consider whether you could use [`as_chunks`](../primitive.slice.html#method.as_chunks "method slice::as_chunks") or [`as_rchunks`](../primitive.slice.html#method.as_rchunks "method slice::as_rchunks") instead, perhaps via something like `if let (chunks, []) = slice.as_chunks()` or `let (chunks, []) = slice.as_chunks() else { unreachable!() };`.

##### [§](#safety-8)Safety

This may only be called when

* The slice splits exactly into `N`\-element chunks (aka `self.len() % N == 0`).
* `N != 0`.

##### [§](#examples-98)Examples

```
let slice: &[char] = &['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &[[char; 1]] =
    // SAFETY: 1-element chunks never have remainder
    unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &[[char; 3]] =
    // SAFETY: The slice length (6) is a multiple of 3
    unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l', 'o', 'r'], ['e', 'm', '!']]);

// These would be unsound:
// let chunks: &[[_; 5]] = slice.as_chunks_unchecked() // The slice length is not a multiple of 5
// let chunks: &[[_; 0]] = slice.as_chunks_unchecked() // Zero-length chunks are never allowed
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice:+%26%5Bchar%5D+=+%26%5B'l',+'o',+'r',+'e',+'m',+'!'%5D;%0A++++let+chunks:+%26%5B%5Bchar;+1%5D%5D+=%0A++++++++//+SAFETY:+1-element+chunks+never+have+remainder%0A++++++++unsafe+%7B+slice.as_chunks_unchecked\(\)+%7D;%0A++++assert_eq!\(chunks,+%26%5B%5B'l'%5D,+%5B'o'%5D,+%5B'r'%5D,+%5B'e'%5D,+%5B'm'%5D,+%5B'!'%5D%5D\);%0A++++let+chunks:+%26%5B%5Bchar;+3%5D%5D+=%0A++++++++//+SAFETY:+The+slice+length+\(6\)+is+a+multiple+of+3%0A++++++++unsafe+%7B+slice.as_chunks_unchecked\(\)+%7D;%0A++++assert_eq!\(chunks,+%26%5B%5B'l',+'o',+'r'%5D,+%5B'e',+'m',+'!'%5D%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1396)

#### pub fn [as\_chunks](#method.as_chunks)<const N: [usize](../primitive.usize.html)\>(&self) -> (&\[[\[T; N\]](../primitive.array.html)\], &[\[T\]](../primitive.slice.html))

Splits the slice into a slice of `N`\-element arrays, starting at the beginning of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (chunks, remainder) = slice.as_chunks()`, then:

* `chunks.len()` equals `slice.len() / N`,
* `remainder.len()` equals `slice.len() % N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with [`as_flattened`](../primitive.slice.html#method.as_flattened "method slice::as_flattened").

##### [§](#panics-26)Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### [§](#examples-99)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let (chunks, remainder) = slice.as_chunks();
assert_eq!(chunks, &[['l', 'o'], ['r', 'e']]);
assert_eq!(remainder, &['m']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+\(chunks,+remainder\)+=+slice.as_chunks\(\);%0A++++assert_eq!\(chunks,+%26%5B%5B'l',+'o'%5D,+%5B'r',+'e'%5D%5D\);%0A++++assert_eq!\(remainder,+%26%5B'm'%5D\);%0A%7D&edition=2024 "Run code")

If you expect the slice to be an exact multiple, you can combine `let`\-`else` with an empty slice pattern:

```
let slice = ['R', 'u', 's', 't'];
let (chunks, []) = slice.as_chunks::<2>() else {
    panic!("slice didn't have even length")
};
assert_eq!(chunks, &[['R', 'u'], ['s', 't']]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'R',+'u',+'s',+'t'%5D;%0A++++let+\(chunks,+%5B%5D\)+=+slice.as_chunks::%3C2%3E\(\)+else+%7B%0A++++++++panic!\(%22slice+didn't+have+even+length%22\)%0A++++%7D;%0A++++assert_eq!\(chunks,+%26%5B%5B'R',+'u'%5D,+%5B's',+'t'%5D%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1443)

#### pub fn [as\_rchunks](#method.as_rchunks)<const N: [usize](../primitive.usize.html)\>(&self) -> (&[\[T\]](../primitive.slice.html), &\[[\[T; N\]](../primitive.array.html)\])

Splits the slice into a slice of `N`\-element arrays, starting at the end of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (remainder, chunks) = slice.as_rchunks()`, then:

* `remainder.len()` equals `slice.len() % N`,
* `chunks.len()` equals `slice.len() / N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with [`as_flattened`](../primitive.slice.html#method.as_flattened "method slice::as_flattened").

##### [§](#panics-27)Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### [§](#examples-100)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let (remainder, chunks) = slice.as_rchunks();
assert_eq!(remainder, &['l']);
assert_eq!(chunks, &[['o', 'r'], ['e', 'm']]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+\(remainder,+chunks\)+=+slice.as_rchunks\(\);%0A++++assert_eq!\(remainder,+%26%5B'l'%5D\);%0A++++assert_eq!\(chunks,+%26%5B%5B'o',+'r'%5D,+%5B'e',+'m'%5D%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1498)

#### pub unsafe fn [as\_chunks\_unchecked\_mut](#method.as_chunks_unchecked_mut)<const N: [usize](../primitive.usize.html)\>( &mut self, ) -> &mut \[[\[T; N\]](../primitive.array.html)\]

Splits the slice into a slice of `N`\-element arrays, assuming that there’s no remainder.

This is the inverse operation to [`as_flattened_mut`](../primitive.slice.html#method.as_flattened_mut "method slice::as_flattened_mut").

As this is `unsafe`, consider whether you could use [`as_chunks_mut`](../primitive.slice.html#method.as_chunks_mut "method slice::as_chunks_mut") or [`as_rchunks_mut`](../primitive.slice.html#method.as_rchunks_mut "method slice::as_rchunks_mut") instead, perhaps via something like `if let (chunks, []) = slice.as_chunks_mut()` or `let (chunks, []) = slice.as_chunks_mut() else { unreachable!() };`.

##### [§](#safety-9)Safety

This may only be called when

* The slice splits exactly into `N`\-element chunks (aka `self.len() % N == 0`).
* `N != 0`.

##### [§](#examples-101)Examples

```
let slice: &mut [char] = &mut ['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &mut [[char; 1]] =
    // SAFETY: 1-element chunks never have remainder
    unsafe { slice.as_chunks_unchecked_mut() };
chunks[0] = ['L'];
assert_eq!(chunks, &[['L'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &mut [[char; 3]] =
    // SAFETY: The slice length (6) is a multiple of 3
    unsafe { slice.as_chunks_unchecked_mut() };
chunks[1] = ['a', 'x', '?'];
assert_eq!(slice, &['L', 'o', 'r', 'a', 'x', '?']);

// These would be unsound:
// let chunks: &[[_; 5]] = slice.as_chunks_unchecked_mut() // The slice length is not a multiple of 5
// let chunks: &[[_; 0]] = slice.as_chunks_unchecked_mut() // Zero-length chunks are never allowed
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice:+%26mut+%5Bchar%5D+=+%26mut+%5B'l',+'o',+'r',+'e',+'m',+'!'%5D;%0A++++let+chunks:+%26mut+%5B%5Bchar;+1%5D%5D+=%0A++++++++//+SAFETY:+1-element+chunks+never+have+remainder%0A++++++++unsafe+%7B+slice.as_chunks_unchecked_mut\(\)+%7D;%0A++++chunks%5B0%5D+=+%5B'L'%5D;%0A++++assert_eq!\(chunks,+%26%5B%5B'L'%5D,+%5B'o'%5D,+%5B'r'%5D,+%5B'e'%5D,+%5B'm'%5D,+%5B'!'%5D%5D\);%0A++++let+chunks:+%26mut+%5B%5Bchar;+3%5D%5D+=%0A++++++++//+SAFETY:+The+slice+length+\(6\)+is+a+multiple+of+3%0A++++++++unsafe+%7B+slice.as_chunks_unchecked_mut\(\)+%7D;%0A++++chunks%5B1%5D+=+%5B'a',+'x',+'?'%5D;%0A++++assert_eq!\(slice,+%26%5B'L',+'o',+'r',+'a',+'x',+'?'%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1552)

#### pub fn [as\_chunks\_mut](#method.as_chunks_mut)<const N: [usize](../primitive.usize.html)\>(&mut self) -> (&mut \[[\[T; N\]](../primitive.array.html)\], &mut [\[T\]](../primitive.slice.html))

Splits the slice into a slice of `N`\-element arrays, starting at the beginning of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (chunks, remainder) = slice.as_chunks_mut()`, then:

* `chunks.len()` equals `slice.len() / N`,
* `remainder.len()` equals `slice.len() % N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with [`as_flattened_mut`](../primitive.slice.html#method.as_flattened_mut "method slice::as_flattened_mut").

##### [§](#panics-28)Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### [§](#examples-102)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++let+\(chunks,+remainder\)+=+v.as_chunks_mut\(\);%0A++++remainder%5B0%5D+=+9;%0A++++for+chunk+in+chunks+%7B%0A++++++++*chunk+=+%5Bcount;+2%5D;%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B1,+1,+2,+2,+9%5D\);%0A%7D&edition=2024 "Run code")

1.88.0 · [Source](../../src/core/slice/mod.rs.html#1605)

#### pub fn [as\_rchunks\_mut](#method.as_rchunks_mut)<const N: [usize](../primitive.usize.html)\>(&mut self) -> (&mut [\[T\]](../primitive.slice.html), &mut \[[\[T; N\]](../primitive.array.html)\])

Splits the slice into a slice of `N`\-element arrays, starting at the end of the slice, and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense. Given `let (remainder, chunks) = slice.as_rchunks_mut()`, then:

* `remainder.len()` equals `slice.len() % N`,
* `chunks.len()` equals `slice.len() / N`, and
* `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with [`as_flattened_mut`](../primitive.slice.html#method.as_flattened_mut "method slice::as_flattened_mut").

##### [§](#panics-29)Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### [§](#examples-103)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++let+\(remainder,+chunks\)+=+v.as_rchunks_mut\(\);%0A++++remainder%5B0%5D+=+9;%0A++++for+chunk+in+chunks+%7B%0A++++++++*chunk+=+%5Bcount;+2%5D;%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B9,+1,+1,+2,+2%5D\);%0A%7D&edition=2024 "Run code")

1.94.0 · [Source](../../src/core/slice/mod.rs.html#1646)

#### pub fn [array\_windows](#method.array_windows)<const N: [usize](../primitive.usize.html)\>(&self) -> [ArrayWindows](../slice/struct.ArrayWindows.html "struct std::slice::ArrayWindows")<'\_, T, N> [ⓘ](#)

Returns an iterator over overlapping windows of `N` elements of a slice, starting at the beginning of the slice.

This is the const generic equivalent of [`windows`](../primitive.slice.html#method.windows "method slice::windows").

If `N` is greater than the size of the slice, it will return no windows.

##### [§](#panics-30)Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime value, and thus a particular monomorphization will either always panic or it will never panic.

##### [§](#examples-104)Examples

```
let slice = [0, 1, 2, 3];
let mut iter = slice.array_windows();
assert_eq!(iter.next().unwrap(), &[0, 1]);
assert_eq!(iter.next().unwrap(), &[1, 2]);
assert_eq!(iter.next().unwrap(), &[2, 3]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B0,+1,+2,+3%5D;%0A++++let+mut+iter+=+slice.array_windows\(\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B0,+1%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B1,+2%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B2,+3%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1686)

#### pub fn [rchunks](#method.rchunks)(&self, chunk\_size: [usize](../primitive.usize.html)) -> [RChunks](../slice/struct.RChunks.html "struct std::slice::RChunks")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See [`rchunks_exact`](../primitive.slice.html#method.rchunks_exact "method slice::rchunks_exact") for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and [`chunks`](../primitive.slice.html#method.chunks "method slice::chunks") for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks`](../primitive.slice.html#method.as_rchunks "method slice::as_rchunks") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-31)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-105)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert_eq!(iter.next().unwrap(), &['l']);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+mut+iter+=+slice.rchunks\(2\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'e',+'m'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'o',+'r'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'l'%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1730)

#### pub fn [rchunks\_mut](#method.rchunks_mut)(&mut self, chunk\_size: [usize](../primitive.usize.html)) -> [RChunksMut](../slice/struct.RChunksMut.html "struct std::slice::RChunksMut")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last chunk will not have length `chunk_size`.

See [`rchunks_exact_mut`](../primitive.slice.html#method.rchunks_exact_mut "method slice::rchunks_exact_mut") for a variant of this iterator that returns chunks of always exactly `chunk_size` elements, and [`chunks_mut`](../primitive.slice.html#method.chunks_mut "method slice::chunks_mut") for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks_mut`](../primitive.slice.html#method.as_rchunks_mut "method slice::as_rchunks_mut") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-32)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-106)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++for+chunk+in+v.rchunks_mut\(2\)+%7B%0A++++++++for+elem+in+chunk.iter_mut\(\)+%7B%0A++++++++++++*elem+%2B=+count;%0A++++++++%7D%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B3,+2,+2,+1,+1%5D\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1775)

#### pub fn [rchunks\_exact](#method.rchunks_exact)(&self, chunk\_size: [usize](../primitive.usize.html)) -> [RChunksExact](../slice/struct.RChunksExact.html "struct std::slice::RChunksExact")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of [`rchunks`](../primitive.slice.html#method.rchunks "method slice::rchunks").

See [`rchunks`](../primitive.slice.html#method.rchunks "method slice::rchunks") for a variant of this iterator that also returns the remainder as a smaller chunk, and [`chunks_exact`](../primitive.slice.html#method.chunks_exact "method slice::chunks_exact") for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks`](../primitive.slice.html#method.as_rchunks "method slice::as_rchunks") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-33)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-107)Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['l']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B'l',+'o',+'r',+'e',+'m'%5D;%0A++++let+mut+iter+=+slice.rchunks_exact\(2\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'e',+'m'%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B'o',+'r'%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A++++assert_eq!\(iter.remainder\(\),+%26%5B'l'%5D\);%0A%7D&edition=2024 "Run code")

1.31.0 · [Source](../../src/core/slice/mod.rs.html#1824)

#### pub fn [rchunks\_exact\_mut](#method.rchunks_exact_mut)(&mut self, chunk\_size: [usize](../primitive.usize.html)) -> [RChunksExactMut](../slice/struct.RChunksExactMut.html "struct std::slice::RChunksExactMut")<'\_, T> [ⓘ](#)

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the resulting code better than in the case of [`chunks_mut`](../primitive.slice.html#method.chunks_mut "method slice::chunks_mut").

See [`rchunks_mut`](../primitive.slice.html#method.rchunks_mut "method slice::rchunks_mut") for a variant of this iterator that also returns the remainder as a smaller chunk, and [`chunks_exact_mut`](../primitive.slice.html#method.chunks_exact_mut "method slice::chunks_exact_mut") for the same iterator but starting at the beginning of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks_mut`](../primitive.slice.html#method.as_rchunks_mut "method slice::as_rchunks_mut") instead, which will give references to arrays of exactly that length, rather than slices.

##### [§](#panics-34)Panics

Panics if `chunk_size` is zero.

##### [§](#examples-108)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B0,+0,+0,+0,+0%5D;%0A++++let+mut+count+=+1;%0A++++%0A++++for+chunk+in+v.rchunks_exact_mut\(2\)+%7B%0A++++++++for+elem+in+chunk.iter_mut\(\)+%7B%0A++++++++++++*elem+%2B=+count;%0A++++++++%7D%0A++++++++count+%2B=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B0,+2,+2,+1,+1%5D\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#1864-1866)

#### pub fn [chunk\_by](#method.chunk_by)<F>(&self, pred: F) -> [ChunkBy](../slice/struct.ChunkBy.html "struct std::slice::ChunkBy")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over the slice producing non-overlapping runs of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements, meaning that it is called on `slice[0]` and `slice[1]`, followed by `slice[1]` and `slice[2]`, and so on.

##### [§](#examples-109)Examples

```
let slice = &[1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by(|a, b| a == b);

assert_eq!(iter.next(), Some(&[1, 1, 1][..]));
assert_eq!(iter.next(), Some(&[3, 3][..]));
assert_eq!(iter.next(), Some(&[2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%26%5B1,+1,+1,+3,+3,+2,+2,+2%5D;%0A++++%0A++++let+mut+iter+=+slice.chunk_by\(%7Ca,+b%7C+a+==+b\);%0A++++%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B1,+1,+1%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B3,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B2,+2,+2%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

This method can be used to extract the sorted subslices:

```
let slice = &[1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by(|a, b| a <= b);

assert_eq!(iter.next(), Some(&[1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%26%5B1,+1,+2,+3,+2,+3,+2,+3,+4%5D;%0A++++%0A++++let+mut+iter+=+slice.chunk_by\(%7Ca,+b%7C+a+%3C=+b\);%0A++++%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B1,+1,+2,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B2,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26%5B2,+3,+4%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

1.77.0 · [Source](../../src/core/slice/mod.rs.html#1906-1908)

#### pub fn [chunk\_by\_mut](#method.chunk_by_mut)<F>(&mut self, pred: F) -> [ChunkByMut](../slice/struct.ChunkByMut.html "struct std::slice::ChunkByMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over the slice producing non-overlapping mutable runs of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements, meaning that it is called on `slice[0]` and `slice[1]`, followed by `slice[1]` and `slice[2]`, and so on.

##### [§](#examples-110)Examples

```
let slice = &mut [1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by_mut(|a, b| a == b);

assert_eq!(iter.next(), Some(&mut [1, 1, 1][..]));
assert_eq!(iter.next(), Some(&mut [3, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%26mut+%5B1,+1,+1,+3,+3,+2,+2,+2%5D;%0A++++%0A++++let+mut+iter+=+slice.chunk_by_mut\(%7Ca,+b%7C+a+==+b\);%0A++++%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B1,+1,+1%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B3,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B2,+2,+2%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

This method can be used to extract the sorted subslices:

```
let slice = &mut [1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by_mut(|a, b| a <= b);

assert_eq!(iter.next(), Some(&mut [1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%26mut+%5B1,+1,+2,+3,+2,+3,+2,+3,+4%5D;%0A++++%0A++++let+mut+iter+=+slice.chunk_by_mut\(%7Ca,+b%7C+a+%3C=+b\);%0A++++%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B1,+1,+2,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B2,+3%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(%26mut+%5B2,+3,+4%5D%5B..%5D\)\);%0A++++assert_eq!\(iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1952)

#### pub fn [split\_at](#method.split_at)(&self, mid: [usize](../primitive.usize.html)) -> (&[\[T\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))

Divides one slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

##### [§](#panics-35)Panics

Panics if `mid > len`. For a non-panicking alternative see [`split_at_checked`](../primitive.slice.html#method.split_at_checked "method slice::split_at_checked").

##### [§](#examples-111)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B'a',+'b',+'c'%5D;%0A++++%0A++++%7B%0A+++++++let+\(left,+right\)+=+v.split_at\(0\);%0A+++++++assert_eq!\(left,+%5B%5D\);%0A+++++++assert_eq!\(right,+%5B'a',+'b',+'c'%5D\);%0A++++%7D%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+v.split_at\(2\);%0A++++++++assert_eq!\(left,+%5B'a',+'b'%5D\);%0A++++++++assert_eq!\(right,+%5B'c'%5D\);%0A++++%7D%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+v.split_at\(3\);%0A++++++++assert_eq!\(left,+%5B'a',+'b',+'c'%5D\);%0A++++++++assert_eq!\(right,+%5B%5D\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#1986)

#### pub fn [split\_at\_mut](#method.split_at_mut)(&mut self, mid: [usize](../primitive.usize.html)) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

Divides one mutable slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

##### [§](#panics-36)Panics

Panics if `mid > len`. For a non-panicking alternative see [`split_at_mut_checked`](../primitive.slice.html#method.split_at_mut_checked "method slice::split_at_mut_checked").

##### [§](#examples-112)Examples

```
let mut v = [1, 0, 3, 0, 5, 6];
let (left, right) = v.split_at_mut(2);
assert_eq!(left, [1, 0]);
assert_eq!(right, [3, 0, 5, 6]);
left[1] = 2;
right[1] = 4;
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B1,+0,+3,+0,+5,+6%5D;%0A++++let+\(left,+right\)+=+v.split_at_mut\(2\);%0A++++assert_eq!\(left,+%5B1,+0%5D\);%0A++++assert_eq!\(right,+%5B3,+0,+5,+6%5D\);%0A++++left%5B1%5D+=+2;%0A++++right%5B1%5D+=+4;%0A++++assert_eq!\(v,+%5B1,+2,+3,+4,+5,+6%5D\);%0A%7D&edition=2024 "Run code")

1.79.0 · [Source](../../src/core/slice/mod.rs.html#2038)

#### pub unsafe fn [split\_at\_unchecked](#method.split_at_unchecked)(&self, mid: [usize](../primitive.usize.html)) -> (&[\[T\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))

Divides one slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see [`split_at`](../primitive.slice.html#method.split_at "method slice::split_at").

##### [§](#safety-10)Safety

Calling this method with an out-of-bounds index is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_ even if the resulting reference is not used. The caller has to ensure that `0 <= mid <= self.len()`.

##### [§](#examples-113)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B'a',+'b',+'c'%5D;%0A++++%0A++++unsafe+%7B%0A+++++++let+\(left,+right\)+=+v.split_at_unchecked\(0\);%0A+++++++assert_eq!\(left,+%5B%5D\);%0A+++++++assert_eq!\(right,+%5B'a',+'b',+'c'%5D\);%0A++++%7D%0A++++%0A++++unsafe+%7B%0A++++++++let+\(left,+right\)+=+v.split_at_unchecked\(2\);%0A++++++++assert_eq!\(left,+%5B'a',+'b'%5D\);%0A++++++++assert_eq!\(right,+%5B'c'%5D\);%0A++++%7D%0A++++%0A++++unsafe+%7B%0A++++++++let+\(left,+right\)+=+v.split_at_unchecked\(3\);%0A++++++++assert_eq!\(left,+%5B'a',+'b',+'c'%5D\);%0A++++++++assert_eq!\(right,+%5B%5D\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.79.0 · [Source](../../src/core/slice/mod.rs.html#2092)

#### pub unsafe fn [split\_at\_mut\_unchecked](#method.split_at_mut_unchecked)( &mut self, mid: [usize](../primitive.usize.html), ) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

Divides one mutable slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see [`split_at_mut`](../primitive.slice.html#method.split_at_mut "method slice::split_at_mut").

##### [§](#safety-11)Safety

Calling this method with an out-of-bounds index is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_ even if the resulting reference is not used. The caller has to ensure that `0 <= mid <= self.len()`.

##### [§](#examples-114)Examples

```
let mut v = [1, 0, 3, 0, 5, 6];
// scoped to restrict the lifetime of the borrows
unsafe {
    let (left, right) = v.split_at_mut_unchecked(2);
    assert_eq!(left, [1, 0]);
    assert_eq!(right, [3, 0, 5, 6]);
    left[1] = 2;
    right[1] = 4;
}
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B1,+0,+3,+0,+5,+6%5D;%0A++++//+scoped+to+restrict+the+lifetime+of+the+borrows%0A++++unsafe+%7B%0A++++++++let+\(left,+right\)+=+v.split_at_mut_unchecked\(2\);%0A++++++++assert_eq!\(left,+%5B1,+0%5D\);%0A++++++++assert_eq!\(right,+%5B3,+0,+5,+6%5D\);%0A++++++++left%5B1%5D+=+2;%0A++++++++right%5B1%5D+=+4;%0A++++%7D%0A++++assert_eq!\(v,+%5B1,+2,+3,+4,+5,+6%5D\);%0A%7D&edition=2024 "Run code")

1.80.0 · [Source](../../src/core/slice/mod.rs.html#2153)

#### pub fn [split\_at\_checked](#method.split_at_checked)(&self, mid: [usize](../primitive.usize.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&[\[T\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))>

Divides one slice into two at an index, returning `None` if the slice is too short.

If `mid ≤ len` returns a pair of slices where the first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

Otherwise, if `mid > len`, returns `None`.

##### [§](#examples-115)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B1,+-2,+3,+-4,+5,+-6%5D;%0A++++%0A++++%7B%0A+++++++let+\(left,+right\)+=+v.split_at_checked\(0\).unwrap\(\);%0A+++++++assert_eq!\(left,+%5B%5D\);%0A+++++++assert_eq!\(right,+%5B1,+-2,+3,+-4,+5,+-6%5D\);%0A++++%7D%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+v.split_at_checked\(2\).unwrap\(\);%0A++++++++assert_eq!\(left,+%5B1,+-2%5D\);%0A++++++++assert_eq!\(right,+%5B3,+-4,+5,+-6%5D\);%0A++++%7D%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+v.split_at_checked\(6\).unwrap\(\);%0A++++++++assert_eq!\(left,+%5B1,+-2,+3,+-4,+5,+-6%5D\);%0A++++++++assert_eq!\(right,+%5B%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(None,+v.split_at_checked\(7\)\);%0A%7D&edition=2024 "Run code")

1.80.0 · [Source](../../src/core/slice/mod.rs.html#2192)

#### pub fn [split\_at\_mut\_checked](#method.split_at_mut_checked)( &mut self, mid: [usize](../primitive.usize.html), ) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))>

Divides one mutable slice into two at an index, returning `None` if the slice is too short.

If `mid ≤ len` returns a pair of slices where the first will contain all indices from `[0, mid)` (excluding the index `mid` itself) and the second will contain all indices from `[mid, len)` (excluding the index `len` itself).

Otherwise, if `mid > len`, returns `None`.

##### [§](#examples-116)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B1,+0,+3,+0,+5,+6%5D;%0A++++%0A++++if+let+Some\(\(left,+right\)\)+=+v.split_at_mut_checked\(2\)+%7B%0A++++++++assert_eq!\(left,+%5B1,+0%5D\);%0A++++++++assert_eq!\(right,+%5B3,+0,+5,+6%5D\);%0A++++++++left%5B1%5D+=+2;%0A++++++++right%5B1%5D+=+4;%0A++++%7D%0A++++assert_eq!\(v,+%5B1,+2,+3,+4,+5,+6%5D\);%0A++++%0A++++assert_eq!\(None,+v.split_at_mut_checked\(7\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2244-2246)

#### pub fn [split](#method.split)<F>(&self, pred: F) -> [Split](../slice/struct.Split.html "struct std::slice::Split")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred`. The matched element is not contained in the subslices.

##### [§](#examples-117)Examples

```
let slice = [10, 40, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B10,+40,+33,+20%5D;%0A++++let+mut+iter+=+slice.split\(%7Cnum%7C+num+%25+3+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B10,+40%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B20%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

If the first element is matched, an empty slice will be the first item returned by the iterator. Similarly, if the last element in the slice is matched, an empty slice will be the last item returned by the iterator:

```
let slice = [10, 40, 33];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B10,+40,+33%5D;%0A++++let+mut+iter+=+slice.split\(%7Cnum%7C+num+%25+3+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B10,+40%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

If two matched elements are directly adjacent, an empty slice will be present between them:

```
let slice = [10, 6, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10]);
assert_eq!(iter.next().unwrap(), &[]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B10,+6,+33,+20%5D;%0A++++let+mut+iter+=+slice.split\(%7Cnum%7C+num+%25+3+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B10%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B20%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2266-2268)

#### pub fn [split\_mut](#method.split_mut)<F>(&mut self, pred: F) -> [SplitMut](../slice/struct.SplitMut.html "struct std::slice::SplitMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over mutable subslices separated by elements that match `pred`. The matched element is not contained in the subslices.

##### [§](#examples-118)Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_mut(|num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+v.split_mut\(%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++group%5B0%5D+=+1;%0A++++%7D%0A++++assert_eq!\(v,+%5B1,+40,+30,+1,+60,+1%5D\);%0A%7D&edition=2024 "Run code")

1.51.0 · [Source](../../src/core/slice/mod.rs.html#2302-2304)

#### pub fn [split\_inclusive](#method.split_inclusive)<F>(&self, pred: F) -> [SplitInclusive](../slice/struct.SplitInclusive.html "struct std::slice::SplitInclusive")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred`. The matched element is contained in the end of the previous subslice as a terminator.

##### [§](#examples-119)Examples

```
let slice = [10, 40, 33, 20];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B10,+40,+33,+20%5D;%0A++++let+mut+iter+=+slice.split_inclusive\(%7Cnum%7C+num+%25+3+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B10,+40,+33%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B20%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

If the last element of the slice is matched, that element will be considered the terminator of the preceding slice. That slice will be the last item returned by the iterator.

```
let slice = [3, 10, 40, 33];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[3]);
assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert!(iter.next().is_none());
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B3,+10,+40,+33%5D;%0A++++let+mut+iter+=+slice.split_inclusive\(%7Cnum%7C+num+%25+3+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B3%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B10,+40,+33%5D\);%0A++++assert!\(iter.next\(\).is_none\(\)\);%0A%7D&edition=2024 "Run code")

1.51.0 · [Source](../../src/core/slice/mod.rs.html#2326-2328)

#### pub fn [split\_inclusive\_mut](#method.split_inclusive_mut)<F>(&mut self, pred: F) -> [SplitInclusiveMut](../slice/struct.SplitInclusiveMut.html "struct std::slice::SplitInclusiveMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over mutable subslices separated by elements that match `pred`. The matched element is contained in the previous subslice as a terminator.

##### [§](#examples-120)Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_inclusive_mut(|num| *num % 3 == 0) {
    let terminator_idx = group.len()-1;
    group[terminator_idx] = 1;
}
assert_eq!(v, [10, 40, 1, 20, 1, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+v.split_inclusive_mut\(%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++let+terminator_idx+=+group.len\(\)-1;%0A++++++++group%5Bterminator_idx%5D+=+1;%0A++++%7D%0A++++assert_eq!\(v,+%5B10,+40,+1,+20,+1,+1%5D\);%0A%7D&edition=2024 "Run code")

1.27.0 · [Source](../../src/core/slice/mod.rs.html#2362-2364)

#### pub fn [rsplit](#method.rsplit)<F>(&self, pred: F) -> [RSplit](../slice/struct.RSplit.html "struct std::slice::RSplit")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred`, starting at the end of the slice and working backwards. The matched element is not contained in the subslices.

##### [§](#examples-121)Examples

```
let slice = [11, 22, 33, 0, 44, 55];
let mut iter = slice.rsplit(|num| *num == 0);

assert_eq!(iter.next().unwrap(), &[44, 55]);
assert_eq!(iter.next().unwrap(), &[11, 22, 33]);
assert_eq!(iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+slice+=+%5B11,+22,+33,+0,+44,+55%5D;%0A++++let+mut+iter+=+slice.rsplit\(%7Cnum%7C+*num+==+0\);%0A++++%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B44,+55%5D\);%0A++++assert_eq!\(iter.next\(\).unwrap\(\),+%26%5B11,+22,+33%5D\);%0A++++assert_eq!\(iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B0,+1,+1,+2,+3,+5,+8%5D;%0A++++let+mut+it+=+v.rsplit\(%7Cn%7C+*n+%25+2+==+0\);%0A++++assert_eq!\(it.next\(\).unwrap\(\),+%26%5B%5D\);%0A++++assert_eq!\(it.next\(\).unwrap\(\),+%26%5B3,+5%5D\);%0A++++assert_eq!\(it.next\(\).unwrap\(\),+%26%5B1,+1%5D\);%0A++++assert_eq!\(it.next\(\).unwrap\(\),+%26%5B%5D\);%0A++++assert_eq!\(it.next\(\),+None\);%0A%7D&edition=2024 "Run code")

1.27.0 · [Source](../../src/core/slice/mod.rs.html#2388-2390)

#### pub fn [rsplit\_mut](#method.rsplit_mut)<F>(&mut self, pred: F) -> [RSplitMut](../slice/struct.RSplitMut.html "struct std::slice::RSplitMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over mutable subslices separated by elements that match `pred`, starting at the end of the slice and working backwards. The matched element is not contained in the subslices.

##### [§](#examples-122)Examples

```
let mut v = [100, 400, 300, 200, 600, 500];

let mut count = 0;
for group in v.rsplit_mut(|num| *num % 3 == 0) {
    count += 1;
    group[0] = count;
}
assert_eq!(v, [3, 400, 300, 2, 600, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B100,+400,+300,+200,+600,+500%5D;%0A++++%0A++++let+mut+count+=+0;%0A++++for+group+in+v.rsplit_mut\(%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++count+%2B=+1;%0A++++++++group%5B0%5D+=+count;%0A++++%7D%0A++++assert_eq!\(v,+%5B3,+400,+300,+2,+600,+1%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2416-2418)

#### pub fn [splitn](#method.splitn)<F>(&self, n: [usize](../primitive.usize.html), pred: F) -> [SplitN](../slice/struct.SplitN.html "struct std::slice::SplitN")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred`, limited to returning at most `n` items. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### [§](#examples-123)Examples

Print the slice split once by numbers divisible by 3 (i.e., `[10, 40]`, `[20, 60, 50]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.splitn(2, |num| *num % 3 == 0) {
    println!("{group:?}");
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+v.splitn\(2,+%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++println!\(%22%7Bgroup:?%7D%22\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2442-2444)

#### pub fn [splitn\_mut](#method.splitn_mut)<F>(&mut self, n: [usize](../primitive.usize.html), pred: F) -> [SplitNMut](../slice/struct.SplitNMut.html "struct std::slice::SplitNMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over mutable subslices separated by elements that match `pred`, limited to returning at most `n` items. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### [§](#examples-124)Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.splitn_mut(2, |num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 50]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+v.splitn_mut\(2,+%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++group%5B0%5D+=+1;%0A++++%7D%0A++++assert_eq!\(v,+%5B1,+40,+30,+1,+60,+50%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2471-2473)

#### pub fn [rsplitn](#method.rsplitn)<F>(&self, n: [usize](../primitive.usize.html), pred: F) -> [RSplitN](../slice/struct.RSplitN.html "struct std::slice::RSplitN")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred` limited to returning at most `n` items. This starts at the end of the slice and works backwards. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### [§](#examples-125)Examples

Print the slice split once, starting from the end, by numbers divisible by 3 (i.e., `[50]`, `[10, 40, 30, 20]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.rsplitn(2, |num| *num % 3 == 0) {
    println!("{group:?}");
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+v.rsplitn\(2,+%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++println!\(%22%7Bgroup:?%7D%22\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2498-2500)

#### pub fn [rsplitn\_mut](#method.rsplitn_mut)<F>(&mut self, n: [usize](../primitive.usize.html), pred: F) -> [RSplitNMut](../slice/struct.RSplitNMut.html "struct std::slice::RSplitNMut")<'\_, T, F> [ⓘ](#)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns an iterator over subslices separated by elements that match `pred` limited to returning at most `n` items. This starts at the end of the slice and works backwards. The matched element is not contained in the subslices.

The last element returned, if any, will contain the remainder of the slice.

##### [§](#examples-126)Examples

```
let mut s = [10, 40, 30, 20, 60, 50];

for group in s.rsplitn_mut(2, |num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(s, [1, 40, 30, 20, 60, 1]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+s+=+%5B10,+40,+30,+20,+60,+50%5D;%0A++++%0A++++for+group+in+s.rsplitn_mut\(2,+%7Cnum%7C+*num+%25+3+==+0\)+%7B%0A++++++++group%5B0%5D+=+1;%0A++++%7D%0A++++assert_eq!\(s,+%5B1,+40,+30,+20,+60,+1%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#2525-2527)

#### pub fn [split\_once](#method.split_once)<F>(&self, pred: F) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&[\[T\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))>

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

🔬This is a nightly-only experimental API. (`slice_split_once` [#112811](https://github.com/rust-lang/rust/issues/112811))

Splits the slice on the first element that matches the specified predicate.

If any matching elements are present in the slice, returns the prefix before the match and suffix after. The matching element itself is not included. If no elements match, returns `None`.

##### [§](#examples-127)Examples

```
#![feature(slice_split_once)]
let s = [1, 2, 3, 2, 4];
assert_eq!(s.split_once(|&x| x == 2), Some((
    &[1][..],
    &[3, 2, 4][..]
)));
assert_eq!(s.split_once(|&x| x == 0), None);
```

%5D%0A%23!%5Bfeature\(slice_split_once\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+s+=+%5B1,+2,+3,+2,+4%5D;%0A++++assert_eq!\(s.split_once\(%7C%26x%7C+x+==+2\),+Some\(\(%0A++++++++%26%5B1%5D%5B..%5D,%0A++++++++%26%5B3,+2,+4%5D%5B..%5D%0A++++\)\)\);%0A++++assert_eq!\(s.split_once\(%7C%26x%7C+x+==+0\),+None\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#2553-2555)

#### pub fn [rsplit\_once](#method.rsplit_once)<F>(&self, pred: F) -> [Option](../option/enum.Option.html "enum std::option::Option")<(&[\[T\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))>

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

🔬This is a nightly-only experimental API. (`slice_split_once` [#112811](https://github.com/rust-lang/rust/issues/112811))

Splits the slice on the last element that matches the specified predicate.

If any matching elements are present in the slice, returns the prefix before the match and suffix after. The matching element itself is not included. If no elements match, returns `None`.

##### [§](#examples-128)Examples

```
#![feature(slice_split_once)]
let s = [1, 2, 3, 2, 4];
assert_eq!(s.rsplit_once(|&x| x == 2), Some((
    &[1, 2, 3][..],
    &[4][..]
)));
assert_eq!(s.rsplit_once(|&x| x == 0), None);
```

%5D%0A%23!%5Bfeature\(slice_split_once\)%5D%0A%0Afn+main\(\)+%7B%0A++++let+s+=+%5B1,+2,+3,+2,+4%5D;%0A++++assert_eq!\(s.rsplit_once\(%7C%26x%7C+x+==+2\),+Some\(\(%0A++++++++%26%5B1,+2,+3%5D%5B..%5D,%0A++++++++%26%5B4%5D%5B..%5D%0A++++\)\)\);%0A++++assert_eq!\(s.rsplit_once\(%7C%26x%7C+x+==+0\),+None\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2589-2591)

#### pub fn [contains](#method.contains)(&self, x: [&T](../primitive.reference.html)) -> [bool](../primitive.bool.html)

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Returns `true` if the slice contains an element with the given value.

This operation is _O_(_n_).

Note that if you have a sorted slice, [`binary_search`](../primitive.slice.html#method.binary_search "method slice::binary_search") may be faster.

##### [§](#examples-129)Examples

```
let v = [10, 40, 30];
assert!(v.contains(&30));
assert!(!v.contains(&50));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert!\(v.contains\(%2630\)\);%0A++++assert!\(!v.contains\(%2650\)\);%0A%7D&edition=2024 "Run code")

If you do not have a `&T`, but some other value that you can compare with one (for example, `String` implements `PartialEq<str>`), you can use `iter().any`:

```
let v = [String::from("hello"), String::from("world")]; // slice of `String`
assert!(v.iter().any(|e| e == "hello")); // search with `&str`
assert!(!v.iter().any(|e| e == "hi"));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5BString::from\(%22hello%22\),+String::from\(%22world%22\)%5D;+//+slice+of+%60String%60%0A++++assert!\(v.iter\(\).any\(%7Ce%7C+e+==+%22hello%22\)\);+//+search+with+%60%26str%60%0A++++assert!\(!v.iter\(\).any\(%7Ce%7C+e+==+%22hi%22\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2619-2621)

#### pub fn [starts\_with](#method.starts_with)(&self, needle: &[\[T\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Returns `true` if `needle` is a prefix of the slice or equal to the slice.

##### [§](#examples-130)Examples

```
let v = [10, 40, 30];
assert!(v.starts_with(&[10]));
assert!(v.starts_with(&[10, 40]));
assert!(v.starts_with(&v));
assert!(!v.starts_with(&[50]));
assert!(!v.starts_with(&[10, 50]));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert!\(v.starts_with\(%26%5B10%5D\)\);%0A++++assert!\(v.starts_with\(%26%5B10,+40%5D\)\);%0A++++assert!\(v.starts_with\(%26v\)\);%0A++++assert!\(!v.starts_with\(%26%5B50%5D\)\);%0A++++assert!\(!v.starts_with\(%26%5B10,+50%5D\)\);%0A%7D&edition=2024 "Run code")

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.starts_with(&[]));
let v: &[u8] = &[];
assert!(v.starts_with(&[]));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++assert!\(v.starts_with\(%26%5B%5D\)\);%0A++++let+v:+%26%5Bu8%5D+=+%26%5B%5D;%0A++++assert!\(v.starts_with\(%26%5B%5D\)\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2650-2652)

#### pub fn [ends\_with](#method.ends_with)(&self, needle: &[\[T\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Returns `true` if `needle` is a suffix of the slice or equal to the slice.

##### [§](#examples-131)Examples

```
let v = [10, 40, 30];
assert!(v.ends_with(&[30]));
assert!(v.ends_with(&[40, 30]));
assert!(v.ends_with(&v));
assert!(!v.ends_with(&[50]));
assert!(!v.ends_with(&[50, 30]));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B10,+40,+30%5D;%0A++++assert!\(v.ends_with\(%26%5B30%5D\)\);%0A++++assert!\(v.ends_with\(%26%5B40,+30%5D\)\);%0A++++assert!\(v.ends_with\(%26v\)\);%0A++++assert!\(!v.ends_with\(%26%5B50%5D\)\);%0A++++assert!\(!v.ends_with\(%26%5B50,+30%5D\)\);%0A%7D&edition=2024 "Run code")

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.ends_with(&[]));
let v: &[u8] = &[];
assert!(v.ends_with(&[]));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++assert!\(v.ends_with\(%26%5B%5D\)\);%0A++++let+v:+%26%5Bu8%5D+=+%26%5B%5D;%0A++++assert!\(v.ends_with\(%26%5B%5D\)\);%0A%7D&edition=2024 "Run code")

1.51.0 · [Source](../../src/core/slice/mod.rs.html#2682-2684)

#### pub fn [strip\_prefix](#method.strip_prefix)<P>(&self, prefix: [&P](../primitive.reference.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T\]](../primitive.slice.html)\>

where P: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Returns a subslice with the prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix, wrapped in `Some`. If `prefix` is empty, simply returns the original slice. If `prefix` is equal to the original slice, returns an empty slice.

If the slice does not start with `prefix`, returns `None`.

##### [§](#examples-132)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++assert_eq!\(v.strip_prefix\(%26%5B10%5D\),+Some\(%26%5B40,+30%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_prefix\(%26%5B10,+40%5D\),+Some\(%26%5B30%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_prefix\(%26%5B10,+40,+30%5D\),+Some\(%26%5B%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_prefix\(%26%5B50%5D\),+None\);%0A++++assert_eq!\(v.strip_prefix\(%26%5B10,+50%5D\),+None\);%0A++++%0A++++let+prefix+:+%26str+=+%22he%22;%0A++++assert_eq!\(b%22hello%22.strip_prefix\(prefix.as_bytes\(\)\),%0A+++++++++++++++Some\(b%22llo%22.as_ref\(\)\)\);%0A%7D&edition=2024 "Run code")

1.51.0 · [Source](../../src/core/slice/mod.rs.html#2718-2720)

#### pub fn [strip\_suffix](#method.strip_suffix)<P>(&self, suffix: [&P](../primitive.reference.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T\]](../primitive.slice.html)\>

where P: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

Returns a subslice with the suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix, wrapped in `Some`. If `suffix` is empty, simply returns the original slice. If `suffix` is equal to the original slice, returns an empty slice.

If the slice does not end with `suffix`, returns `None`.

##### [§](#examples-133)Examples

```
let v = &[10, 40, 30];
assert_eq!(v.strip_suffix(&[30]), Some(&[10, 40][..]));
assert_eq!(v.strip_suffix(&[40, 30]), Some(&[10][..]));
assert_eq!(v.strip_suffix(&[10, 40, 30]), Some(&[][..]));
assert_eq!(v.strip_suffix(&[50]), None);
assert_eq!(v.strip_suffix(&[50, 30]), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++assert_eq!\(v.strip_suffix\(%26%5B30%5D\),+Some\(%26%5B10,+40%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_suffix\(%26%5B40,+30%5D\),+Some\(%26%5B10%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_suffix\(%26%5B10,+40,+30%5D\),+Some\(%26%5B%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_suffix\(%26%5B50%5D\),+None\);%0A++++assert_eq!\(v.strip_suffix\(%26%5B50,+30%5D\),+None\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#2757-2761)

#### pub fn [strip\_circumfix](#method.strip_circumfix)<S, P>(&self, prefix: [&P](../primitive.reference.html), suffix: [&S](../primitive.reference.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<&[\[T\]](../primitive.slice.html)\>

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"), S: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), P: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

🔬This is a nightly-only experimental API. (`strip_circumfix` [#147946](https://github.com/rust-lang/rust/issues/147946))

Returns a subslice with the prefix and suffix removed.

If the slice starts with `prefix` and ends with `suffix`, returns the subslice after the prefix and before the suffix, wrapped in `Some`.

If the slice does not start with `prefix` or does not end with `suffix`, returns `None`.

##### [§](#examples-134)Examples

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

%5D%0A%23!%5Bfeature\(strip_circumfix\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+50,+40,+30%5D;%0A++++assert_eq!\(v.strip_circumfix\(%26%5B10%5D,+%26%5B30%5D\),+Some\(%26%5B50,+40%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B10%5D,+%26%5B40,+30%5D\),+Some\(%26%5B50%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B10,+50%5D,+%26%5B40,+30%5D\),+Some\(%26%5B%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B50%5D,+%26%5B30%5D\),+None\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B10%5D,+%26%5B40%5D\),+None\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B%5D,+%26%5B40,+30%5D\),+Some\(%26%5B10,+50%5D%5B..%5D\)\);%0A++++assert_eq!\(v.strip_circumfix\(%26%5B10,+50%5D,+%26%5B%5D\),+Some\(%26%5B40,+30%5D%5B..%5D\)\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#2793-2795)

#### pub fn [trim\_prefix](#method.trim_prefix)<P>(&self, prefix: [&P](../primitive.reference.html)) -> &[\[T\]](../primitive.slice.html)

where P: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

🔬This is a nightly-only experimental API. (`trim_prefix_suffix` [#142312](https://github.com/rust-lang/rust/issues/142312))

Returns a subslice with the optional prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix. If `prefix` is empty or the slice does not start with `prefix`, simply returns the original slice. If `prefix` is equal to the original slice, returns an empty slice.

##### [§](#examples-135)Examples

```
#![feature(trim_prefix_suffix)]

let v = &[10, 40, 30];

// Prefix present - removes it
assert_eq!(v.trim_prefix(&[10]), &[40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 40]), &[30][..]);
assert_eq!(v.trim_prefix(&[10, 40, 30]), &[][..]);

// Prefix absent - returns original slice
assert_eq!(v.trim_prefix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 50]), &[10, 40, 30][..]);

let prefix : &str = "he";
assert_eq!(b"hello".trim_prefix(prefix.as_bytes()), b"llo".as_ref());
```

%5D%0A%23!%5Bfeature\(trim_prefix_suffix\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++%0A++++//+Prefix+present+-+removes+it%0A++++assert_eq!\(v.trim_prefix\(%26%5B10%5D\),+%26%5B40,+30%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_prefix\(%26%5B10,+40%5D\),+%26%5B30%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_prefix\(%26%5B10,+40,+30%5D\),+%26%5B%5D%5B..%5D\);%0A++++%0A++++//+Prefix+absent+-+returns+original+slice%0A++++assert_eq!\(v.trim_prefix\(%26%5B50%5D\),+%26%5B10,+40,+30%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_prefix\(%26%5B10,+50%5D\),+%26%5B10,+40,+30%5D%5B..%5D\);%0A++++%0A++++let+prefix+:+%26str+=+%22he%22;%0A++++assert_eq!\(b%22hello%22.trim_prefix\(prefix.as_bytes\(\)\),+b%22llo%22.as_ref\(\)\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#2833-2835)

#### pub fn [trim\_suffix](#method.trim_suffix)<P>(&self, suffix: [&P](../primitive.reference.html)) -> &[\[T\]](../primitive.slice.html)

where P: [SlicePattern](../../core/slice/trait.SlicePattern.html "trait core::slice::SlicePattern")<Item = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

🔬This is a nightly-only experimental API. (`trim_prefix_suffix` [#142312](https://github.com/rust-lang/rust/issues/142312))

Returns a subslice with the optional suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix. If `suffix` is empty or the slice does not end with `suffix`, simply returns the original slice. If `suffix` is equal to the original slice, returns an empty slice.

##### [§](#examples-136)Examples

```
#![feature(trim_prefix_suffix)]

let v = &[10, 40, 30];

// Suffix present - removes it
assert_eq!(v.trim_suffix(&[30]), &[10, 40][..]);
assert_eq!(v.trim_suffix(&[40, 30]), &[10][..]);
assert_eq!(v.trim_suffix(&[10, 40, 30]), &[][..]);

// Suffix absent - returns original slice
assert_eq!(v.trim_suffix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_suffix(&[50, 30]), &[10, 40, 30][..]);
```

%5D%0A%23!%5Bfeature\(trim_prefix_suffix\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+v+=+%26%5B10,+40,+30%5D;%0A++++%0A++++//+Suffix+present+-+removes+it%0A++++assert_eq!\(v.trim_suffix\(%26%5B30%5D\),+%26%5B10,+40%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_suffix\(%26%5B40,+30%5D\),+%26%5B10%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_suffix\(%26%5B10,+40,+30%5D\),+%26%5B%5D%5B..%5D\);%0A++++%0A++++//+Suffix+absent+-+returns+original+slice%0A++++assert_eq!\(v.trim_suffix\(%26%5B50%5D\),+%26%5B10,+40,+30%5D%5B..%5D\);%0A++++assert_eq!\(v.trim_suffix\(%26%5B50,+30%5D\),+%26%5B10,+40,+30%5D%5B..%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2919-2921)

#### pub fn [binary\_search](#method.binary_search)(&self, x: [&T](../primitive.reference.html)) -> [Result](../result/enum.Result.html "enum std::result::Result")<[usize](../primitive.usize.html), [usize](../primitive.usize.html)\>

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Binary searches this slice for a given element. If the slice is not sorted, the returned result is unspecified and meaningless.

If the value is found then [`Result::Ok`](../result/enum.Result.html#variant.Ok "variant std::result::Result::Ok") is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then [`Result::Err`](../result/enum.Result.html#variant.Err "variant std::result::Result::Err") is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also [`binary_search_by`](../primitive.slice.html#method.binary_search_by "method slice::binary_search_by"), [`binary_search_by_key`](../primitive.slice.html#method.binary_search_by_key "method slice::binary_search_by_key"), and [`partition_point`](../primitive.slice.html#method.partition_point "method slice::partition_point").

##### [§](#examples-137)Examples

Looks up a series of four elements. The first is found, with a uniquely determined position; the second and third are not found; the fourth could match any position in `[1, 4]`.

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

assert_eq!(s.binary_search(&13),  Ok(9));
assert_eq!(s.binary_search(&4),   Err(7));
assert_eq!(s.binary_search(&100), Err(13));
let r = s.binary_search(&1);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

%5D%0Afn+main\(\)+%7B%0A++++let+s+=+%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+55%5D;%0A++++%0A++++assert_eq!\(s.binary_search\(%2613\),++Ok\(9\)\);%0A++++assert_eq!\(s.binary_search\(%264\),+++Err\(7\)\);%0A++++assert_eq!\(s.binary_search\(%26100\),+Err\(13\)\);%0A++++let+r+=+s.binary_search\(%261\);%0A++++assert!\(match+r+%7B+Ok\(1..=4\)+=%3E+true,+_+=%3E+false,+%7D\);%0A%7D&edition=2024 "Run code")

If you want to find that whole _range_ of matching items, rather than an arbitrary matching one, that can be done using [`partition_point`](../primitive.slice.html#method.partition_point "method slice::partition_point"):

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

// For something not found, the "range" of equal items is empty
assert_eq!(s.partition_point(|x| x < &11), 9);
assert_eq!(s.partition_point(|x| x <= &11), 9);
assert_eq!(s.binary_search(&11), Err(9));
```

%5D%0Afn+main\(\)+%7B%0A++++let+s+=+%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+55%5D;%0A++++%0A++++let+low+=+s.partition_point\(%7Cx%7C+x+%3C+%261\);%0A++++assert_eq!\(low,+1\);%0A++++let+high+=+s.partition_point\(%7Cx%7C+x+%3C=+%261\);%0A++++assert_eq!\(high,+5\);%0A++++let+r+=+s.binary_search\(%261\);%0A++++assert!\(\(low..high\).contains\(%26r.unwrap\(\)\)\);%0A++++%0A++++assert!\(s%5B..low%5D.iter\(\).all\(%7C%26x%7C+x+%3C+1\)\);%0A++++assert!\(s%5Blow..high%5D.iter\(\).all\(%7C%26x%7C+x+==+1\)\);%0A++++assert!\(s%5Bhigh..%5D.iter\(\).all\(%7C%26x%7C+x+%3E+1\)\);%0A++++%0A++++//+For+something+not+found,+the+%22range%22+of+equal+items+is+empty%0A++++assert_eq!\(s.partition_point\(%7Cx%7C+x+%3C+%2611\),+9\);%0A++++assert_eq!\(s.partition_point\(%7Cx%7C+x+%3C=+%2611\),+9\);%0A++++assert_eq!\(s.binary_search\(%2611\),+Err\(9\)\);%0A%7D&edition=2024 "Run code")

If you want to insert an item to a sorted vector, while maintaining sort order, consider using [`partition_point`](../primitive.slice.html#method.partition_point "method slice::partition_point"):

```
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
// If `num` is unique, `s.partition_point(|&x| x < num)` (with `<`) is equivalent to
// `s.binary_search(&num).unwrap_or_else(|x| x)`, but using `<=` will allow `insert`
// to shift less elements.
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+s+=+vec!%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+55%5D;%0A++++let+num+=+42;%0A++++let+idx+=+s.partition_point\(%7C%26x%7C+x+%3C=+num\);%0A++++//+If+%60num%60+is+unique,+%60s.partition_point\(%7C%26x%7C+x+%3C+num\)%60+\(with+%60%3C%60\)+is+equivalent+to%0A++++//+%60s.binary_search\(%26num\).unwrap_or_else\(%7Cx%7C+x\)%60,+but+using+%60%3C=%60+will+allow+%60insert%60%0A++++//+to+shift+less+elements.%0A++++s.insert\(idx,+num\);%0A++++assert_eq!\(s,+%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+42,+55%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/core/slice/mod.rs.html#2970-2972)

#### pub fn [binary\_search\_by](#method.binary_search_by)<'a, F>(&'a self, f: F) -> [Result](../result/enum.Result.html "enum std::result::Result")<[usize](../primitive.usize.html), [usize](../primitive.usize.html)\>

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&'a T](../primitive.reference.html)) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering"),

Binary searches this slice with a comparator function.

The comparator function should return an order code that indicates whether its argument is `Less`, `Equal` or `Greater` the desired target. If the slice is not sorted or if the comparator function does not implement an order consistent with the sort order of the underlying slice, the returned result is unspecified and meaningless.

If the value is found then [`Result::Ok`](../result/enum.Result.html#variant.Ok "variant std::result::Result::Ok") is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then [`Result::Err`](../result/enum.Result.html#variant.Err "variant std::result::Result::Err") is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also [`binary_search`](../primitive.slice.html#method.binary_search "method slice::binary_search"), [`binary_search_by_key`](../primitive.slice.html#method.binary_search_by_key "method slice::binary_search_by_key"), and [`partition_point`](../primitive.slice.html#method.partition_point "method slice::partition_point").

##### [§](#examples-138)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+s+=+%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+55%5D;%0A++++%0A++++let+seek+=+13;%0A++++assert_eq!\(s.binary_search_by\(%7Cprobe%7C+probe.cmp\(%26seek\)\),+Ok\(9\)\);%0A++++let+seek+=+4;%0A++++assert_eq!\(s.binary_search_by\(%7Cprobe%7C+probe.cmp\(%26seek\)\),+Err\(7\)\);%0A++++let+seek+=+100;%0A++++assert_eq!\(s.binary_search_by\(%7Cprobe%7C+probe.cmp\(%26seek\)\),+Err\(13\)\);%0A++++let+seek+=+1;%0A++++let+r+=+s.binary_search_by\(%7Cprobe%7C+probe.cmp\(%26seek\)\);%0A++++assert!\(match+r+%7B+Ok\(1..=4\)+=%3E+true,+_+=%3E+false,+%7D\);%0A%7D&edition=2024 "Run code")

1.10.0 · [Source](../../src/core/slice/mod.rs.html#3071-3074)

#### pub fn [binary\_search\_by\_key](#method.binary_search_by_key)<'a, B, F>( &'a self, b: [&B](../primitive.reference.html), f: F, ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[usize](../primitive.usize.html), [usize](../primitive.usize.html)\>

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&'a T](../primitive.reference.html)) -> B, B: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Binary searches this slice with a key extraction function.

Assumes that the slice is sorted by the key, for instance with [`sort_by_key`](../primitive.slice.html#method.sort_by_key "method slice::sort_by_key") using the same key extraction function. If the slice is not sorted by the key, the returned result is unspecified and meaningless.

If the value is found then [`Result::Ok`](../result/enum.Result.html#variant.Ok "variant std::result::Result::Ok") is returned, containing the index of the matching element. If there are multiple matches, then any one of the matches could be returned. The index is chosen deterministically, but is subject to change in future versions of Rust. If the value is not found then [`Result::Err`](../result/enum.Result.html#variant.Err "variant std::result::Result::Err") is returned, containing the index where a matching element could be inserted while maintaining sorted order.

See also [`binary_search`](../primitive.slice.html#method.binary_search "method slice::binary_search"), [`binary_search_by`](../primitive.slice.html#method.binary_search_by "method slice::binary_search_by"), and [`partition_point`](../primitive.slice.html#method.partition_point "method slice::partition_point").

##### [§](#examples-139)Examples

Looks up a series of four elements in a slice of pairs sorted by their second elements. The first is found, with a uniquely determined position; the second and third are not found; the fourth could match any position in `[1, 4]`.

```
let s = [(0, 0), (2, 1), (4, 1), (5, 1), (3, 1),
         (1, 2), (2, 3), (4, 5), (5, 8), (3, 13),
         (1, 21), (2, 34), (4, 55)];

assert_eq!(s.binary_search_by_key(&13, |&(a, b)| b),  Ok(9));
assert_eq!(s.binary_search_by_key(&4, |&(a, b)| b),   Err(7));
assert_eq!(s.binary_search_by_key(&100, |&(a, b)| b), Err(13));
let r = s.binary_search_by_key(&1, |&(a, b)| b);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

%5D%0Afn+main\(\)+%7B%0A++++let+s+=+%5B\(0,+0\),+\(2,+1\),+\(4,+1\),+\(5,+1\),+\(3,+1\),%0A+++++++++++++\(1,+2\),+\(2,+3\),+\(4,+5\),+\(5,+8\),+\(3,+13\),%0A+++++++++++++\(1,+21\),+\(2,+34\),+\(4,+55\)%5D;%0A++++%0A++++assert_eq!\(s.binary_search_by_key\(%2613,+%7C%26\(a,+b\)%7C+b\),++Ok\(9\)\);%0A++++assert_eq!\(s.binary_search_by_key\(%264,+%7C%26\(a,+b\)%7C+b\),+++Err\(7\)\);%0A++++assert_eq!\(s.binary_search_by_key\(%26100,+%7C%26\(a,+b\)%7C+b\),+Err\(13\)\);%0A++++let+r+=+s.binary_search_by_key\(%261,+%7C%26\(a,+b\)%7C+b\);%0A++++assert!\(match+r+%7B+Ok\(1..=4\)+=%3E+true,+_+=%3E+false,+%7D\);%0A%7D&edition=2024 "Run code")

1.20.0 · [Source](../../src/core/slice/mod.rs.html#3133-3135)

#### pub fn [sort\_unstable](#method.sort_unstable)(&mut self)

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Sorts the slice in ascending order **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` panics.

Sorting types that only implement [`PartialOrd`](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd") such as [`f32`](../primitive.f32.html "primitive f32") and [`f64`](../primitive.f64.html "primitive f64") require additional precautions. For example, `f32::NAN != f32::NAN`, which doesn’t fulfill the reflexivity requirement of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord"). By using an alternative comparison function with `slice::sort_unstable_by` such as [`f32::total_cmp`](../primitive.f32.html#method.total_cmp "method f32::total_cmp") or [`f64::total_cmp`](../primitive.f64.html#method.total_cmp "method f64::total_cmp") that defines a [total order](https://en.wikipedia.org/wiki/Total_order) users can sort slices containing floating-point values. Alternatively, if all values in the slice are guaranteed to be in a subset for which [`PartialOrd::partial_cmp`](../cmp/trait.PartialOrd.html#tymethod.partial_cmp "method std::cmp::PartialOrd::partial_cmp") forms a [total order](https://en.wikipedia.org/wiki/Total_order), it’s possible to sort the slice with `sort_unstable_by(|a, b| a.partial_cmp(b).unwrap())`.

##### [§](#current-implementation)Current implementation

The current implementation is based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### [§](#panics-37)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation panics.

##### [§](#examples-140)Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort_unstable();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++%0A++++v.sort_unstable\(\);%0A++++assert_eq!\(v,+%5B-5,+-3,+1,+2,+4%5D\);%0A%7D&edition=2024 "Run code")

1.20.0 · [Source](../../src/core/slice/mod.rs.html#3188-3190)

#### pub fn [sort\_unstable\_by](#method.sort_unstable_by)<F>(&mut self, compare: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering"),

Sorts the slice in ascending order with a comparison function, **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the comparison function `compare` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if `compare` panics.

##### [§](#current-implementation-1)Current implementation

The current implementation is based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### [§](#panics-38)Panics

May panic if the `compare` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the `compare` itself panics.

##### [§](#examples-141)Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_unstable_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

// reverse sorting
v.sort_unstable_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++v.sort_unstable_by\(%7Ca,+b%7C+a.cmp\(b\)\);%0A++++assert_eq!\(v,+%5B-5,+-3,+1,+2,+4%5D\);%0A++++%0A++++//+reverse+sorting%0A++++v.sort_unstable_by\(%7Ca,+b%7C+b.cmp\(a\)\);%0A++++assert_eq!\(v,+%5B4,+2,+1,+-3,+-5%5D\);%0A%7D&edition=2024 "Run code")

1.20.0 · [Source](../../src/core/slice/mod.rs.html#3240-3243)

#### pub fn [sort\_unstable\_by\_key](#method.sort_unstable_by_key)<K, F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> K, K: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Sorts the slice in ascending order with a key extraction function, **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not allocate), and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") documentation.

All original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. Same is true if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` panics.

##### [§](#current-implementation-2)Current implementation

The current implementation is based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which combines the fast average case of quicksort with the fast worst case of heapsort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the slice is partially sorted.

##### [§](#panics-39)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation panics.

##### [§](#examples-142)Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_unstable_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4i32,+-5,+1,+-3,+2%5D;%0A++++%0A++++v.sort_unstable_by_key\(%7Ck%7C+k.abs\(\)\);%0A++++assert_eq!\(v,+%5B1,+2,+-3,+4,+-5%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3310-3313)

#### pub fn [partial\_sort\_unstable](#method.partial_sort_unstable)<R>(&mut self, range: R)

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"), R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` [#149046](https://github.com/rust-lang/rust/issues/149046))

Partially sorts the slice in ascending order **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of [`sort_unstable`](../primitive.slice.html#method.sort_unstable "method slice::sort_unstable") for implementation notes.

##### [§](#panics-40)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a total order, or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation panics, or if the specified range is out of bounds.

##### [§](#examples-143)Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4, -5, 1, -3, 2];

// empty range at the beginning, nothing changed
v.partial_sort_unstable(0..0);
assert_eq!(v, [4, -5, 1, -3, 2]);

// empty range in the middle, partitioning the slice
v.partial_sort_unstable(2..2);
for i in 0..2 {
   assert!(v[i] <= v[2]);
}
for i in 3..v.len() {
  assert!(v[2] <= v[i]);
}

// single element range, same as select_nth_unstable
v.partial_sort_unstable(2..3);
for i in 0..2 {
   assert!(v[i] <= v[2]);
}
for i in 3..v.len() {
  assert!(v[2] <= v[i]);
}

// partial sort a subrange
v.partial_sort_unstable(1..4);
assert_eq!(&v[1..4], [-3, 1, 2]);

// partial sort the whole range, same as sort_unstable
v.partial_sort_unstable(..);
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

%5D%0A%23!%5Bfeature\(slice_partial_sort_unstable\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++%0A++++//+empty+range+at+the+beginning,+nothing+changed%0A++++v.partial_sort_unstable\(0..0\);%0A++++assert_eq!\(v,+%5B4,+-5,+1,+-3,+2%5D\);%0A++++%0A++++//+empty+range+in+the+middle,+partitioning+the+slice%0A++++v.partial_sort_unstable\(2..2\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D+%3C=+v%5B2%5D\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D+%3C=+v%5Bi%5D\);%0A++++%7D%0A++++%0A++++//+single+element+range,+same+as+select_nth_unstable%0A++++v.partial_sort_unstable\(2..3\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D+%3C=+v%5B2%5D\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D+%3C=+v%5Bi%5D\);%0A++++%7D%0A++++%0A++++//+partial+sort+a+subrange%0A++++v.partial_sort_unstable\(1..4\);%0A++++assert_eq!\(%26v%5B1..4%5D,+%5B-3,+1,+2%5D\);%0A++++%0A++++//+partial+sort+the+whole+range,+same+as+sort_unstable%0A++++v.partial_sort_unstable\(..\);%0A++++assert_eq!\(v,+%5B-5,+-3,+1,+2,+4%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3381-3384)

#### pub fn [partial\_sort\_unstable\_by](#method.partial_sort_unstable_by)<F, R>(&mut self, range: R, compare: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering"), R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` [#149046](https://github.com/rust-lang/rust/issues/149046))

Partially sorts the slice in ascending order with a comparison function, **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of [`sort_unstable_by`](../primitive.slice.html#method.sort_unstable_by "method slice::sort_unstable_by") for implementation notes.

##### [§](#panics-41)Panics

May panic if the `compare` does not implement a total order, or if the `compare` itself panics, or if the specified range is out of bounds.

##### [§](#examples-144)Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4, -5, 1, -3, 2];

// empty range at the beginning, nothing changed
v.partial_sort_unstable_by(0..0, |a, b| b.cmp(a));
assert_eq!(v, [4, -5, 1, -3, 2]);

// empty range in the middle, partitioning the slice
v.partial_sort_unstable_by(2..2, |a, b| b.cmp(a));
for i in 0..2 {
   assert!(v[i] >= v[2]);
}
for i in 3..v.len() {
  assert!(v[2] >= v[i]);
}

// single element range, same as select_nth_unstable
v.partial_sort_unstable_by(2..3, |a, b| b.cmp(a));
for i in 0..2 {
   assert!(v[i] >= v[2]);
}
for i in 3..v.len() {
  assert!(v[2] >= v[i]);
}

// partial sort a subrange
v.partial_sort_unstable_by(1..4, |a, b| b.cmp(a));
assert_eq!(&v[1..4], [2, 1, -3]);

// partial sort the whole range, same as sort_unstable
v.partial_sort_unstable_by(.., |a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

%5D%0A%23!%5Bfeature\(slice_partial_sort_unstable\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++%0A++++//+empty+range+at+the+beginning,+nothing+changed%0A++++v.partial_sort_unstable_by\(0..0,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++assert_eq!\(v,+%5B4,+-5,+1,+-3,+2%5D\);%0A++++%0A++++//+empty+range+in+the+middle,+partitioning+the+slice%0A++++v.partial_sort_unstable_by\(2..2,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D+%3E=+v%5B2%5D\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D+%3E=+v%5Bi%5D\);%0A++++%7D%0A++++%0A++++//+single+element+range,+same+as+select_nth_unstable%0A++++v.partial_sort_unstable_by\(2..3,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D+%3E=+v%5B2%5D\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D+%3E=+v%5Bi%5D\);%0A++++%7D%0A++++%0A++++//+partial+sort+a+subrange%0A++++v.partial_sort_unstable_by\(1..4,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++assert_eq!\(%26v%5B1..4%5D,+%5B2,+1,+-3%5D\);%0A++++%0A++++//+partial+sort+the+whole+range,+same+as+sort_unstable%0A++++v.partial_sort_unstable_by\(..,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++assert_eq!\(v,+%5B4,+2,+1,+-3,+-5%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3452-3456)

#### pub fn [partial\_sort\_unstable\_by\_key](#method.partial_sort_unstable_by_key)<K, F, R>(&mut self, range: R, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> K, K: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"), R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>,

🔬This is a nightly-only experimental API. (`slice_partial_sort_unstable` [#149046](https://github.com/rust-lang/rust/issues/149046))

Partially sorts the slice in ascending order with a key extraction function, **without** preserving the initial order of equal elements.

Upon completion, for the specified range `start..end`, it’s guaranteed that:

1. Every element in `self[..start]` is smaller than or equal to
2. Every element in `self[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `self[end..]`.

This partial sort is unstable, meaning it may reorder equal elements in the specified range. It may reorder elements outside the specified range as well, but the guarantees above still hold.

This partial sort is in-place (i.e., does not allocate), and _O_(_n_ + _k_ \* log(_k_)) worst-case, where _n_ is the length of the slice and _k_ is the length of the specified range.

See the documentation of [`sort_unstable_by_key`](../primitive.slice.html#method.sort_unstable_by_key "method slice::sort_unstable_by_key") for implementation notes.

##### [§](#panics-42)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a total order, or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation panics, or if the specified range is out of bounds.

##### [§](#examples-145)Examples

```
#![feature(slice_partial_sort_unstable)]

let mut v = [4i32, -5, 1, -3, 2];

// empty range at the beginning, nothing changed
v.partial_sort_unstable_by_key(0..0, |k| k.abs());
assert_eq!(v, [4, -5, 1, -3, 2]);

// empty range in the middle, partitioning the slice
v.partial_sort_unstable_by_key(2..2, |k| k.abs());
for i in 0..2 {
   assert!(v[i].abs() <= v[2].abs());
}
for i in 3..v.len() {
  assert!(v[2].abs() <= v[i].abs());
}

// single element range, same as select_nth_unstable
v.partial_sort_unstable_by_key(2..3, |k| k.abs());
for i in 0..2 {
   assert!(v[i].abs() <= v[2].abs());
}
for i in 3..v.len() {
  assert!(v[2].abs() <= v[i].abs());
}

// partial sort a subrange
v.partial_sort_unstable_by_key(1..4, |k| k.abs());
assert_eq!(&v[1..4], [2, -3, 4]);

// partial sort the whole range, same as sort_unstable
v.partial_sort_unstable_by_key(.., |k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

%5D%0A%23!%5Bfeature\(slice_partial_sort_unstable\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4i32,+-5,+1,+-3,+2%5D;%0A++++%0A++++//+empty+range+at+the+beginning,+nothing+changed%0A++++v.partial_sort_unstable_by_key\(0..0,+%7Ck%7C+k.abs\(\)\);%0A++++assert_eq!\(v,+%5B4,+-5,+1,+-3,+2%5D\);%0A++++%0A++++//+empty+range+in+the+middle,+partitioning+the+slice%0A++++v.partial_sort_unstable_by_key\(2..2,+%7Ck%7C+k.abs\(\)\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D.abs\(\)+%3C=+v%5B2%5D.abs\(\)\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D.abs\(\)+%3C=+v%5Bi%5D.abs\(\)\);%0A++++%7D%0A++++%0A++++//+single+element+range,+same+as+select_nth_unstable%0A++++v.partial_sort_unstable_by_key\(2..3,+%7Ck%7C+k.abs\(\)\);%0A++++for+i+in+0..2+%7B%0A+++++++assert!\(v%5Bi%5D.abs\(\)+%3C=+v%5B2%5D.abs\(\)\);%0A++++%7D%0A++++for+i+in+3..v.len\(\)+%7B%0A++++++assert!\(v%5B2%5D.abs\(\)+%3C=+v%5Bi%5D.abs\(\)\);%0A++++%7D%0A++++%0A++++//+partial+sort+a+subrange%0A++++v.partial_sort_unstable_by_key\(1..4,+%7Ck%7C+k.abs\(\)\);%0A++++assert_eq!\(%26v%5B1..4%5D,+%5B2,+-3,+4%5D\);%0A++++%0A++++//+partial+sort+the+whole+range,+same+as+sort_unstable%0A++++v.partial_sort_unstable_by_key\(..,+%7Ck%7C+k.abs\(\)\);%0A++++assert_eq!\(v,+%5B1,+2,+-3,+4,+-5%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.49.0 · [Source](../../src/core/slice/mod.rs.html#3516-3518)

#### pub fn [select\_nth\_unstable](#method.select_nth_unstable)( &mut self, index: [usize](../primitive.usize.html), ) -> (&mut [\[T\]](../primitive.slice.html), [&mut T](../primitive.reference.html), &mut [\[T\]](../primitive.slice.html))

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Reorders the slice such that the element at `index` is at a sort-order position. All elements before `index` will be `<=` to this value, and all elements after will be `>=` to it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple that partitions the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `x <= self[index]`.
    
* The element at `index`.
    
* The unsorted subslice after `index`, whose elements all satisfy `x >= self[index]`.

##### [§](#current-implementation-3)Current implementation

The current algorithm is an introselect implementation based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which is also the basis for [`sort_unstable`](../primitive.slice.html#method.sort_unstable "method slice::sort_unstable"). The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### [§](#panics-43)Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order).

##### [§](#examples-146)Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

// Find the items `<=` to the median, the median itself, and the items `>=` to it.
let (lesser, median, greater) = v.select_nth_unstable(2);

assert!(lesser == [-3, -5] || lesser == [-5, -3]);
assert_eq!(median, &mut 1);
assert!(greater == [4, 2] || greater == [2, 4]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [-3, -5, 1, 2, 4] ||
        v == [-5, -3, 1, 2, 4] ||
        v == [-3, -5, 1, 4, 2] ||
        v == [-5, -3, 1, 4, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B-5i32,+4,+2,+-3,+1%5D;%0A++++%0A++++//+Find+the+items+%60%3C=%60+to+the+median,+the+median+itself,+and+the+items+%60%3E=%60+to+it.%0A++++let+\(lesser,+median,+greater\)+=+v.select_nth_unstable\(2\);%0A++++%0A++++assert!\(lesser+==+%5B-3,+-5%5D+%7C%7C+lesser+==+%5B-5,+-3%5D\);%0A++++assert_eq!\(median,+%26mut+1\);%0A++++assert!\(greater+==+%5B4,+2%5D+%7C%7C+greater+==+%5B2,+4%5D\);%0A++++%0A++++//+We+are+only+guaranteed+the+slice+will+be+one+of+the+following,+based+on+the+way+we+sort%0A++++//+about+the+specified+index.%0A++++assert!\(v+==+%5B-3,+-5,+1,+2,+4%5D+%7C%7C%0A++++++++++++v+==+%5B-5,+-3,+1,+2,+4%5D+%7C%7C%0A++++++++++++v+==+%5B-3,+-5,+1,+4,+2%5D+%7C%7C%0A++++++++++++v+==+%5B-5,+-3,+1,+4,+2%5D\);%0A%7D&edition=2024 "Run code")

1.49.0 · [Source](../../src/core/slice/mod.rs.html#3581-3587)

#### pub fn [select\_nth\_unstable\_by](#method.select_nth_unstable_by)<F>( &mut self, index: [usize](../primitive.usize.html), compare: F, ) -> (&mut [\[T\]](../primitive.slice.html), [&mut T](../primitive.reference.html), &mut [\[T\]](../primitive.slice.html))

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering"),

Reorders the slice with a comparator function such that the element at `index` is at a sort-order position. All elements before `index` will be `<=` to this value, and all elements after will be `>=` to it, according to the comparator function.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `compare(x, self[index]).is_le()`.
    
* The element at `index`.
    
* The unsorted subslice after `index`, whose elements all satisfy `compare(x, self[index]).is_ge()`.

##### [§](#current-implementation-4)Current implementation

The current algorithm is an introselect implementation based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which is also the basis for [`sort_unstable`](../primitive.slice.html#method.sort_unstable "method slice::sort_unstable"). The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### [§](#panics-44)Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if `compare` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order).

##### [§](#examples-147)Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

// Find the items `>=` to the median, the median itself, and the items `<=` to it, by using
// a reversed comparator.
let (before, median, after) = v.select_nth_unstable_by(2, |a, b| b.cmp(a));

assert!(before == [4, 2] || before == [2, 4]);
assert_eq!(median, &mut 1);
assert!(after == [-3, -5] || after == [-5, -3]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [2, 4, 1, -5, -3] ||
        v == [2, 4, 1, -3, -5] ||
        v == [4, 2, 1, -5, -3] ||
        v == [4, 2, 1, -3, -5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B-5i32,+4,+2,+-3,+1%5D;%0A++++%0A++++//+Find+the+items+%60%3E=%60+to+the+median,+the+median+itself,+and+the+items+%60%3C=%60+to+it,+by+using%0A++++//+a+reversed+comparator.%0A++++let+\(before,+median,+after\)+=+v.select_nth_unstable_by\(2,+%7Ca,+b%7C+b.cmp\(a\)\);%0A++++%0A++++assert!\(before+==+%5B4,+2%5D+%7C%7C+before+==+%5B2,+4%5D\);%0A++++assert_eq!\(median,+%26mut+1\);%0A++++assert!\(after+==+%5B-3,+-5%5D+%7C%7C+after+==+%5B-5,+-3%5D\);%0A++++%0A++++//+We+are+only+guaranteed+the+slice+will+be+one+of+the+following,+based+on+the+way+we+sort%0A++++//+about+the+specified+index.%0A++++assert!\(v+==+%5B2,+4,+1,+-5,+-3%5D+%7C%7C%0A++++++++++++v+==+%5B2,+4,+1,+-3,+-5%5D+%7C%7C%0A++++++++++++v+==+%5B4,+2,+1,+-5,+-3%5D+%7C%7C%0A++++++++++++v+==+%5B4,+2,+1,+-3,+-5%5D\);%0A%7D&edition=2024 "Run code")

1.49.0 · [Source](../../src/core/slice/mod.rs.html#3648-3655)

#### pub fn [select\_nth\_unstable\_by\_key](#method.select_nth_unstable_by_key)<K, F>( &mut self, index: [usize](../primitive.usize.html), f: F, ) -> (&mut [\[T\]](../primitive.slice.html), [&mut T](../primitive.reference.html), &mut [\[T\]](../primitive.slice.html))

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> K, K: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Reorders the slice with a key extraction function such that the element at `index` is at a sort-order position. All elements before `index` will have keys `<=` to the key at `index`, and all elements after will have keys `>=` to it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end up at that position), in-place (i.e. does not allocate), and runs in _O_(_n_) time. This function is also known as “kth element” in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `f(x) <= f(self[index])`.
    
* The element at `index`.
    
* The unsorted subslice after `index`, whose elements all satisfy `f(x) >= f(self[index])`.

##### [§](#current-implementation-5)Current implementation

The current algorithm is an introselect implementation based on [ipnsort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll and Orson Peters, which is also the basis for [`sort_unstable`](../primitive.slice.html#method.sort_unstable "method slice::sort_unstable"). The fallback algorithm is Median of Medians using Tukey’s Ninther for pivot selection, which guarantees linear runtime for all inputs.

##### [§](#panics-45)Panics

Panics when `index >= len()`, meaning it always panics on empty slices.

May panic if `K: Ord` does not implement a total order.

##### [§](#examples-148)Examples

```
let mut v = [-5i32, 4, 1, -3, 2];

// Find the items `<=` to the absolute median, the absolute median itself, and the items
// `>=` to it.
let (lesser, median, greater) = v.select_nth_unstable_by_key(2, |a| a.abs());

assert!(lesser == [1, 2] || lesser == [2, 1]);
assert_eq!(median, &mut -3);
assert!(greater == [4, -5] || greater == [-5, 4]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [1, 2, -3, 4, -5] ||
        v == [1, 2, -3, -5, 4] ||
        v == [2, 1, -3, 4, -5] ||
        v == [2, 1, -3, -5, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B-5i32,+4,+1,+-3,+2%5D;%0A++++%0A++++//+Find+the+items+%60%3C=%60+to+the+absolute+median,+the+absolute+median+itself,+and+the+items%0A++++//+%60%3E=%60+to+it.%0A++++let+\(lesser,+median,+greater\)+=+v.select_nth_unstable_by_key\(2,+%7Ca%7C+a.abs\(\)\);%0A++++%0A++++assert!\(lesser+==+%5B1,+2%5D+%7C%7C+lesser+==+%5B2,+1%5D\);%0A++++assert_eq!\(median,+%26mut+-3\);%0A++++assert!\(greater+==+%5B4,+-5%5D+%7C%7C+greater+==+%5B-5,+4%5D\);%0A++++%0A++++//+We+are+only+guaranteed+the+slice+will+be+one+of+the+following,+based+on+the+way+we+sort%0A++++//+about+the+specified+index.%0A++++assert!\(v+==+%5B1,+2,+-3,+4,+-5%5D+%7C%7C%0A++++++++++++v+==+%5B1,+2,+-3,+-5,+4%5D+%7C%7C%0A++++++++++++v+==+%5B2,+1,+-3,+4,+-5%5D+%7C%7C%0A++++++++++++v+==+%5B2,+1,+-3,+-5,+4%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3682-3684)

#### pub fn [partition\_dedup](#method.partition_dedup)(&mut self) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

where T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

🔬This is a nightly-only experimental API. (`slice_partition_dedup` [#54279](https://github.com/rust-lang/rust/issues/54279))

Moves all consecutive repeated elements to the end of the slice according to the [`PartialEq`](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq") trait implementation.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

If the slice is sorted, the first returned slice contains no duplicates.

##### [§](#examples-149)Examples

```
#![feature(slice_partition_dedup)]

let mut slice = [1, 2, 2, 3, 3, 2, 1, 1];

let (dedup, duplicates) = slice.partition_dedup();

assert_eq!(dedup, [1, 2, 3, 2, 1]);
assert_eq!(duplicates, [2, 3, 1]);
```

%5D%0A%23!%5Bfeature\(slice_partition_dedup\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+2,+3,+3,+2,+1,+1%5D;%0A++++%0A++++let+\(dedup,+duplicates\)+=+slice.partition_dedup\(\);%0A++++%0A++++assert_eq!\(dedup,+%5B1,+2,+3,+2,+1%5D\);%0A++++assert_eq!\(duplicates,+%5B2,+3,+1%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3716-3718)

#### pub fn [partition\_dedup\_by](#method.partition_dedup_by)<F>(&mut self, same\_bucket: F) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html), [&mut T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

🔬This is a nightly-only experimental API. (`slice_partition_dedup` [#54279](https://github.com/rust-lang/rust/issues/54279))

Moves all but the first of consecutive elements to the end of the slice satisfying a given equality relation.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

The `same_bucket` function is passed references to two elements from the slice and must determine if the elements compare equal. The elements are passed in opposite order from their order in the slice, so if `same_bucket(a, b)` returns `true`, `a` is moved at the end of the slice.

If the slice is sorted, the first returned slice contains no duplicates.

##### [§](#examples-150)Examples

```
#![feature(slice_partition_dedup)]

let mut slice = ["foo", "Foo", "BAZ", "Bar", "bar", "baz", "BAZ"];

let (dedup, duplicates) = slice.partition_dedup_by(|a, b| a.eq_ignore_ascii_case(b));

assert_eq!(dedup, ["foo", "BAZ", "Bar", "baz"]);
assert_eq!(duplicates, ["bar", "Foo", "BAZ"]);
```

%5D%0A%23!%5Bfeature\(slice_partition_dedup\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B%22foo%22,+%22Foo%22,+%22BAZ%22,+%22Bar%22,+%22bar%22,+%22baz%22,+%22BAZ%22%5D;%0A++++%0A++++let+\(dedup,+duplicates\)+=+slice.partition_dedup_by\(%7Ca,+b%7C+a.eq_ignore_ascii_case\(b\)\);%0A++++%0A++++assert_eq!\(dedup,+%5B%22foo%22,+%22BAZ%22,+%22Bar%22,+%22baz%22%5D\);%0A++++assert_eq!\(duplicates,+%5B%22bar%22,+%22Foo%22,+%22BAZ%22%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#3842-3845)

#### pub fn [partition\_dedup\_by\_key](#method.partition_dedup_by_key)<K, F>(&mut self, key: F) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&mut T](../primitive.reference.html)) -> K, K: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq"),

🔬This is a nightly-only experimental API. (`slice_partition_dedup` [#54279](https://github.com/rust-lang/rust/issues/54279))

Moves all but the first of consecutive elements to the end of the slice that resolve to the same key.

Returns two slices. The first contains no consecutive repeated elements. The second contains all the duplicates in no specified order.

If the slice is sorted, the first returned slice contains no duplicates.

##### [§](#examples-151)Examples

```
#![feature(slice_partition_dedup)]

let mut slice = [10, 20, 21, 30, 30, 20, 11, 13];

let (dedup, duplicates) = slice.partition_dedup_by_key(|i| *i / 10);

assert_eq!(dedup, [10, 20, 30, 20, 11]);
assert_eq!(duplicates, [21, 30, 13]);
```

%5D%0A%23!%5Bfeature\(slice_partition_dedup\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B10,+20,+21,+30,+30,+20,+11,+13%5D;%0A++++%0A++++let+\(dedup,+duplicates\)+=+slice.partition_dedup_by_key\(%7Ci%7C+*i+/+10\);%0A++++%0A++++assert_eq!\(dedup,+%5B10,+20,+30,+20,+11%5D\);%0A++++assert_eq!\(duplicates,+%5B21,+30,+13%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.26.0 · [Source](../../src/core/slice/mod.rs.html#3884)

#### pub fn [rotate\_left](#method.rotate_left)(&mut self, mid: [usize](../primitive.usize.html))

Rotates the slice in-place such that the first `mid` elements of the slice move to the end while the last `self.len() - mid` elements move to the front.

After calling `rotate_left`, the element previously at index `mid` will become the first element in the slice.

##### [§](#panics-46)Panics

This function will panic if `mid` is greater than the length of the slice. Note that `mid == self.len()` does _not_ panic and is a no-op rotation.

##### [§](#complexity)Complexity

Takes linear (in `self.len()`) time.

##### [§](#examples-152)Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_left(2);
assert_eq!(a, ['c', 'd', 'e', 'f', 'a', 'b']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++a.rotate_left\(2\);%0A++++assert_eq!\(a,+%5B'c',+'d',+'e',+'f',+'a',+'b'%5D\);%0A%7D&edition=2024 "Run code")

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_left(1);
assert_eq!(a, ['a', 'c', 'd', 'e', 'b', 'f']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++a%5B1..5%5D.rotate_left\(1\);%0A++++assert_eq!\(a,+%5B'a',+'c',+'d',+'e',+'b',+'f'%5D\);%0A%7D&edition=2024 "Run code")

1.26.0 · [Source](../../src/core/slice/mod.rs.html#3930)

#### pub fn [rotate\_right](#method.rotate_right)(&mut self, k: [usize](../primitive.usize.html))

Rotates the slice in-place such that the first `self.len() - k` elements of the slice move to the end while the last `k` elements move to the front.

After calling `rotate_right`, the element previously at index `self.len() - k` will become the first element in the slice.

##### [§](#panics-47)Panics

This function will panic if `k` is greater than the length of the slice. Note that `k == self.len()` does _not_ panic and is a no-op rotation.

##### [§](#complexity-1)Complexity

Takes linear (in `self.len()`) time.

##### [§](#examples-153)Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_right(2);
assert_eq!(a, ['e', 'f', 'a', 'b', 'c', 'd']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++a.rotate_right\(2\);%0A++++assert_eq!\(a,+%5B'e',+'f',+'a',+'b',+'c',+'d'%5D\);%0A%7D&edition=2024 "Run code")

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_right(1);
assert_eq!(a, ['a', 'e', 'b', 'c', 'd', 'f']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++a%5B1..5%5D.rotate_right\(1\);%0A++++assert_eq!\(a,+%5B'a',+'e',+'b',+'c',+'d',+'f'%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#4004)

#### pub fn [shift\_left](#method.shift_left)<const N: [usize](../primitive.usize.html)\>(&mut self, inserted: [\[T; N\]](../primitive.array.html)) -> [\[T; N\]](../primitive.array.html)

🔬This is a nightly-only experimental API. (`slice_shift` [#151772](https://github.com/rust-lang/rust/issues/151772))

Moves the elements of this slice `N` places to the left, returning the ones that “fall off” the front, and putting `inserted` at the end.

Equivalently, you can think of concatenating `self` and `inserted` into one long sequence, then returning the left-most `N` items and the rest into `self`:

```
          self (before)    inserted
          vvvvvvvvvvvvvvv  vvv
          [1, 2, 3, 4, 5]  [9]
       ↙   ↙  ↙  ↙  ↙   ↙
     [1]  [2, 3, 4, 5, 9]
     ^^^  ^^^^^^^^^^^^^^^
returned  self (after)
```

See also [`Self::shift_right`](../primitive.slice.html#method.shift_right "method slice::shift_right") and compare [`Self::rotate_left`](../primitive.slice.html#method.rotate_left "method slice::rotate_left").

##### [§](#examples-154)Examples

```
#![feature(slice_shift)]

// Same as the diagram above
let mut a = [1, 2, 3, 4, 5];
let inserted = [9];
let returned = a.shift_left(inserted);
assert_eq!(returned, [1]);
assert_eq!(a, [2, 3, 4, 5, 9]);

// You can shift multiple items at a time
let mut a = *b"Hello world";
assert_eq!(a.shift_left(*b" peace"), *b"Hello ");
assert_eq!(a, *b"world peace");

// The name comes from this operation's similarity to bitshifts
let mut a: u8 = 0b10010110;
a <<= 3;
assert_eq!(a, 0b10110000_u8);
let mut a: [_; 8] = [1, 0, 0, 1, 0, 1, 1, 0];
a.shift_left([0; 3]);
assert_eq!(a, [1, 0, 1, 1, 0, 0, 0, 0]);

// Remember you can sub-slice to affect less that the whole slice.
// For example, this is similar to `.remove(1)` + `.insert(4, 'Z')`
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
assert_eq!(a[1..=4].shift_left(['Z']), ['b']);
assert_eq!(a, ['a', 'c', 'd', 'e', 'Z', 'f']);

// If the size matches it's equivalent to `mem::replace`
let mut a = [1, 2, 3];
assert_eq!(a.shift_left([7, 8, 9]), [1, 2, 3]);
assert_eq!(a, [7, 8, 9]);

// Some of the "inserted" elements end up returned if the slice is too short
let mut a = [];
assert_eq!(a.shift_left([1, 2, 3]), [1, 2, 3]);
let mut a = [9];
assert_eq!(a.shift_left([1, 2, 3]), [9, 1, 2]);
assert_eq!(a, [3]);
```

%5D%0A%23!%5Bfeature\(slice_shift\)%5D%0A%0A%0A//+Same+as+the+diagram+above%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B1,+2,+3,+4,+5%5D;%0A++++let+inserted+=+%5B9%5D;%0A++++let+returned+=+a.shift_left\(inserted\);%0A++++assert_eq!\(returned,+%5B1%5D\);%0A++++assert_eq!\(a,+%5B2,+3,+4,+5,+9%5D\);%0A++++%0A++++//+You+can+shift+multiple+items+at+a+time%0A++++let+mut+a+=+*b%22Hello+world%22;%0A++++assert_eq!\(a.shift_left\(*b%22+peace%22\),+*b%22Hello+%22\);%0A++++assert_eq!\(a,+*b%22world+peace%22\);%0A++++%0A++++//+The+name+comes+from+this+operation's+similarity+to+bitshifts%0A++++let+mut+a:+u8+=+0b10010110;%0A++++a+%3C%3C=+3;%0A++++assert_eq!\(a,+0b10110000_u8\);%0A++++let+mut+a:+%5B_;+8%5D+=+%5B1,+0,+0,+1,+0,+1,+1,+0%5D;%0A++++a.shift_left\(%5B0;+3%5D\);%0A++++assert_eq!\(a,+%5B1,+0,+1,+1,+0,+0,+0,+0%5D\);%0A++++%0A++++//+Remember+you+can+sub-slice+to+affect+less+that+the+whole+slice.%0A++++//+For+example,+this+is+similar+to+%60.remove\(1\)%60+%2B+%60.insert\(4,+'Z'\)%60%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++assert_eq!\(a%5B1..=4%5D.shift_left\(%5B'Z'%5D\),+%5B'b'%5D\);%0A++++assert_eq!\(a,+%5B'a',+'c',+'d',+'e',+'Z',+'f'%5D\);%0A++++%0A++++//+If+the+size+matches+it's+equivalent+to+%60mem::replace%60%0A++++let+mut+a+=+%5B1,+2,+3%5D;%0A++++assert_eq!\(a.shift_left\(%5B7,+8,+9%5D\),+%5B1,+2,+3%5D\);%0A++++assert_eq!\(a,+%5B7,+8,+9%5D\);%0A++++%0A++++//+Some+of+the+%22inserted%22+elements+end+up+returned+if+the+slice+is+too+short%0A++++let+mut+a+=+%5B%5D;%0A++++assert_eq!\(a.shift_left\(%5B1,+2,+3%5D\),+%5B1,+2,+3%5D\);%0A++++let+mut+a+=+%5B9%5D;%0A++++assert_eq!\(a.shift_left\(%5B1,+2,+3%5D\),+%5B9,+1,+2%5D\);%0A++++assert_eq!\(a,+%5B3%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#4108)

#### pub fn [shift\_right](#method.shift_right)<const N: [usize](../primitive.usize.html)\>(&mut self, inserted: [\[T; N\]](../primitive.array.html)) -> [\[T; N\]](../primitive.array.html)

🔬This is a nightly-only experimental API. (`slice_shift` [#151772](https://github.com/rust-lang/rust/issues/151772))

Moves the elements of this slice `N` places to the right, returning the ones that “fall off” the back, and putting `inserted` at the beginning.

Equivalently, you can think of concatenating `inserted` and `self` into one long sequence, then returning the right-most `N` items and the rest into `self`:

```
inserted  self (before)
     vvv  vvvvvvvvvvvvvvv
     [0]  [5, 6, 7, 8, 9]
       ↘   ↘  ↘  ↘  ↘   ↘
          [0, 5, 6, 7, 8]  [9]
          ^^^^^^^^^^^^^^^  ^^^
          self (after)     returned
```

See also [`Self::shift_left`](../primitive.slice.html#method.shift_left "method slice::shift_left") and compare [`Self::rotate_right`](../primitive.slice.html#method.rotate_right "method slice::rotate_right").

##### [§](#examples-155)Examples

```
#![feature(slice_shift)]

// Same as the diagram above
let mut a = [5, 6, 7, 8, 9];
let inserted = [0];
let returned = a.shift_right(inserted);
assert_eq!(returned, [9]);
assert_eq!(a, [0, 5, 6, 7, 8]);

// The name comes from this operation's similarity to bitshifts
let mut a: u8 = 0b10010110;
a >>= 3;
assert_eq!(a, 0b00010010_u8);
let mut a: [_; 8] = [1, 0, 0, 1, 0, 1, 1, 0];
a.shift_right([0; 3]);
assert_eq!(a, [0, 0, 0, 1, 0, 0, 1, 0]);

// Remember you can sub-slice to affect less that the whole slice.
// For example, this is similar to `.remove(4)` + `.insert(1, 'Z')`
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
assert_eq!(a[1..=4].shift_right(['Z']), ['e']);
assert_eq!(a, ['a', 'Z', 'b', 'c', 'd', 'f']);

// If the size matches it's equivalent to `mem::replace`
let mut a = [1, 2, 3];
assert_eq!(a.shift_right([7, 8, 9]), [1, 2, 3]);
assert_eq!(a, [7, 8, 9]);

// Some of the "inserted" elements end up returned if the slice is too short
let mut a = [];
assert_eq!(a.shift_right([1, 2, 3]), [1, 2, 3]);
let mut a = [9];
assert_eq!(a.shift_right([1, 2, 3]), [2, 3, 9]);
assert_eq!(a, [1]);
```

%5D%0A%23!%5Bfeature\(slice_shift\)%5D%0A%0A%0A//+Same+as+the+diagram+above%0Afn+main\(\)+%7B%0A++++let+mut+a+=+%5B5,+6,+7,+8,+9%5D;%0A++++let+inserted+=+%5B0%5D;%0A++++let+returned+=+a.shift_right\(inserted\);%0A++++assert_eq!\(returned,+%5B9%5D\);%0A++++assert_eq!\(a,+%5B0,+5,+6,+7,+8%5D\);%0A++++%0A++++//+The+name+comes+from+this+operation's+similarity+to+bitshifts%0A++++let+mut+a:+u8+=+0b10010110;%0A++++a+%3E%3E=+3;%0A++++assert_eq!\(a,+0b00010010_u8\);%0A++++let+mut+a:+%5B_;+8%5D+=+%5B1,+0,+0,+1,+0,+1,+1,+0%5D;%0A++++a.shift_right\(%5B0;+3%5D\);%0A++++assert_eq!\(a,+%5B0,+0,+0,+1,+0,+0,+1,+0%5D\);%0A++++%0A++++//+Remember+you+can+sub-slice+to+affect+less+that+the+whole+slice.%0A++++//+For+example,+this+is+similar+to+%60.remove\(4\)%60+%2B+%60.insert\(1,+'Z'\)%60%0A++++let+mut+a+=+%5B'a',+'b',+'c',+'d',+'e',+'f'%5D;%0A++++assert_eq!\(a%5B1..=4%5D.shift_right\(%5B'Z'%5D\),+%5B'e'%5D\);%0A++++assert_eq!\(a,+%5B'a',+'Z',+'b',+'c',+'d',+'f'%5D\);%0A++++%0A++++//+If+the+size+matches+it's+equivalent+to+%60mem::replace%60%0A++++let+mut+a+=+%5B1,+2,+3%5D;%0A++++assert_eq!\(a.shift_right\(%5B7,+8,+9%5D\),+%5B1,+2,+3%5D\);%0A++++assert_eq!\(a,+%5B7,+8,+9%5D\);%0A++++%0A++++//+Some+of+the+%22inserted%22+elements+end+up+returned+if+the+slice+is+too+short%0A++++let+mut+a+=+%5B%5D;%0A++++assert_eq!\(a.shift_right\(%5B1,+2,+3%5D\),+%5B1,+2,+3%5D\);%0A++++let+mut+a+=+%5B9%5D;%0A++++assert_eq!\(a.shift_right\(%5B1,+2,+3%5D\),+%5B2,+3,+9%5D\);%0A++++assert_eq!\(a,+%5B1%5D\);%0A%7D&version=nightly&edition=2024 "Run code")

1.50.0 · [Source](../../src/core/slice/mod.rs.html#4166-4168)

#### pub fn [fill](#method.fill)(&mut self, value: T)

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

Fills `self` with elements by cloning `value`.

##### [§](#examples-156)Examples

```
let mut buf = vec![0; 10];
buf.fill(1);
assert_eq!(buf, vec![1; 10]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+buf+=+vec!%5B0;+10%5D;%0A++++buf.fill\(1\);%0A++++assert_eq!\(buf,+vec!%5B1;+10%5D\);%0A%7D&edition=2024 "Run code")

1.51.0 · [Source](../../src/core/slice/mod.rs.html#4190-4192)

#### pub fn [fill\_with](#method.fill_with)<F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")() -> T,

Fills `self` with elements returned by calling a closure repeatedly.

This method uses a closure to create new values. If you’d rather [`Clone`](../clone/trait.Clone.html "trait std::clone::Clone") a given value, use [`fill`](../primitive.slice.html#method.fill "method slice::fill"). If you want to use the [`Default`](../default/trait.Default.html "trait std::default::Default") trait to generate values, you can pass [`Default::default`](../default/trait.Default.html#tymethod.default "associated function std::default::Default::default") as the argument.

##### [§](#examples-157)Examples

```
let mut buf = vec![1; 10];
buf.fill_with(Default::default);
assert_eq!(buf, vec![0; 10]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+buf+=+vec!%5B1;+10%5D;%0A++++buf.fill_with\(Default::default\);%0A++++assert_eq!\(buf,+vec!%5B0;+10%5D\);%0A%7D&edition=2024 "Run code")

1.7.0 · [Source](../../src/core/slice/mod.rs.html#4254-4256)

#### pub fn [clone\_from\_slice](#method.clone_from_slice)(&mut self, src: &[\[T\]](../primitive.slice.html))

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

Copies the elements from `src` into `self`.

The length of `src` must be the same as `self`.

##### [§](#panics-48)Panics

This function will panic if the two slices have different lengths.

##### [§](#examples-158)Examples

Cloning two elements from a slice into another:

```
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

// Because the slices have to be the same length,
// we slice the source slice from four elements
// to two. It will panic if we don't do this.
dst.clone_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+src+=+%5B1,+2,+3,+4%5D;%0A++++let+mut+dst+=+%5B0,+0%5D;%0A++++%0A++++//+Because+the+slices+have+to+be+the+same+length,%0A++++//+we+slice+the+source+slice+from+four+elements%0A++++//+to+two.+It+will+panic+if+we+don't+do+this.%0A++++dst.clone_from_slice\(%26src%5B2..%5D\);%0A++++%0A++++assert_eq!\(src,+%5B1,+2,+3,+4%5D\);%0A++++assert_eq!\(dst,+%5B3,+4%5D\);%0A%7D&edition=2024 "Run code")

Rust enforces that there can only be one mutable reference with no immutable references to a particular piece of data in a particular scope. Because of this, attempting to use `clone_from_slice` on a single slice will result in a compile failure:

[ⓘ](# "This example deliberately fails to compile")

```
let mut slice = [1, 2, 3, 4, 5];

slice[..2].clone_from_slice(&slice[3..]); // compile fail!
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++%0A++++slice%5B..2%5D.clone_from_slice\(%26slice%5B3..%5D\);%0A%7D&edition=2024 "Run code")

To work around this, we can use [`split_at_mut`](../primitive.slice.html#method.split_at_mut "method slice::split_at_mut") to create two distinct sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.clone_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+slice.split_at_mut\(2\);%0A++++++++left.clone_from_slice\(%26right%5B1..%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(slice,+%5B4,+5,+3,+4,+5%5D\);%0A%7D&edition=2024 "Run code")

1.9.0 · [Source](../../src/core/slice/mod.rs.html#4320-4322)

#### pub fn [copy\_from\_slice](#method.copy_from_slice)(&mut self, src: &[\[T\]](../primitive.slice.html))

where T: [Copy](../marker/trait.Copy.html "trait std::marker::Copy"),

Copies all elements from `src` into `self`, using a memcpy.

The length of `src` must be the same as `self`.

If `T` does not implement `Copy`, use [`clone_from_slice`](../primitive.slice.html#method.clone_from_slice "method slice::clone_from_slice").

##### [§](#panics-49)Panics

This function will panic if the two slices have different lengths.

##### [§](#examples-159)Examples

Copying two elements from a slice into another:

```
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

// Because the slices have to be the same length,
// we slice the source slice from four elements
// to two. It will panic if we don't do this.
dst.copy_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+src+=+%5B1,+2,+3,+4%5D;%0A++++let+mut+dst+=+%5B0,+0%5D;%0A++++%0A++++//+Because+the+slices+have+to+be+the+same+length,%0A++++//+we+slice+the+source+slice+from+four+elements%0A++++//+to+two.+It+will+panic+if+we+don't+do+this.%0A++++dst.copy_from_slice\(%26src%5B2..%5D\);%0A++++%0A++++assert_eq!\(src,+%5B1,+2,+3,+4%5D\);%0A++++assert_eq!\(dst,+%5B3,+4%5D\);%0A%7D&edition=2024 "Run code")

Rust enforces that there can only be one mutable reference with no immutable references to a particular piece of data in a particular scope. Because of this, attempting to use `copy_from_slice` on a single slice will result in a compile failure:

[ⓘ](# "This example deliberately fails to compile")

```
let mut slice = [1, 2, 3, 4, 5];

slice[..2].copy_from_slice(&slice[3..]); // compile fail!
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++%0A++++slice%5B..2%5D.copy_from_slice\(%26slice%5B3..%5D\);%0A%7D&edition=2024 "Run code")

To work around this, we can use [`split_at_mut`](../primitive.slice.html#method.split_at_mut "method slice::split_at_mut") to create two distinct sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.copy_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+slice.split_at_mut\(2\);%0A++++++++left.copy_from_slice\(%26right%5B1..%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(slice,+%5B4,+5,+3,+4,+5%5D\);%0A%7D&edition=2024 "Run code")

1.37.0 · [Source](../../src/core/slice/mod.rs.html#4354-4356)

#### pub fn [copy\_within](#method.copy_within)<R>(&mut self, src: R, dest: [usize](../primitive.usize.html))

where R: [RangeBounds](../ops/trait.RangeBounds.html "trait std::ops::RangeBounds")<[usize](../primitive.usize.html)\>, T: [Copy](../marker/trait.Copy.html "trait std::marker::Copy"),

Copies elements from one part of the slice to another part of itself, using a memmove.

`src` is the range within `self` to copy from. `dest` is the starting index of the range within `self` to copy to, which will have the same length as `src`. The two ranges may overlap. The ends of the two ranges must be less than or equal to `self.len()`.

##### [§](#panics-50)Panics

This function will panic if either range exceeds the end of the slice, or if the end of `src` is before the start.

##### [§](#examples-160)Examples

Copying four bytes within a slice:

```
let mut bytes = *b"Hello, World!";

bytes.copy_within(1..5, 8);

assert_eq!(&bytes, b"Hello, Wello!");
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+bytes+=+*b%22Hello,+World!%22;%0A++++%0A++++bytes.copy_within\(1..5,+8\);%0A++++%0A++++assert_eq!\(%26bytes,+b%22Hello,+Wello!%22\);%0A%7D&edition=2024 "Run code")

1.27.0 · [Source](../../src/core/slice/mod.rs.html#4422)

#### pub fn [swap\_with\_slice](#method.swap_with_slice)(&mut self, other: &mut [\[T\]](../primitive.slice.html))

Swaps all elements in `self` with those in `other`.

The length of `other` must be the same as `self`.

##### [§](#panics-51)Panics

This function will panic if the two slices have different lengths.

##### [§](#example-1)Example

Swapping two elements across slices:

```
let mut slice1 = [0, 0];
let mut slice2 = [1, 2, 3, 4];

slice1.swap_with_slice(&mut slice2[2..]);

assert_eq!(slice1, [3, 4]);
assert_eq!(slice2, [1, 2, 0, 0]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice1+=+%5B0,+0%5D;%0A++++let+mut+slice2+=+%5B1,+2,+3,+4%5D;%0A++++%0A++++slice1.swap_with_slice\(%26mut+slice2%5B2..%5D\);%0A++++%0A++++assert_eq!\(slice1,+%5B3,+4%5D\);%0A++++assert_eq!\(slice2,+%5B1,+2,+0,+0%5D\);%0A%7D&edition=2024 "Run code")

Rust enforces that there can only be one mutable reference to a particular piece of data in a particular scope. Because of this, attempting to use `swap_with_slice` on a single slice will result in a compile failure:

[ⓘ](# "This example deliberately fails to compile")

```
let mut slice = [1, 2, 3, 4, 5];
slice[..2].swap_with_slice(&mut slice[3..]); // compile fail!
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++slice%5B..2%5D.swap_with_slice\(%26mut+slice%5B3..%5D\);%0A%7D&edition=2024 "Run code")

To work around this, we can use [`split_at_mut`](../primitive.slice.html#method.split_at_mut "method slice::split_at_mut") to create two distinct mutable sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.swap_with_slice(&mut right[1..]);
}

assert_eq!(slice, [4, 5, 3, 1, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice+=+%5B1,+2,+3,+4,+5%5D;%0A++++%0A++++%7B%0A++++++++let+\(left,+right\)+=+slice.split_at_mut\(2\);%0A++++++++left.swap_with_slice\(%26mut+right%5B1..%5D\);%0A++++%7D%0A++++%0A++++assert_eq!\(slice,+%5B4,+5,+3,+1,+2%5D\);%0A%7D&edition=2024 "Run code")

1.30.0 · [Source](../../src/core/slice/mod.rs.html#4499)

#### pub unsafe fn [align\_to](#method.align_to)<U>(&self) -> (&[\[T\]](../primitive.slice.html), &[\[U\]](../primitive.slice.html), &[\[T\]](../primitive.slice.html))

Transmutes the slice to a slice of another type, ensuring alignment of the types is maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle slice of a new type, and the suffix slice. The middle part will be as big as possible under the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are zero-sized and will return the original slice without splitting anything.

##### [§](#safety-12)Safety

This method is essentially a `transmute` with respect to the elements in the returned middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

##### [§](#examples-161)Examples

Basic usage:

```
unsafe {
    let bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
    let (prefix, shorts, suffix) = bytes.align_to::<u16>();
    // less_efficient_algorithm_for_bytes(prefix);
    // more_efficient_algorithm_for_aligned_shorts(shorts);
    // less_efficient_algorithm_for_bytes(suffix);
}
```

%5D%0Afn+main\(\)+%7B%0A++++unsafe+%7B%0A++++++++let+bytes:+%5Bu8;+7%5D+=+%5B1,+2,+3,+4,+5,+6,+7%5D;%0A++++++++let+\(prefix,+shorts,+suffix\)+=+bytes.align_to::%3Cu16%3E\(\);%0A++++++++//+less_efficient_algorithm_for_bytes\(prefix\);%0A++++++++//+more_efficient_algorithm_for_aligned_shorts\(shorts\);%0A++++++++//+less_efficient_algorithm_for_bytes\(suffix\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.30.0 · [Source](../../src/core/slice/mod.rs.html#4564)

#### pub unsafe fn [align\_to\_mut](#method.align_to_mut)<U>(&mut self) -> (&mut [\[T\]](../primitive.slice.html), &mut [\[U\]](../primitive.slice.html), &mut [\[T\]](../primitive.slice.html))

Transmutes the mutable slice to a mutable slice of another type, ensuring alignment of the types is maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle slice of a new type, and the suffix slice. The middle part will be as big as possible under the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are zero-sized and will return the original slice without splitting anything.

##### [§](#safety-13)Safety

This method is essentially a `transmute` with respect to the elements in the returned middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

##### [§](#examples-162)Examples

Basic usage:

```
unsafe {
    let mut bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
    let (prefix, shorts, suffix) = bytes.align_to_mut::<u16>();
    // less_efficient_algorithm_for_bytes(prefix);
    // more_efficient_algorithm_for_aligned_shorts(shorts);
    // less_efficient_algorithm_for_bytes(suffix);
}
```

%5D%0Afn+main\(\)+%7B%0A++++unsafe+%7B%0A++++++++let+mut+bytes:+%5Bu8;+7%5D+=+%5B1,+2,+3,+4,+5,+6,+7%5D;%0A++++++++let+\(prefix,+shorts,+suffix\)+=+bytes.align_to_mut::%3Cu16%3E\(\);%0A++++++++//+less_efficient_algorithm_for_bytes\(prefix\);%0A++++++++//+more_efficient_algorithm_for_aligned_shorts\(shorts\);%0A++++++++//+less_efficient_algorithm_for_bytes\(suffix\);%0A++++%7D%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#4655-4658)

#### pub fn [as\_simd](#method.as_simd)<const LANES: [usize](../primitive.usize.html)\>(&self) -> (&[\[T\]](../primitive.slice.html), &\[[Simd](../simd/struct.Simd.html "struct std::simd::Simd")<T, LANES>\], &[\[T\]](../primitive.slice.html))

where [Simd](../simd/struct.Simd.html "struct std::simd::Simd")<T, LANES>: [AsRef](../convert/trait.AsRef.html "trait std::convert::AsRef")<[\[T; LANES\]](../primitive.array.html)\>, T: [SimdElement](../simd/trait.SimdElement.html "trait std::simd::SimdElement"),

🔬This is a nightly-only experimental API. (`portable_simd` [#86656](https://github.com/rust-lang/rust/issues/86656))

Splits a slice into a prefix, a middle of aligned SIMD types, and a suffix.

This is a safe wrapper around [`slice::align_to`](../primitive.slice.html#method.align_to "method slice::align_to"), so inherits the same guarantees as that method.

##### [§](#panics-52)Panics

This will panic if the size of the SIMD type is different from `LANES` times that of the scalar.

At the time of writing, the trait restrictions on `Simd<T, LANES>` keeps that from ever happening, as only power-of-two numbers of lanes are supported. It’s possible that, in the future, those restrictions might be lifted in a way that would make it possible to see panics from this method for something like `LANES == 3`.

##### [§](#examples-163)Examples

```
#![feature(portable_simd)]
use core::simd::prelude::*;

let short = &[1, 2, 3];
let (prefix, middle, suffix) = short.as_simd::<4>();
assert_eq!(middle, []); // Not enough elements for anything in the middle

// They might be split in any possible way between prefix and suffix
let it = prefix.iter().chain(suffix).copied();
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

%5D%0A%23!%5Bfeature\(portable_simd\)%5D%0A%0Afn+main\(\)+%7B%0A++++use+core::simd::prelude::*;%0A++++%0A++++let+short+=+%26%5B1,+2,+3%5D;%0A++++let+\(prefix,+middle,+suffix\)+=+short.as_simd::%3C4%3E\(\);%0A++++assert_eq!\(middle,+%5B%5D\);+//+Not+enough+elements+for+anything+in+the+middle%0A++++%0A++++//+They+might+be+split+in+any+possible+way+between+prefix+and+suffix%0A++++let+it+=+prefix.iter\(\).chain\(suffix\).copied\(\);%0A++++assert_eq!\(it.collect::%3CVec%3C_%3E%3E\(\),+vec!%5B1,+2,+3%5D\);%0A++++%0A++++fn+basic_simd_sum\(x:+%26%5Bf32%5D\)+-%3E+f32+%7B%0A++++++++use+std::ops::Add;%0A++++++++let+\(prefix,+middle,+suffix\)+=+x.as_simd\(\);%0A++++++++let+sums+=+f32x4::from_array\(%5B%0A++++++++++++prefix.iter\(\).copied\(\).sum\(\),%0A++++++++++++0.0,%0A++++++++++++0.0,%0A++++++++++++suffix.iter\(\).copied\(\).sum\(\),%0A++++++++%5D\);%0A++++++++let+sums+=+middle.iter\(\).copied\(\).fold\(sums,+f32x4::add\);%0A++++++++sums.reduce_sum\(\)%0A++++%7D%0A++++%0A++++let+numbers:+Vec%3Cf32%3E+=+\(1..101\).map\(%7Cx%7C+x+as+_\).collect\(\);%0A++++assert_eq!\(basic_simd_sum\(%26numbers%5B1..99%5D\),+4949.0\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#4690-4693)

#### pub fn [as\_simd\_mut](#method.as_simd_mut)<const LANES: [usize](../primitive.usize.html)\>( &mut self, ) -> (&mut [\[T\]](../primitive.slice.html), &mut \[[Simd](../simd/struct.Simd.html "struct std::simd::Simd")<T, LANES>\], &mut [\[T\]](../primitive.slice.html))

where [Simd](../simd/struct.Simd.html "struct std::simd::Simd")<T, LANES>: [AsMut](../convert/trait.AsMut.html "trait std::convert::AsMut")<[\[T; LANES\]](../primitive.array.html)\>, T: [SimdElement](../simd/trait.SimdElement.html "trait std::simd::SimdElement"),

🔬This is a nightly-only experimental API. (`portable_simd` [#86656](https://github.com/rust-lang/rust/issues/86656))

Splits a mutable slice into a mutable prefix, a middle of aligned SIMD types, and a mutable suffix.

This is a safe wrapper around [`slice::align_to_mut`](../primitive.slice.html#method.align_to_mut "method slice::align_to_mut"), so inherits the same guarantees as that method.

This is the mutable version of [`slice::as_simd`](../primitive.slice.html#method.as_simd "method slice::as_simd"); see that for examples.

##### [§](#panics-53)Panics

This will panic if the size of the SIMD type is different from `LANES` times that of the scalar.

At the time of writing, the trait restrictions on `Simd<T, LANES>` keeps that from ever happening, as only power-of-two numbers of lanes are supported. It’s possible that, in the future, those restrictions might be lifted in a way that would make it possible to see panics from this method for something like `LANES == 3`.

1.82.0 · [Source](../../src/core/slice/mod.rs.html#4728-4730)

#### pub fn [is\_sorted](#method.is_sorted)(&self) -> [bool](../primitive.bool.html)

where T: [PartialOrd](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd"),

Checks if the elements of this slice are sorted.

That is, for each element `a` and its following element `b`, `a <= b` must hold. If the slice yields exactly zero or one element, `true` is returned.

Note that if `Self::Item` is only `PartialOrd`, but not `Ord`, the above definition implies that this function returns `false` if any two consecutive items are not comparable.

##### [§](#examples-164)Examples

```
let empty: [i32; 0] = [];

assert!([1, 2, 2, 9].is_sorted());
assert!(![1, 3, 2, 4].is_sorted());
assert!([0].is_sorted());
assert!(empty.is_sorted());
assert!(![0.0, 1.0, f32::NAN].is_sorted());
```

%5D%0Afn+main\(\)+%7B%0A++++let+empty:+%5Bi32;+0%5D+=+%5B%5D;%0A++++%0A++++assert!\(%5B1,+2,+2,+9%5D.is_sorted\(\)\);%0A++++assert!\(!%5B1,+3,+2,+4%5D.is_sorted\(\)\);%0A++++assert!\(%5B0%5D.is_sorted\(\)\);%0A++++assert!\(empty.is_sorted\(\)\);%0A++++assert!\(!%5B0.0,+1.0,+f32::NAN%5D.is_sorted\(\)\);%0A%7D&edition=2024 "Run code")

1.82.0 · [Source](../../src/core/slice/mod.rs.html#4771-4773)

#### pub fn [is\_sorted\_by](#method.is_sorted_by)<'a, F>(&'a self, compare: F) -> [bool](../primitive.bool.html)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&'a T](../primitive.reference.html), [&'a T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Checks if the elements of this slice are sorted using the given comparator function.

Instead of using `PartialOrd::partial_cmp`, this function uses the given `compare` function to determine whether two elements are to be considered in sorted order.

##### [§](#examples-165)Examples

```
assert!([1, 2, 2, 9].is_sorted_by(|a, b| a <= b));
assert!(![1, 2, 2, 9].is_sorted_by(|a, b| a < b));

assert!([0].is_sorted_by(|a, b| true));
assert!([0].is_sorted_by(|a, b| false));

let empty: [i32; 0] = [];
assert!(empty.is_sorted_by(|a, b| false));
assert!(empty.is_sorted_by(|a, b| true));
```

%5D%0Afn+main\(\)+%7B%0A++++assert!\(%5B1,+2,+2,+9%5D.is_sorted_by\(%7Ca,+b%7C+a+%3C=+b\)\);%0A++++assert!\(!%5B1,+2,+2,+9%5D.is_sorted_by\(%7Ca,+b%7C+a+%3C+b\)\);%0A++++%0A++++assert!\(%5B0%5D.is_sorted_by\(%7Ca,+b%7C+true\)\);%0A++++assert!\(%5B0%5D.is_sorted_by\(%7Ca,+b%7C+false\)\);%0A++++%0A++++let+empty:+%5Bi32;+0%5D+=+%5B%5D;%0A++++assert!\(empty.is_sorted_by\(%7Ca,+b%7C+false\)\);%0A++++assert!\(empty.is_sorted_by\(%7Ca,+b%7C+true\)\);%0A%7D&edition=2024 "Run code")

1.82.0 · [Source](../../src/core/slice/mod.rs.html#4795-4798)

#### pub fn [is\_sorted\_by\_key](#method.is_sorted_by_key)<'a, F, K>(&'a self, f: F) -> [bool](../primitive.bool.html)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&'a T](../primitive.reference.html)) -> K, K: [PartialOrd](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd"),

Checks if the elements of this slice are sorted using the given key extraction function.

Instead of comparing the slice’s elements directly, this function compares the keys of the elements, as determined by `f`. Apart from that, it’s equivalent to [`is_sorted`](../primitive.slice.html#method.is_sorted "method slice::is_sorted"); see its documentation for more information.

##### [§](#examples-166)Examples

```
assert!(["c", "bb", "aaa"].is_sorted_by_key(|s| s.len()));
assert!(![-2i32, -1, 0, 3].is_sorted_by_key(|n| n.abs()));
```

%5D%0Afn+main\(\)+%7B%0A++++assert!\(%5B%22c%22,+%22bb%22,+%22aaa%22%5D.is_sorted_by_key\(%7Cs%7C+s.len\(\)\)\);%0A++++assert!\(!%5B-2i32,+-1,+0,+3%5D.is_sorted_by_key\(%7Cn%7C+n.abs\(\)\)\);%0A%7D&edition=2024 "Run code")

1.52.0 · [Source](../../src/core/slice/mod.rs.html#4854-4856)

#### pub fn [partition\_point](#method.partition_point)<P>(&self, pred: P) -> [usize](../primitive.usize.html)

where P: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> [bool](../primitive.bool.html),

Returns the index of the partition point according to the given predicate (the index of the first element of the second partition).

The slice is assumed to be partitioned according to the given predicate. This means that all elements for which the predicate returns true are at the start of the slice and all elements for which the predicate returns false are at the end. For example, `[7, 15, 3, 5, 4, 12, 6]` is partitioned under the predicate `x % 2 != 0` (all odd numbers are at the start, all even at the end).

If this slice is not partitioned, the returned result is unspecified and meaningless, as this method performs a kind of binary search.

See also [`binary_search`](../primitive.slice.html#method.binary_search "method slice::binary_search"), [`binary_search_by`](../primitive.slice.html#method.binary_search_by "method slice::binary_search_by"), and [`binary_search_by_key`](../primitive.slice.html#method.binary_search_by_key "method slice::binary_search_by_key").

##### [§](#examples-167)Examples

```
let v = [1, 2, 3, 3, 5, 6, 7];
let i = v.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(v[..i].iter().all(|&x| x < 5));
assert!(v[i..].iter().all(|&x| !(x < 5)));
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%5B1,+2,+3,+3,+5,+6,+7%5D;%0A++++let+i+=+v.partition_point\(%7C%26x%7C+x+%3C+5\);%0A++++%0A++++assert_eq!\(i,+4\);%0A++++assert!\(v%5B..i%5D.iter\(\).all\(%7C%26x%7C+x+%3C+5\)\);%0A++++assert!\(v%5Bi..%5D.iter\(\).all\(%7C%26x%7C+!\(x+%3C+5\)\)\);%0A%7D&edition=2024 "Run code")

If all elements of the slice match the predicate, including if the slice is empty, then the length of the slice will be returned:

```
let a = [2, 4, 8];
assert_eq!(a.partition_point(|x| x < &100), a.len());
let a: [i32; 0] = [];
assert_eq!(a.partition_point(|x| x < &100), 0);
```

%5D%0Afn+main\(\)+%7B%0A++++let+a+=+%5B2,+4,+8%5D;%0A++++assert_eq!\(a.partition_point\(%7Cx%7C+x+%3C+%26100\),+a.len\(\)\);%0A++++let+a:+%5Bi32;+0%5D+=+%5B%5D;%0A++++assert_eq!\(a.partition_point\(%7Cx%7C+x+%3C+%26100\),+0\);%0A%7D&edition=2024 "Run code")

If you want to insert an item to a sorted vector, while maintaining sort order:

```
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+s+=+vec!%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+55%5D;%0A++++let+num+=+42;%0A++++let+idx+=+s.partition_point\(%7C%26x%7C+x+%3C=+num\);%0A++++s.insert\(idx,+num\);%0A++++assert_eq!\(s,+%5B0,+1,+1,+1,+1,+2,+3,+5,+8,+13,+21,+34,+42,+55%5D\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#4906-4909)

#### pub fn [split\_off](#method.split_off-1)<'a, R>(self: &mut &'a [\[T\]](../primitive.slice.html), range: R) -> [Option](../option/enum.Option.html "enum std::option::Option")<&'a [\[T\]](../primitive.slice.html)\>

where R: [OneSidedRange](../ops/trait.OneSidedRange.html "trait std::ops::OneSidedRange")<[usize](../primitive.usize.html)\>,

Removes the subslice corresponding to the given range and returns a reference to it.

Returns `None` and does not modify the slice if the given range is out of bounds.

Note that this method only accepts one-sided ranges such as `2..` or `..6`, but not `2..6`.

##### [§](#examples-168)Examples

Splitting off the first three elements of a slice:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off(..3).unwrap();

assert_eq!(slice, &['d']);
assert_eq!(first_three, &['a', 'b', 'c']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26%5B_%5D+=+%26%5B'a',+'b',+'c',+'d'%5D;%0A++++let+mut+first_three+=+slice.split_off\(..3\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26%5B'd'%5D\);%0A++++assert_eq!\(first_three,+%26%5B'a',+'b',+'c'%5D\);%0A%7D&edition=2024 "Run code")

Splitting off a slice starting with the third element:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut tail = slice.split_off(2..).unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(tail, &['c', 'd']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26%5B_%5D+=+%26%5B'a',+'b',+'c',+'d'%5D;%0A++++let+mut+tail+=+slice.split_off\(2..\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26%5B'a',+'b'%5D\);%0A++++assert_eq!\(tail,+%26%5B'c',+'d'%5D\);%0A%7D&edition=2024 "Run code")

Getting `None` when `range` is out of bounds:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off(5..));
assert_eq!(None, slice.split_off(..5));
assert_eq!(None, slice.split_off(..=4));
let expected: &[char] = &['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off(..4));
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26%5B_%5D+=+%26%5B'a',+'b',+'c',+'d'%5D;%0A++++%0A++++assert_eq!\(None,+slice.split_off\(5..\)\);%0A++++assert_eq!\(None,+slice.split_off\(..5\)\);%0A++++assert_eq!\(None,+slice.split_off\(..=4\)\);%0A++++let+expected:+%26%5Bchar%5D+=+%26%5B'a',+'b',+'c',+'d'%5D;%0A++++assert_eq!\(Some\(expected\),+slice.split_off\(..4\)\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#4972-4975)

#### pub fn [split\_off\_mut](#method.split_off_mut)<'a, R>( self: &mut &'a mut [\[T\]](../primitive.slice.html), range: R, ) -> [Option](../option/enum.Option.html "enum std::option::Option")<&'a mut [\[T\]](../primitive.slice.html)\>

where R: [OneSidedRange](../ops/trait.OneSidedRange.html "trait std::ops::OneSidedRange")<[usize](../primitive.usize.html)\>,

Removes the subslice corresponding to the given range and returns a mutable reference to it.

Returns `None` and does not modify the slice if the given range is out of bounds.

Note that this method only accepts one-sided ranges such as `2..` or `..6`, but not `2..6`.

##### [§](#examples-169)Examples

Splitting off the first three elements of a slice:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off_mut(..3).unwrap();

assert_eq!(slice, &mut ['d']);
assert_eq!(first_three, &mut ['a', 'b', 'c']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c',+'d'%5D;%0A++++let+mut+first_three+=+slice.split_off_mut\(..3\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26mut+%5B'd'%5D\);%0A++++assert_eq!\(first_three,+%26mut+%5B'a',+'b',+'c'%5D\);%0A%7D&edition=2024 "Run code")

Splitting off a slice starting with the third element:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut tail = slice.split_off_mut(2..).unwrap();

assert_eq!(slice, &mut ['a', 'b']);
assert_eq!(tail, &mut ['c', 'd']);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c',+'d'%5D;%0A++++let+mut+tail+=+slice.split_off_mut\(2..\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26mut+%5B'a',+'b'%5D\);%0A++++assert_eq!\(tail,+%26mut+%5B'c',+'d'%5D\);%0A%7D&edition=2024 "Run code")

Getting `None` when `range` is out of bounds:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off_mut(5..));
assert_eq!(None, slice.split_off_mut(..5));
assert_eq!(None, slice.split_off_mut(..=4));
let expected: &mut [_] = &mut ['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off_mut(..4));
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c',+'d'%5D;%0A++++%0A++++assert_eq!\(None,+slice.split_off_mut\(5..\)\);%0A++++assert_eq!\(None,+slice.split_off_mut\(..5\)\);%0A++++assert_eq!\(None,+slice.split_off_mut\(..=4\)\);%0A++++let+expected:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c',+'d'%5D;%0A++++assert_eq!\(Some\(expected\),+slice.split_off_mut\(..4\)\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#5010)

#### pub fn [split\_off\_first](#method.split_off_first)<'a>(self: &mut &'a [\[T\]](../primitive.slice.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&'a T](../primitive.reference.html)\>

Removes the first element of the slice and returns a reference to it.

Returns `None` if the slice is empty.

##### [§](#examples-170)Examples

```
let mut slice: &[_] = &['a', 'b', 'c'];
let first = slice.split_off_first().unwrap();

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'a');
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26%5B_%5D+=+%26%5B'a',+'b',+'c'%5D;%0A++++let+first+=+slice.split_off_first\(\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26%5B'b',+'c'%5D\);%0A++++assert_eq!\(first,+%26'a'\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#5035)

#### pub fn [split\_off\_first\_mut](#method.split_off_first_mut)<'a>(self: &mut &'a mut [\[T\]](../primitive.slice.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&'a mut T](../primitive.reference.html)\>

Removes the first element of the slice and returns a mutable reference to it.

Returns `None` if the slice is empty.

##### [§](#examples-171)Examples

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let first = slice.split_off_first_mut().unwrap();
*first = 'd';

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'d');
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c'%5D;%0A++++let+first+=+slice.split_off_first_mut\(\).unwrap\(\);%0A++++*first+=+'d';%0A++++%0A++++assert_eq!\(slice,+%26%5B'b',+'c'%5D\);%0A++++assert_eq!\(first,+%26'd'\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#5060)

#### pub fn [split\_off\_last](#method.split_off_last)<'a>(self: &mut &'a [\[T\]](../primitive.slice.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&'a T](../primitive.reference.html)\>

Removes the last element of the slice and returns a reference to it.

Returns `None` if the slice is empty.

##### [§](#examples-172)Examples

```
let mut slice: &[_] = &['a', 'b', 'c'];
let last = slice.split_off_last().unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'c');
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26%5B_%5D+=+%26%5B'a',+'b',+'c'%5D;%0A++++let+last+=+slice.split_off_last\(\).unwrap\(\);%0A++++%0A++++assert_eq!\(slice,+%26%5B'a',+'b'%5D\);%0A++++assert_eq!\(last,+%26'c'\);%0A%7D&edition=2024 "Run code")

1.87.0 · [Source](../../src/core/slice/mod.rs.html#5085)

#### pub fn [split\_off\_last\_mut](#method.split_off_last_mut)<'a>(self: &mut &'a mut [\[T\]](../primitive.slice.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[&'a mut T](../primitive.reference.html)\>

Removes the last element of the slice and returns a mutable reference to it.

Returns `None` if the slice is empty.

##### [§](#examples-173)Examples

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let last = slice.split_off_last_mut().unwrap();
*last = 'd';

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'d');
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+slice:+%26mut+%5B_%5D+=+%26mut+%5B'a',+'b',+'c'%5D;%0A++++let+last+=+slice.split_off_last_mut\(\).unwrap\(\);%0A++++*last+=+'d';%0A++++%0A++++assert_eq!\(slice,+%26%5B'a',+'b'%5D\);%0A++++assert_eq!\(last,+%26'd'\);%0A%7D&edition=2024 "Run code")

1.86.0 · [Source](../../src/core/slice/mod.rs.html#5142-5147)

#### pub unsafe fn [get\_disjoint\_unchecked\_mut](#method.get_disjoint_unchecked_mut)<I, const N: [usize](../primitive.usize.html)\>( &mut self, indices: [\[I; N\]](../primitive.array.html), ) -> \[&mut <I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output"); [N](../primitive.array.html)\]

where I: [GetDisjointMutIndex](../../core/slice/trait.GetDisjointMutIndex.html "trait core::slice::GetDisjointMutIndex") + [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns mutable references to many indices at once, without doing any checks.

An index can be either a `usize`, a [`Range`](../ops/struct.Range.html "struct std::ops::Range") or a [`RangeInclusive`](../ops/struct.RangeInclusive.html "struct std::ops::RangeInclusive"). Note that this method takes an array, so all indices must be of the same type. If passed an array of `usize`s this method gives back an array of mutable references to single elements, while if passed an array of ranges it gives back an array of mutable references to slices.

For a safe alternative see [`get_disjoint_mut`](../primitive.slice.html#method.get_disjoint_mut "method slice::get_disjoint_mut").

##### [§](#safety-14)Safety

Calling this method with overlapping or out-of-bounds indices is _[undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html)_ even if the resulting references are not used.

##### [§](#examples-174)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+%26mut+%5B1,+2,+4%5D;%0A++++%0A++++unsafe+%7B%0A++++++++let+%5Ba,+b%5D+=+x.get_disjoint_unchecked_mut\(%5B0,+2%5D\);%0A++++++++*a+*=+10;%0A++++++++*b+*=+100;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B10,+2,+400%5D\);%0A++++%0A++++unsafe+%7B%0A++++++++let+%5Ba,+b%5D+=+x.get_disjoint_unchecked_mut\(%5B0..1,+1..3%5D\);%0A++++++++a%5B0%5D+=+8;%0A++++++++b%5B0%5D+=+88;%0A++++++++b%5B1%5D+=+888;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B8,+88,+888%5D\);%0A++++%0A++++unsafe+%7B%0A++++++++let+%5Ba,+b%5D+=+x.get_disjoint_unchecked_mut\(%5B1..=2,+0..=0%5D\);%0A++++++++a%5B0%5D+=+11;%0A++++++++a%5B1%5D+=+111;%0A++++++++b%5B0%5D+=+1;%0A++++%7D%0A++++assert_eq!\(x,+%26%5B1,+11,+111%5D\);%0A%7D&edition=2024 "Run code")

1.86.0 · [Source](../../src/core/slice/mod.rs.html#5209-5214)

#### pub fn [get\_disjoint\_mut](#method.get_disjoint_mut)<I, const N: [usize](../primitive.usize.html)\>( &mut self, indices: [\[I; N\]](../primitive.array.html), ) -> [Result](../result/enum.Result.html "enum std::result::Result")<\[&mut <I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output"); [N](../primitive.array.html)\], [GetDisjointMutError](../slice/enum.GetDisjointMutError.html "enum std::slice::GetDisjointMutError")\>

where I: [GetDisjointMutIndex](../../core/slice/trait.GetDisjointMutIndex.html "trait core::slice::GetDisjointMutIndex") + [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>,

Returns mutable references to many indices at once.

An index can be either a `usize`, a [`Range`](../ops/struct.Range.html "struct std::ops::Range") or a [`RangeInclusive`](../ops/struct.RangeInclusive.html "struct std::ops::RangeInclusive"). Note that this method takes an array, so all indices must be of the same type. If passed an array of `usize`s this method gives back an array of mutable references to single elements, while if passed an array of ranges it gives back an array of mutable references to slices.

Returns an error if any index is out-of-bounds, or if there are overlapping indices. An empty range is not considered to overlap if it is located at the beginning or at the end of another range, but is considered to overlap if it is located in the middle.

This method does a O(n^2) check to check that there are no overlapping indices, so be careful when passing many indices.

##### [§](#examples-175)Examples

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

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+%26mut+%5B1,+2,+3%5D;%0A++++if+let+Ok\(%5Ba,+b%5D\)+=+v.get_disjoint_mut\(%5B0,+2%5D\)+%7B%0A++++++++*a+=+413;%0A++++++++*b+=+612;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B413,+2,+612%5D\);%0A++++%0A++++if+let+Ok\(%5Ba,+b%5D\)+=+v.get_disjoint_mut\(%5B0..1,+1..3%5D\)+%7B%0A++++++++a%5B0%5D+=+8;%0A++++++++b%5B0%5D+=+88;%0A++++++++b%5B1%5D+=+888;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B8,+88,+888%5D\);%0A++++%0A++++if+let+Ok\(%5Ba,+b%5D\)+=+v.get_disjoint_mut\(%5B1..=2,+0..=0%5D\)+%7B%0A++++++++a%5B0%5D+=+11;%0A++++++++a%5B1%5D+=+111;%0A++++++++b%5B0%5D+=+1;%0A++++%7D%0A++++assert_eq!\(v,+%26%5B1,+11,+111%5D\);%0A%7D&edition=2024 "Run code")

1.94.0 · [Source](../../src/core/slice/mod.rs.html#5260)

#### pub fn [element\_offset](#method.element_offset)(&self, element: [&T](../primitive.reference.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[usize](../primitive.usize.html)\>

Returns the index that an element reference points to.

Returns `None` if `element` does not point to the start of an element within the slice.

This method is useful for extending slice iterators like [`slice::split`](../primitive.slice.html#method.split "method slice::split").

Note that this uses pointer arithmetic and **does not compare elements**. To find the index of an element via comparison, use [`.iter().position()`](../iter/trait.Iterator.html#method.position "method std::iter::Iterator::position") instead.

##### [§](#panics-54)Panics

Panics if `T` is zero-sized.

##### [§](#examples-176)Examples

Basic usage:

```
let nums: &[u32] = &[1, 7, 1, 1];
let num = &nums[2];

assert_eq!(num, &1);
assert_eq!(nums.element_offset(num), Some(2));
```

%5D%0Afn+main\(\)+%7B%0A++++let+nums:+%26%5Bu32%5D+=+%26%5B1,+7,+1,+1%5D;%0A++++let+num+=+%26nums%5B2%5D;%0A++++%0A++++assert_eq!\(num,+%261\);%0A++++assert_eq!\(nums.element_offset\(num\),+Some\(2\)\);%0A%7D&edition=2024 "Run code")

Returning `None` with an unaligned element:

```
let arr: &[[u32; 2]] = &[[0, 1], [2, 3]];
let flat_arr: &[u32] = arr.as_flattened();

let ok_elm: &[u32; 2] = flat_arr[0..2].try_into().unwrap();
let weird_elm: &[u32; 2] = flat_arr[1..3].try_into().unwrap();

assert_eq!(ok_elm, &[0, 1]);
assert_eq!(weird_elm, &[1, 2]);

assert_eq!(arr.element_offset(ok_elm), Some(0)); // Points to element 0
assert_eq!(arr.element_offset(weird_elm), None); // Points between element 0 and 1
```

%5D%0Afn+main\(\)+%7B%0A++++let+arr:+%26%5B%5Bu32;+2%5D%5D+=+%26%5B%5B0,+1%5D,+%5B2,+3%5D%5D;%0A++++let+flat_arr:+%26%5Bu32%5D+=+arr.as_flattened\(\);%0A++++%0A++++let+ok_elm:+%26%5Bu32;+2%5D+=+flat_arr%5B0..2%5D.try_into\(\).unwrap\(\);%0A++++let+weird_elm:+%26%5Bu32;+2%5D+=+flat_arr%5B1..3%5D.try_into\(\).unwrap\(\);%0A++++%0A++++assert_eq!\(ok_elm,+%26%5B0,+1%5D\);%0A++++assert_eq!\(weird_elm,+%26%5B1,+2%5D\);%0A++++%0A++++assert_eq!\(arr.element_offset\(ok_elm\),+Some\(0\)\);+//+Points+to+element+0%0A++++assert_eq!\(arr.element_offset\(weird_elm\),+None\);%0A%7D&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#5314)

#### pub fn [subslice\_range](#method.subslice_range)(&self, subslice: &[\[T\]](../primitive.slice.html)) -> [Option](../option/enum.Option.html "enum std::option::Option")<[Range](../ops/struct.Range.html "struct std::ops::Range")<[usize](../primitive.usize.html)\>>

🔬This is a nightly-only experimental API. (`substr_range` [#126769](https://github.com/rust-lang/rust/issues/126769))

Returns the range of indices that a subslice points to.

Returns `None` if `subslice` does not point within the slice or if it is not aligned with the elements in the slice.

This method **does not compare elements**. Instead, this method finds the location in the slice that `subslice` was obtained from. To find the index of a subslice via comparison, instead use [`.windows()`](../primitive.slice.html#method.windows "method slice::windows")[`.position()`](../iter/trait.Iterator.html#method.position "method std::iter::Iterator::position").

This method is useful for extending slice iterators like [`slice::split`](../primitive.slice.html#method.split "method slice::split").

Note that this may return a false positive (either `Some(0..0)` or `Some(self.len()..self.len())`) if `subslice` has a length of zero and points to the beginning or end of another, separate, slice.

##### [§](#panics-55)Panics

Panics if `T` is zero-sized.

##### [§](#examples-177)Examples

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

%5D%0A%23!%5Bfeature\(substr_range\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++let+nums+=+%26%5B0,+5,+10,+0,+0,+5%5D;%0A++++%0A++++let+mut+iter+=+nums%0A++++++++.split\(%7Ct%7C+*t+==+0\)%0A++++++++.map\(%7Cn%7C+nums.subslice_range\(n\).unwrap\(\)\);%0A++++%0A++++assert_eq!\(iter.next\(\),+Some\(0..0\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(1..3\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(4..4\)\);%0A++++assert_eq!\(iter.next\(\),+Some\(5..6\)\);%0A%7D&version=nightly&edition=2024 "Run code")

[Source](../../src/core/slice/mod.rs.html#5341)

#### pub fn [as\_slice](#method.as_slice-1)(&self) -> &[\[T\]](../primitive.slice.html)

🔬This is a nightly-only experimental API. (`str_as_str` [#130366](https://github.com/rust-lang/rust/issues/130366))

Returns the same slice `&[T]`.

This method is redundant when used directly on `&[T]`, but it helps dereferencing other “container” types to slices, for example `Box<[T]>` or `Arc<[T]>`.

[Source](../../src/core/slice/mod.rs.html#5352)

#### pub fn [as\_mut\_slice](#method.as_mut_slice-1)(&mut self) -> &mut [\[T\]](../primitive.slice.html)

🔬This is a nightly-only experimental API. (`str_as_str` [#130366](https://github.com/rust-lang/rust/issues/130366))

Returns the same slice `&mut [T]`.

This method is redundant when used directly on `&mut [T]`, but it helps dereferencing other “container” types to slices, for example `Box<[T]>` or `MutexGuard<[T]>`.

1.0.0 · [Source](../../src/alloc/slice.rs.html#131-133)

#### pub fn [sort](#method.sort)(&mut self)

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Sorts the slice in ascending order, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_n_ \* log(_n_)) worst-case.

If the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

When applicable, unstable sorting is preferred because it is generally faster than stable sorting and it doesn’t allocate auxiliary memory. See [`sort_unstable`](../primitive.slice.html#method.sort_unstable "method slice::sort_unstable"). The exception are partially sorted slices, which may be better served with `slice::sort`.

Sorting types that only implement [`PartialOrd`](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd") such as [`f32`](../primitive.f32.html "primitive f32") and [`f64`](../primitive.f64.html "primitive f64") require additional precautions. For example, `f32::NAN != f32::NAN`, which doesn’t fulfill the reflexivity requirement of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord"). By using an alternative comparison function with `slice::sort_by` such as [`f32::total_cmp`](../primitive.f32.html#method.total_cmp "method f32::total_cmp") or [`f64::total_cmp`](../primitive.f64.html#method.total_cmp "method f64::total_cmp") that defines a [total order](https://en.wikipedia.org/wiki/Total_order) users can sort slices containing floating-point values. Alternatively, if all values in the slice are guaranteed to be in a subset for which [`PartialOrd::partial_cmp`](../cmp/trait.PartialOrd.html#tymethod.partial_cmp "method std::cmp::PartialOrd::partial_cmp") forms a [total order](https://en.wikipedia.org/wiki/Total_order), it’s possible to sort the slice with `sort_by(|a, b| a.partial_cmp(b).unwrap())`.

##### [§](#current-implementation-6)Current implementation

The current implementation is based on [driftsort](https://github.com/Voultapher/driftsort) by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### [§](#panics-56)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `T` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### [§](#examples-178)Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++%0A++++v.sort\(\);%0A++++assert_eq!\(v,+%5B-5,+-3,+1,+2,+4%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/slice.rs.html#192-194)

#### pub fn [sort\_by](#method.sort_by)<F>(&mut self, compare: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html), [&T](../primitive.reference.html)) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering"),

Sorts the slice in ascending order with a comparison function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_n_ \* log(_n_)) worst-case.

If the comparison function `compare` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and examples see the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") documentation.

##### [§](#current-implementation-7)Current implementation

The current implementation is based on [driftsort](https://github.com/Voultapher/driftsort) by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### [§](#panics-57)Panics

May panic if `compare` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if `compare` itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### [§](#examples-179)Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

// reverse sorting
v.sort_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4,+-5,+1,+-3,+2%5D;%0A++++v.sort_by\(%7Ca,+b%7C+a.cmp\(b\)\);%0A++++assert_eq!\(v,+%5B-5,+-3,+1,+2,+4%5D\);%0A++++%0A++++//+reverse+sorting%0A++++v.sort_by\(%7Ca,+b%7C+b.cmp\(a\)\);%0A++++assert_eq!\(v,+%5B4,+2,+1,+-3,+-5%5D\);%0A%7D&edition=2024 "Run code")

1.7.0 · [Source](../../src/alloc/slice.rs.html#247-250)

#### pub fn [sort\_by\_key](#method.sort_by_key)<K, F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> K, K: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Sorts the slice in ascending order with a key extraction function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_m_ \* _n_ \* log(_n_)) worst-case, where the key function is _O_(_m_).

If the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

##### [§](#current-implementation-8)Current implementation

The current implementation is based on [driftsort](https://github.com/Voultapher/driftsort) by Orson Peters and Lukas Bergdoll, which combines the fast average case of quicksort with the fast worst case and partial run detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the expected time to sort the data is _O_(_n_ \* log(_k_)).

The auxiliary memory allocation behavior depends on the input length. Short slices are handled without allocation, medium sized slices allocate `self.len()` and beyond that it clamps at `self.len() / 2`.

##### [§](#panics-58)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation or the key-function `f` panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### [§](#examples-180)Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4i32,+-5,+1,+-3,+2%5D;%0A++++%0A++++v.sort_by_key\(%7Ck%7C+k.abs\(\)\);%0A++++assert_eq!\(v,+%5B1,+2,+-3,+4,+-5%5D\);%0A%7D&edition=2024 "Run code")

1.34.0 · [Source](../../src/alloc/slice.rs.html#312-315)

#### pub fn [sort\_by\_cached\_key](#method.sort_by_cached_key)<K, F>(&mut self, f: F)

where F: [FnMut](../ops/trait.FnMut.html "trait std::ops::FnMut")([&T](../primitive.reference.html)) -> K, K: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"),

Sorts the slice in ascending order with a key extraction function, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and _O_(_m_ \* _n_ + _n_ \* log(_n_)) worst-case, where the key function is _O_(_m_).

During sorting, the key function is called at most once per element, by using temporary storage to remember the results of key evaluation. The order of calls to the key function is unspecified and may change in future versions of the standard library.

If the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), the function may panic; even if the function exits normally, the resulting order of elements in the slice is unspecified. See also the note on panicking below.

For simple key functions (e.g., functions that are property accesses or basic operations), [`sort_by_key`](../primitive.slice.html#method.sort_by_key "method slice::sort_by_key") is likely to be faster.

##### [§](#current-implementation-9)Current implementation

The current implementation is based on [instruction-parallel-network sort](https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort) by Lukas Bergdoll, which combines the fast average case of randomized quicksort with the fast worst case of heapsort, while achieving linear time on fully sorted and reversed inputs. And _O_(_k_ \* log(_n_)) where _k_ is the number of distinct elements in the input. It leverages superscalar out-of-order execution capabilities commonly found in CPUs, to efficiently perform the operation.

In the worst case, the algorithm allocates temporary storage in a `Vec<(K, usize)>` the length of the slice.

##### [§](#panics-59)Panics

May panic if the implementation of [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") for `K` does not implement a [total order](https://en.wikipedia.org/wiki/Total_order), or if the [`Ord`](../cmp/trait.Ord.html "trait std::cmp::Ord") implementation panics.

All safe functions on slices preserve the invariant that even if the function panics, all original elements will remain in the slice and any possible modifications via interior mutability are observed in the input. This ensures that recovery code (for instance inside of a `Drop` or following a `catch_unwind`) will still have access to all the original elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able to dispose of all contained elements.

##### [§](#examples-181)Examples

```
let mut v = [4i32, -5, 1, -3, 2, 10];

// Strings are sorted by lexicographical order.
v.sort_by_cached_key(|k| k.to_string());
assert_eq!(v, [-3, -5, 1, 10, 2, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+%5B4i32,+-5,+1,+-3,+2,+10%5D;%0A++++%0A++++//+Strings+are+sorted+by+lexicographical+order.%0A++++v.sort_by_cached_key\(%7Ck%7C+k.to_string\(\)\);%0A++++assert_eq!\(v,+%5B-3,+-5,+1,+10,+2,+4%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/slice.rs.html#372-374)

#### pub fn [to\_vec](#method.to_vec)(&self) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

Copies `self` into a new `Vec`.

##### [§](#examples-182)Examples

```
let s = [10, 40, 30];
let x = s.to_vec();
// Here, `s` and `x` can be modified independently.
```

%5D%0Afn+main\(\)+%7B%0A++++let+s+=+%5B10,+40,+30%5D;%0A++++let+x+=+s.to_vec\(\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/slice.rs.html#396-398)

#### pub fn [to\_vec\_in](#method.to_vec_in)<A>(&self, alloc: A) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

🔬This is a nightly-only experimental API. (`allocator_api` [#32838](https://github.com/rust-lang/rust/issues/32838))

Copies `self` into a new `Vec` with an allocator.

##### [§](#examples-183)Examples

```
#![feature(allocator_api)]

use std::alloc::System;

let s = [10, 40, 30];
let x = s.to_vec_in(System);
// Here, `s` and `x` can be modified independently.
```

%5D%0A%23!%5Bfeature\(allocator_api\)%5D%0A%0A%0Afn+main\(\)+%7B%0A++++use+std::alloc::System;%0A++++%0A++++let+s+=+%5B10,+40,+30%5D;%0A++++let+x+=+s.to_vec_in\(System\);%0A%7D&version=nightly&edition=2024 "Run code")

1.40.0 · [Source](../../src/alloc/slice.rs.html#509-511)

#### pub fn [repeat](#method.repeat)(&self, n: [usize](../primitive.usize.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Copy](../marker/trait.Copy.html "trait std::marker::Copy"),

Creates a vector by copying a slice `n` times.

##### [§](#panics-60)Panics

This function will panic if the capacity would overflow.

##### [§](#examples-184)Examples

```
assert_eq!([1, 2].repeat(3), vec![1, 2, 1, 2, 1, 2]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(%5B1,+2%5D.repeat\(3\),+vec!%5B1,+2,+1,+2,+1,+2%5D\);%0A%7D&edition=2024 "Run code")

A panic upon overflow:

[ⓘ](# "This example panics")

```
// this will panic at runtime
b"0123456789abcdef".repeat(usize::MAX);
```

%5D%0Afn+main\(\)+%7B%0A++++//+this+will+panic+at+runtime%0A++++b%220123456789abcdef%22.repeat\(usize::MAX\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/slice.rs.html#577-579)

#### pub fn [concat](#method.concat)<Item>(&self) -> <[\[T\]](../primitive.slice.html) as [Concat](../slice/trait.Concat.html "trait std::slice::Concat")<Item>>::[Output](../slice/trait.Concat.html#associatedtype.Output "type std::slice::Concat::Output") [ⓘ](#)

where [\[T\]](../primitive.slice.html): [Concat](../slice/trait.Concat.html "trait std::slice::Concat")<Item>, Item: ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Flattens a slice of `T` into a single value `Self::Output`.

##### [§](#examples-185)Examples

```
assert_eq!(["hello", "world"].concat(), "helloworld");
assert_eq!([[1, 2], [3, 4]].concat(), [1, 2, 3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(%5B%22hello%22,+%22world%22%5D.concat\(\),+%22helloworld%22\);%0A++++assert_eq!\(%5B%5B1,+2%5D,+%5B3,+4%5D%5D.concat\(\),+%5B1,+2,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

1.3.0 · [Source](../../src/alloc/slice.rs.html#596-598)

#### pub fn [join](#method.join)<Separator>( &self, sep: Separator, ) -> <[\[T\]](../primitive.slice.html) as [Join](../slice/trait.Join.html "trait std::slice::Join")<Separator>>::[Output](../slice/trait.Join.html#associatedtype.Output "type std::slice::Join::Output") [ⓘ](#)

where [\[T\]](../primitive.slice.html): [Join](../slice/trait.Join.html "trait std::slice::Join")<Separator>,

Flattens a slice of `T` into a single value `Self::Output`, placing a given separator between each.

##### [§](#examples-186)Examples

```
assert_eq!(["hello", "world"].join(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].join(&0), [1, 2, 0, 3, 4]);
assert_eq!([[1, 2], [3, 4]].join(&[0, 0][..]), [1, 2, 0, 0, 3, 4]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(%5B%22hello%22,+%22world%22%5D.join\(%22+%22\),+%22hello+world%22\);%0A++++assert_eq!\(%5B%5B1,+2%5D,+%5B3,+4%5D%5D.join\(%260\),+%5B1,+2,+0,+3,+4%5D\);%0A++++assert_eq!\(%5B%5B1,+2%5D,+%5B3,+4%5D%5D.join\(%26%5B0,+0%5D%5B..%5D\),+%5B1,+2,+0,+0,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/slice.rs.html#616-618)

#### pub fn [connect](#method.connect)<Separator>( &self, sep: Separator, ) -> <[\[T\]](../primitive.slice.html) as [Join](../slice/trait.Join.html "trait std::slice::Join")<Separator>>::[Output](../slice/trait.Join.html#associatedtype.Output "type std::slice::Join::Output") [ⓘ](#)

where [\[T\]](../primitive.slice.html): [Join](../slice/trait.Join.html "trait std::slice::Join")<Separator>,

👎Deprecated since 1.3.0: renamed to join

Flattens a slice of `T` into a single value `Self::Output`, placing a given separator between each.

##### [§](#examples-187)Examples

```
assert_eq!(["hello", "world"].connect(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].connect(&0), [1, 2, 0, 3, 4]);
```

%5D%0A%23!%5Ballow\(deprecated\)%5D%0A%0Afn+main\(\)+%7B%0A++++assert_eq!\(%5B%22hello%22,+%22world%22%5D.connect\(%22+%22\),+%22hello+world%22\);%0A++++assert_eq!\(%5B%5B1,+2%5D,+%5B3,+4%5D%5D.connect\(%260\),+%5B1,+2,+0,+3,+4%5D\);%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/alloc/vec/mod.rs.html#4270)[§](#impl-AsMut%3C%5BT%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [AsMut](../convert/trait.AsMut.html "trait std::convert::AsMut")<[\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4271)[§](#method.as_mut-1)

#### fn [as\_mut](../convert/trait.AsMut.html#tymethod.as_mut)(&mut self) -> &mut [\[T\]](../primitive.slice.html)

Converts this type into a mutable reference of the (usually inferred) input type.

1.5.0 · [Source](../../src/alloc/vec/mod.rs.html#4256)[§](#impl-AsMut%3CVec%3CT,+A%3E%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [AsMut](../convert/trait.AsMut.html "trait std::convert::AsMut")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4257)[§](#method.as_mut)

#### fn [as\_mut](../convert/trait.AsMut.html#tymethod.as_mut)(&mut self) -> &mut [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Converts this type into a mutable reference of the (usually inferred) input type.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4263)[§](#impl-AsRef%3C%5BT%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [AsRef](../convert/trait.AsRef.html "trait std::convert::AsRef")<[\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4264)[§](#method.as_ref-1)

#### fn [as\_ref](../convert/trait.AsRef.html#tymethod.as_ref)(&self) -> &[\[T\]](../primitive.slice.html)

Converts this type into a shared reference of the (usually inferred) input type.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4249)[§](#impl-AsRef%3CVec%3CT,+A%3E%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [AsRef](../convert/trait.AsRef.html "trait std::convert::AsRef")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4250)[§](#method.as_ref)

#### fn [as\_ref](../convert/trait.AsRef.html#tymethod.as_ref)(&self) -> &[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Converts this type into a shared reference of the (usually inferred) input type.

1.0.0 · [Source](../../src/alloc/slice.rs.html#791)[§](#impl-Borrow%3C%5BT%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [Borrow](../borrow/trait.Borrow.html "trait std::borrow::Borrow")<[\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/slice.rs.html#792)[§](#method.borrow)

#### fn [borrow](../borrow/trait.Borrow.html#tymethod.borrow)(&self) -> &[\[T\]](../primitive.slice.html)

Immutably borrows from an owned value. [Read more](../borrow/trait.Borrow.html#tymethod.borrow)

1.0.0 · [Source](../../src/alloc/slice.rs.html#798)[§](#impl-BorrowMut%3C%5BT%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [BorrowMut](../borrow/trait.BorrowMut.html "trait std::borrow::BorrowMut")<[\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/slice.rs.html#799)[§](#method.borrow_mut)

#### fn [borrow\_mut](../borrow/trait.BorrowMut.html#tymethod.borrow_mut)(&mut self) -> &mut [\[T\]](../primitive.slice.html)

Mutably borrows from an owned value. [Read more](../borrow/trait.BorrowMut.html#tymethod.borrow_mut)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3746)[§](#impl-Clone-for-Vec%3CT,+A%3E)

### impl<T, A> [Clone](../clone/trait.Clone.html "trait std::clone::Clone") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator") + [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/mod.rs.html#3774)[§](#method.clone_from)

#### fn [clone\_from](../clone/trait.Clone.html#method.clone_from)(&mut self, source: &[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>)

Overwrites the contents of `self` with a clone of the contents of `source`.

This method is preferred over simply assigning `source.clone()` to `self`, as it avoids reallocation if possible. Additionally, if the element type `T` overrides `clone_from()`, this will reuse the resources of `self`’s elements as well.

##### [§](#examples-188)Examples

```
let x = vec![5, 6, 7];
let mut y = vec![8, 9, 10];
let yp: *const i32 = y.as_ptr();

y.clone_from(&x);

// The value is the same
assert_eq!(x, y);

// And no reallocation occurred
assert_eq!(yp, y.as_ptr());
```

%5D%0Afn+main\(\)+%7B%0A++++let+x+=+vec!%5B5,+6,+7%5D;%0A++++let+mut+y+=+vec!%5B8,+9,+10%5D;%0A++++let+yp:+*const+i32+=+y.as_ptr\(\);%0A++++%0A++++y.clone_from\(%26x\);%0A++++%0A++++//+The+value+is+the+same%0A++++assert_eq!\(x,+y\);%0A++++%0A++++//+And+no+reallocation+occurred%0A++++assert_eq!\(yp,+y.as_ptr\(\)\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3747)[§](#method.clone)

#### fn [clone](../clone/trait.Clone.html#tymethod.clone)(&self) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Returns a duplicate of the value. [Read more](../clone/trait.Clone.html#tymethod.clone)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4242)[§](#impl-Debug-for-Vec%3CT,+A%3E)

### impl<T, A> [Debug](../fmt/trait.Debug.html "trait std::fmt::Debug") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Debug](../fmt/trait.Debug.html "trait std::fmt::Debug"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4243)[§](#method.fmt)

#### fn [fmt](../fmt/trait.Debug.html#tymethod.fmt)(&self, f: &mut [Formatter](../fmt/struct.Formatter.html "struct std::fmt::Formatter")<'\_>) -> [Result](../result/enum.Result.html "enum std::result::Result")<[()](../primitive.unit.html), [Error](../fmt/struct.Error.html "struct std::fmt::Error")\>

Formats the value using the given formatter. [Read more](../fmt/trait.Debug.html#tymethod.fmt)

1.0.0 (const: [unstable](https://github.com/rust-lang/rust/issues/143894 "Tracking issue for const_default")) · [Source](../../src/alloc/vec/mod.rs.html#4232)[§](#impl-Default-for-Vec%3CT%3E)

### impl<T> [Default](../default/trait.Default.html "trait std::default::Default") for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

[Source](../../src/alloc/vec/mod.rs.html#4236)[§](#method.default)

#### fn [default](../default/trait.Default.html#tymethod.default)() -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Creates an empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3724)[§](#impl-Deref-for-Vec%3CT,+A%3E)

### impl<T, A> [Deref](../ops/trait.Deref.html "trait std::ops::Deref") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3725)[§](#associatedtype.Target)

#### type [Target](../ops/trait.Deref.html#associatedtype.Target) = [\[T\]](../primitive.slice.html)

The resulting type after dereferencing.

[Source](../../src/alloc/vec/mod.rs.html#3728)[§](#method.deref)

#### fn [deref](../ops/trait.Deref.html#tymethod.deref)(&self) -> &[\[T\]](../primitive.slice.html)

Dereferences the value.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3734)[§](#impl-DerefMut-for-Vec%3CT,+A%3E)

### impl<T, A> [DerefMut](../ops/trait.DerefMut.html "trait std::ops::DerefMut") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3736)[§](#method.deref_mut)

#### fn [deref\_mut](../ops/trait.DerefMut.html#tymethod.deref_mut)(&mut self) -> &mut [\[T\]](../primitive.slice.html)

Mutably dereferences the value.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4218)[§](#impl-Drop-for-Vec%3CT,+A%3E)

### impl<T, A> [Drop](../ops/trait.Drop.html "trait std::ops::Drop") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4219)[§](#method.drop)

#### fn [drop](../ops/trait.Drop.html#tymethod.drop)(&mut self)

Executes the destructor for this type. [Read more](../ops/trait.Drop.html#tymethod.drop)

1.2.0 · [Source](../../src/alloc/vec/mod.rs.html#4165)[§](#impl-Extend%3C%26T%3E-for-Vec%3CT,+A%3E)

### impl<'a, T, A> [Extend](../iter/trait.Extend.html "trait std::iter::Extend")<[&'a T](../primitive.reference.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Copy](../marker/trait.Copy.html "trait std::marker::Copy") + 'a, A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

Extend implementation that copies elements out of references before pushing them onto the Vec.

This implementation is specialized for slice iterators, where it uses [`copy_from_slice`](../primitive.slice.html#method.copy_from_slice "method slice::copy_from_slice") to append the entire slice at once.

[Source](../../src/alloc/vec/mod.rs.html#4166)[§](#method.extend-1)

#### fn [extend](../iter/trait.Extend.html#tymethod.extend)<I>(&mut self, iter: I)

where I: [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")<Item = [&'a T](../primitive.reference.html)\>,

Extends a collection with the contents of an iterator. [Read more](../iter/trait.Extend.html#tymethod.extend)

[Source](../../src/alloc/vec/mod.rs.html#4171)[§](#method.extend_one-1)

#### fn [extend\_one](../iter/trait.Extend.html#method.extend_one)(&mut self, \_: [&'a T](../primitive.reference.html))

🔬This is a nightly-only experimental API. (`extend_one` [#72631](https://github.com/rust-lang/rust/issues/72631))

Extends a collection with exactly one element.

[Source](../../src/alloc/vec/mod.rs.html#4176)[§](#method.extend_reserve-1)

#### fn [extend\_reserve](../iter/trait.Extend.html#method.extend_reserve)(&mut self, additional: [usize](../primitive.usize.html))

🔬This is a nightly-only experimental API. (`extend_one` [#72631](https://github.com/rust-lang/rust/issues/72631))

Reserves capacity in a collection for the given number of additional elements. [Read more](../iter/trait.Extend.html#method.extend_reserve)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3930)[§](#impl-Extend%3CT%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [Extend](../iter/trait.Extend.html "trait std::iter::Extend")<T> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3932)[§](#method.extend)

#### fn [extend](../iter/trait.Extend.html#tymethod.extend)<I>(&mut self, iter: I)

where I: [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")<Item = T>,

Extends a collection with the contents of an iterator. [Read more](../iter/trait.Extend.html#tymethod.extend)

[Source](../../src/alloc/vec/mod.rs.html#3937)[§](#method.extend_one)

#### fn [extend\_one](../iter/trait.Extend.html#method.extend_one)(&mut self, item: T)

🔬This is a nightly-only experimental API. (`extend_one` [#72631](https://github.com/rust-lang/rust/issues/72631))

Extends a collection with exactly one element.

[Source](../../src/alloc/vec/mod.rs.html#3942)[§](#method.extend_reserve)

#### fn [extend\_reserve](../iter/trait.Extend.html#method.extend_reserve)(&mut self, additional: [usize](../primitive.usize.html))

🔬This is a nightly-only experimental API. (`extend_one` [#72631](https://github.com/rust-lang/rust/issues/72631))

Reserves capacity in a collection for the given number of additional elements. [Read more](../iter/trait.Extend.html#method.extend_reserve)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4278)[§](#impl-From%3C%26%5BT%5D%3E-for-Vec%3CT%3E)

### impl<T> [From](../convert/trait.From.html "trait std::convert::From")<&[\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/mod.rs.html#4286)[§](#method.from-12)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: &[\[T\]](../primitive.slice.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### [§](#examples-191)Examples

```
assert_eq!(Vec::from(&[1, 2, 3][..]), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%26%5B1,+2,+3%5D%5B..%5D\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.74.0 · [Source](../../src/alloc/vec/mod.rs.html#4308)[§](#impl-From%3C%26%5BT;+N%5D%3E-for-Vec%3CT%3E)

### impl<T, const N: [usize](../primitive.usize.html)\> [From](../convert/trait.From.html "trait std::convert::From")<&[\[T; N\]](../primitive.array.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/mod.rs.html#4316)[§](#method.from-14)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: &[\[T; N\]](../primitive.array.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### [§](#examples-193)Examples

```
assert_eq!(Vec::from(&[1, 2, 3]), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%26%5B1,+2,+3%5D\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.28.0 · [Source](../../src/alloc/vec/cow.rs.html#44)[§](#impl-From%3C%26Vec%3CT%3E%3E-for-Cow%3C'a,+%5BT%5D%3E)

### impl<'a, T> [From](../convert/trait.From.html "trait std::convert::From")<&'a [Vec](struct.Vec.html "struct std::vec::Vec")<T>> for [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/cow.rs.html#51)[§](#method.from-11)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: &'a [Vec](struct.Vec.html "struct std::vec::Vec")<T>) -> [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>

Creates a [`Borrowed`](../borrow/enum.Cow.html#variant.Borrowed "variant std::borrow::Cow::Borrowed") variant of [`Cow`](../borrow/enum.Cow.html "enum std::borrow::Cow") from a reference to [`Vec`](struct.Vec.html "struct std::vec::Vec").

This conversion does not allocate or clone the data.

1.19.0 · [Source](../../src/alloc/vec/mod.rs.html#4293)[§](#impl-From%3C%26mut+%5BT%5D%3E-for-Vec%3CT%3E)

### impl<T> [From](../convert/trait.From.html "trait std::convert::From")<&mut [\[T\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/mod.rs.html#4301)[§](#method.from-13)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: &mut [\[T\]](../primitive.slice.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### [§](#examples-192)Examples

```
assert_eq!(Vec::from(&mut [1, 2, 3][..]), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%26mut+%5B1,+2,+3%5D%5B..%5D\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.74.0 · [Source](../../src/alloc/vec/mod.rs.html#4323)[§](#impl-From%3C%26mut+%5BT;+N%5D%3E-for-Vec%3CT%3E)

### impl<T, const N: [usize](../primitive.usize.html)\> [From](../convert/trait.From.html "trait std::convert::From")<&mut [\[T; N\]](../primitive.array.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/mod.rs.html#4331)[§](#method.from-15)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: &mut [\[T; N\]](../primitive.array.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Allocates a `Vec<T>` and fills it by cloning `s`’s items.

##### [§](#examples-194)Examples

```
assert_eq!(Vec::from(&mut [1, 2, 3]), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%26mut+%5B1,+2,+3%5D\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4423)[§](#impl-From%3C%26str%3E-for-Vec%3Cu8%3E)

### impl [From](../convert/trait.From.html "trait std::convert::From")<&[str](../primitive.str.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/vec/mod.rs.html#4431)[§](#method.from-20)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: &[str](../primitive.str.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\> [ⓘ](#)

Allocates a `Vec<u8>` and fills it with a UTF-8 string.

##### [§](#examples-199)Examples

```
assert_eq!(Vec::from("123"), vec![b'1', b'2', b'3']);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%22123%22\),+vec!%5Bb'1',+b'2',+b'3'%5D\);%0A%7D&edition=2024 "Run code")

1.44.0 · [Source](../../src/alloc/vec/mod.rs.html#4338)[§](#impl-From%3C%5BT;+N%5D%3E-for-Vec%3CT%3E)

### impl<T, const N: [usize](../primitive.usize.html)\> [From](../convert/trait.From.html "trait std::convert::From")<[\[T; N\]](../primitive.array.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

[Source](../../src/alloc/vec/mod.rs.html#4346)[§](#method.from-16)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: [\[T; N\]](../primitive.array.html)) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Allocates a `Vec<T>` and moves `s`’s items into it.

##### [§](#examples-195)Examples

```
assert_eq!(Vec::from([1, 2, 3]), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Vec::from\(%5B1,+2,+3%5D\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/alloc/collections/binary_heap/mod.rs.html#1949)[§](#impl-From%3CBinaryHeap%3CT,+A%3E%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[BinaryHeap](../collections/struct.BinaryHeap.html "struct std::collections::BinaryHeap")<T, A>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/collections/binary_heap/mod.rs.html#1954)[§](#method.from-2)

#### fn [from](../convert/trait.From.html#tymethod.from)(heap: [BinaryHeap](../collections/struct.BinaryHeap.html "struct std::collections::BinaryHeap")<T, A>) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Converts a `BinaryHeap<T>` into a `Vec<T>`.

This conversion requires no data movement or allocation, and has constant time complexity.

1.18.0 · [Source](../../src/alloc/vec/mod.rs.html#4377)[§](#impl-From%3CBox%3C%5BT%5D,+A%3E%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T\]](../primitive.slice.html), A>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4387)[§](#method.from-18)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: [Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T\]](../primitive.slice.html), A>) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Converts a boxed slice into a vector by transferring ownership of the existing heap allocation.

##### [§](#examples-197)Examples

```
let b: Box<[i32]> = vec![1, 2, 3].into_boxed_slice();
assert_eq!(Vec::from(b), vec![1, 2, 3]);
```

%5D%0Afn+main\(\)+%7B%0A++++let+b:+Box%3C%5Bi32%5D%3E+=+vec!%5B1,+2,+3%5D.into_boxed_slice\(\);%0A++++assert_eq!\(Vec::from\(b\),+vec!%5B1,+2,+3%5D\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/bstr.rs.html#214)[§](#impl-From%3CByteString%3E-for-Vec%3Cu8%3E)

### impl [From](../convert/trait.From.html "trait std::convert::From")<[ByteString](../bstr/struct.ByteString.html "struct std::bstr::ByteString")\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/bstr.rs.html#216)[§](#method.from)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: [ByteString](../bstr/struct.ByteString.html "struct std::bstr::ByteString")) -> [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\> [ⓘ](#)

Converts to this type from the input type.

1.7.0 · [Source](../../src/alloc/ffi/c_str.rs.html#727)[§](#impl-From%3CCString%3E-for-Vec%3Cu8%3E)

### impl [From](../convert/trait.From.html "trait std::convert::From")<[CString](../ffi/struct.CString.html "struct std::ffi::CString")\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/ffi/c_str.rs.html#732)[§](#method.from-5)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: [CString](../ffi/struct.CString.html "struct std::ffi::CString")) -> [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\> [ⓘ](#)

Converts a [`CString`](../ffi/struct.CString.html "struct std::ffi::CString") into a `[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html "primitive u8")>`.

The conversion consumes the [`CString`](../ffi/struct.CString.html "struct std::ffi::CString"), and removes the terminating NUL byte.

1.14.0 · [Source](../../src/alloc/vec/mod.rs.html#4352-4354)[§](#impl-From%3CCow%3C'a,+%5BT%5D%3E%3E-for-Vec%3CT%3E)

### impl<'a, T> [From](../convert/trait.From.html "trait std::convert::From")<[Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where [\[T\]](../primitive.slice.html): [ToOwned](../borrow/trait.ToOwned.html "trait std::borrow::ToOwned")<Owned = [Vec](struct.Vec.html "struct std::vec::Vec")<T>>,

[Source](../../src/alloc/vec/mod.rs.html#4370)[§](#method.from-17)

#### fn [from](../convert/trait.From.html#tymethod.from)(s: [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Converts a clone-on-write slice into a vector.

If `s` already owns a `Vec<T>`, it will be returned directly. If `s` is borrowing a slice, a new `Vec<T>` will be allocated and filled by cloning `s`’s items into it.

##### [§](#examples-196)Examples

```
let o: Cow<'_, [i32]> = Cow::Owned(vec![1, 2, 3]);
let b: Cow<'_, [i32]> = Cow::Borrowed(&[1, 2, 3]);
assert_eq!(Vec::from(o), Vec::from(b));
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::borrow::Cow;%0A++++let+o:+Cow%3C'_,+%5Bi32%5D%3E+=+Cow::Owned\(vec!%5B1,+2,+3%5D\);%0A++++let+b:+Cow%3C'_,+%5Bi32%5D%3E+=+Cow::Borrowed\(%26%5B1,+2,+3%5D\);%0A++++assert_eq!\(Vec::from\(o\),+Vec::from\(b\)\);%0A%7D&edition=2024 "Run code")

1.14.0 · [Source](../../src/alloc/string.rs.html#3304)[§](#impl-From%3CString%3E-for-Vec%3Cu8%3E)

### impl [From](../convert/trait.From.html "trait std::convert::From")<[String](../string/struct.String.html "struct std::string::String")\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/string.rs.html#3317)[§](#method.from-8)

#### fn [from](../convert/trait.From.html#tymethod.from)(string: [String](../string/struct.String.html "struct std::string::String")) -> [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\> [ⓘ](#)

Converts the given [`String`](../string/struct.String.html "struct std::string::String") to a vector [`Vec`](struct.Vec.html "struct std::vec::Vec") that holds values of type [`u8`](../primitive.u8.html "primitive u8").

##### [§](#examples-190)Examples

```
let s1 = String::from("hello world");
let v1 = Vec::from(s1);

for b in v1 {
    println!("{b}");
}
```

%5D%0Afn+main\(\)+%7B%0A++++let+s1+=+String::from\(%22hello+world%22\);%0A++++let+v1+=+Vec::from\(s1\);%0A++++%0A++++for+b+in+v1+%7B%0A++++++++println!\(%22%7Bb%7D%22\);%0A++++%7D%0A%7D&edition=2024 "Run code")

1.43.0 · [Source](../../src/alloc/ffi/c_str.rs.html#806)[§](#impl-From%3CVec%3CNonZero%3Cu8%3E%3E%3E-for-CString)

### impl [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<[NonZero](../num/struct.NonZero.html "struct std::num::NonZero")<[u8](../primitive.u8.html)\>>> for [CString](../ffi/struct.CString.html "struct std::ffi::CString")

[Source](../../src/alloc/ffi/c_str.rs.html#810)[§](#method.from-6)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: [Vec](struct.Vec.html "struct std::vec::Vec")<[NonZero](../num/struct.NonZero.html "struct std::num::NonZero")<[u8](../primitive.u8.html)\>>) -> [CString](../ffi/struct.CString.html "struct std::ffi::CString")

Converts a `[Vec](struct.Vec.html "struct std::vec::Vec")<[NonZero](../num/struct.NonZero.html "struct std::num::NonZero")<[u8](../primitive.u8.html "primitive u8")>>` into a [`CString`](../ffi/struct.CString.html "struct std::ffi::CString") without copying nor checking for inner nul bytes.

1.8.0 · [Source](../../src/alloc/vec/cow.rs.html#31)[§](#impl-From%3CVec%3CT%3E%3E-for-Cow%3C'a,+%5BT%5D%3E)

### impl<'a, T> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T>> for [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/cow.rs.html#38)[§](#method.from-10)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: [Vec](struct.Vec.html "struct std::vec::Vec")<T>) -> [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'a, [\[T\]](../primitive.slice.html)\>

Creates an [`Owned`](../borrow/enum.Cow.html#variant.Owned "variant std::borrow::Cow::Owned") variant of [`Cow`](../borrow/enum.Cow.html "enum std::borrow::Cow") from an owned instance of [`Vec`](struct.Vec.html "struct std::vec::Vec").

This conversion does not allocate or clone the data.

1.21.0 · [Source](../../src/alloc/sync.rs.html#4007)[§](#impl-From%3CVec%3CT,+A%3E%3E-for-Arc%3C%5BT%5D,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [Arc](../sync/struct.Arc.html "struct std::sync::Arc")<[\[T\]](../primitive.slice.html), A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator") + [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/sync.rs.html#4019)[§](#method.from-9)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [Arc](../sync/struct.Arc.html "struct std::sync::Arc")<[\[T\]](../primitive.slice.html), A>

Allocates a reference-counted slice and moves `v`’s items into it.

##### [§](#example-3)Example

```
let unique: Vec<i32> = vec![1, 2, 3];
let shared: Arc<[i32]> = Arc::from(unique);
assert_eq!(&[1, 2, 3], &shared[..]);
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::sync::Arc;%0A++++let+unique:+Vec%3Ci32%3E+=+vec!%5B1,+2,+3%5D;%0A++++let+shared:+Arc%3C%5Bi32%5D%3E+=+Arc::from\(unique\);%0A++++assert_eq!\(%26%5B1,+2,+3%5D,+%26shared%5B..%5D\);%0A%7D&edition=2024 "Run code")

1.5.0 · [Source](../../src/alloc/collections/binary_heap/mod.rs.html#1921)[§](#impl-From%3CVec%3CT,+A%3E%3E-for-BinaryHeap%3CT,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [BinaryHeap](../collections/struct.BinaryHeap.html "struct std::collections::BinaryHeap")<T, A>

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/collections/binary_heap/mod.rs.html#1925)[§](#method.from-1)

#### fn [from](../convert/trait.From.html#tymethod.from)(vec: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [BinaryHeap](../collections/struct.BinaryHeap.html "struct std::collections::BinaryHeap")<T, A>

Converts a `Vec<T>` into a `BinaryHeap<T>`.

This conversion happens in-place, and has _O_(_n_) time complexity.

1.20.0 · [Source](../../src/alloc/vec/mod.rs.html#4395)[§](#impl-From%3CVec%3CT,+A%3E%3E-for-Box%3C%5BT%5D,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T\]](../primitive.slice.html), A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4416)[§](#method.from-19)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T\]](../primitive.slice.html), A>

Converts a vector into a boxed slice.

Before doing the conversion, this method discards excess capacity like [`Vec::shrink_to_fit`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit").

##### [§](#examples-198)Examples

```
assert_eq!(Box::from(vec![1, 2, 3]), vec![1, 2, 3].into_boxed_slice());
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(Box::from\(vec!%5B1,+2,+3%5D\),+vec!%5B1,+2,+3%5D.into_boxed_slice\(\)\);%0A%7D&edition=2024 "Run code")

Any excess capacity is removed:

```
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);

assert_eq!(Box::from(vec), vec![1, 2, 3].into_boxed_slice());
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+vec+=+Vec::with_capacity\(10\);%0A++++vec.extend\(%5B1,+2,+3%5D\);%0A++++%0A++++assert_eq!\(Box::from\(vec\),+vec!%5B1,+2,+3%5D.into_boxed_slice\(\)\);%0A%7D&edition=2024 "Run code")

1.21.0 · [Source](../../src/alloc/rc.rs.html#2973)[§](#impl-From%3CVec%3CT,+A%3E%3E-for-Rc%3C%5BT%5D,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [Rc](../rc/struct.Rc.html "struct std::rc::Rc")<[\[T\]](../primitive.slice.html), A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/rc.rs.html#2985)[§](#method.from-7)

#### fn [from](../convert/trait.From.html#tymethod.from)(v: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [Rc](../rc/struct.Rc.html "struct std::rc::Rc")<[\[T\]](../primitive.slice.html), A>

Allocates a reference-counted slice and moves `v`’s items into it.

##### [§](#example-2)Example

```
let unique: Vec<i32> = vec![1, 2, 3];
let shared: Rc<[i32]> = Rc::from(unique);
assert_eq!(&[1, 2, 3], &shared[..]);
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::rc::Rc;%0A++++let+unique:+Vec%3Ci32%3E+=+vec!%5B1,+2,+3%5D;%0A++++let+shared:+Rc%3C%5Bi32%5D%3E+=+Rc::from\(unique\);%0A++++assert_eq!\(%26%5B1,+2,+3%5D,+%26shared%5B..%5D\);%0A%7D&edition=2024 "Run code")

1.10.0 · [Source](../../src/alloc/collections/vec_deque/mod.rs.html#3736)[§](#impl-From%3CVec%3CT,+A%3E%3E-for-VecDeque%3CT,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [VecDeque](../collections/struct.VecDeque.html "struct std::collections::VecDeque")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/collections/vec_deque/mod.rs.html#3746)[§](#method.from-3)

#### fn [from](../convert/trait.From.html#tymethod.from)(other: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [VecDeque](../collections/struct.VecDeque.html "struct std::collections::VecDeque")<T, A>

Turn a [`Vec<T>`](struct.Vec.html "struct std::vec::Vec") into a [`VecDeque<T>`](../collections/struct.VecDeque.html "struct std::collections::VecDeque").

This conversion is guaranteed to run in _O_(1) time and to not re-allocate the `Vec`’s buffer or allocate any additional memory.

1.10.0 · [Source](../../src/alloc/collections/vec_deque/mod.rs.html#3753)[§](#impl-From%3CVecDeque%3CT,+A%3E%3E-for-Vec%3CT,+A%3E)

### impl<T, A> [From](../convert/trait.From.html "trait std::convert::From")<[VecDeque](../collections/struct.VecDeque.html "struct std::collections::VecDeque")<T, A>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/collections/vec_deque/mod.rs.html#3783)[§](#method.from-4)

#### fn [from](../convert/trait.From.html#tymethod.from)(other: [VecDeque](../collections/struct.VecDeque.html "struct std::collections::VecDeque")<T, A>) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

Turn a [`VecDeque<T>`](../collections/struct.VecDeque.html "struct std::collections::VecDeque") into a [`Vec<T>`](struct.Vec.html "struct std::vec::Vec").

This never needs to re-allocate, but does need to do _O_(_n_) data movement if the circular buffer doesn’t happen to be at the beginning of the allocation.

##### [§](#examples-189)Examples

```
use std::collections::VecDeque;

// This one is *O*(1).
let deque: VecDeque<_> = (1..5).collect();
let ptr = deque.as_slices().0.as_ptr();
let vec = Vec::from(deque);
assert_eq!(vec, [1, 2, 3, 4]);
assert_eq!(vec.as_ptr(), ptr);

// This one needs data rearranging.
let mut deque: VecDeque<_> = (1..5).collect();
deque.push_front(9);
deque.push_front(8);
let ptr = deque.as_slices().1.as_ptr();
let vec = Vec::from(deque);
assert_eq!(vec, [8, 9, 1, 2, 3, 4]);
assert_eq!(vec.as_ptr(), ptr);
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::collections::VecDeque;%0A++++%0A++++//+This+one+is+*O*\(1\).%0A++++let+deque:+VecDeque%3C_%3E+=+\(1..5\).collect\(\);%0A++++let+ptr+=+deque.as_slices\(\).0.as_ptr\(\);%0A++++let+vec+=+Vec::from\(deque\);%0A++++assert_eq!\(vec,+%5B1,+2,+3,+4%5D\);%0A++++assert_eq!\(vec.as_ptr\(\),+ptr\);%0A++++%0A++++//+This+one+needs+data+rearranging.%0A++++let+mut+deque:+VecDeque%3C_%3E+=+\(1..5\).collect\(\);%0A++++deque.push_front\(9\);%0A++++deque.push_front\(8\);%0A++++let+ptr+=+deque.as_slices\(\).1.as_ptr\(\);%0A++++let+vec+=+Vec::from\(deque\);%0A++++assert_eq!\(vec,+%5B8,+9,+1,+2,+3,+4%5D\);%0A++++assert_eq!\(vec.as_ptr\(\),+ptr\);%0A%7D&edition=2024 "Run code")

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3862)[§](#impl-FromIterator%3CT%3E-for-Vec%3CT%3E)

### impl<T> [FromIterator](../iter/trait.FromIterator.html "trait std::iter::FromIterator")<T> for [Vec](struct.Vec.html "struct std::vec::Vec")<T>

Collects an iterator into a Vec, commonly called via [`Iterator::collect()`](../iter/trait.Iterator.html#method.collect "method std::iter::Iterator::collect")

#### [§](#allocation-behavior)Allocation behavior

In general `Vec` does not guarantee any particular growth or allocation strategy. That also applies to this trait impl.

**Note:** This section covers implementation details and is therefore exempt from stability guarantees.

Vec may use any or none of the following strategies, depending on the supplied iterator:

* preallocate based on [`Iterator::size_hint()`](../iter/trait.Iterator.html#method.size_hint "method std::iter::Iterator::size_hint")
    * and panic if the number of items is outside the provided lower/upper bounds
* use an amortized growth strategy similar to `pushing` one item at a time
* perform the iteration in-place on the original allocation backing the iterator

The last case warrants some attention. It is an optimization that in many cases reduces peak memory consumption and improves cache locality. But when big, short-lived allocations are created, only a small fraction of their items get collected, no further use is made of the spare capacity and the resulting `Vec` is moved into a longer-lived structure, then this can lead to the large allocations having their lifetimes unnecessarily extended which can result in increased memory footprint.

In cases where this is an issue, the excess capacity can be discarded with [`Vec::shrink_to()`](struct.Vec.html#method.shrink_to "method std::vec::Vec::shrink_to"), [`Vec::shrink_to_fit()`](struct.Vec.html#method.shrink_to_fit "method std::vec::Vec::shrink_to_fit") or by collecting into [`Box<[T]>`](../boxed/struct.Box.html "struct std::boxed::Box") instead, which additionally reduces the size of the long-lived struct.

```
static LONG_LIVED: Mutex<Vec<Vec<u16>>> = Mutex::new(Vec::new());

for i in 0..10 {
    let big_temporary: Vec<u16> = (0..1024).collect();
    // discard most items
    let mut result: Vec<_> = big_temporary.into_iter().filter(|i| i % 100 == 0).collect();
    // without this a lot of unused capacity might be moved into the global
    result.shrink_to_fit();
    LONG_LIVED.lock().unwrap().push(result);
}
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::sync::Mutex;%0A++++static+LONG_LIVED:+Mutex%3CVec%3CVec%3Cu16%3E%3E%3E+=+Mutex::new\(Vec::new\(\)\);%0A++++%0A++++for+i+in+0..10+%7B%0A++++++++let+big_temporary:+Vec%3Cu16%3E+=+\(0..1024\).collect\(\);%0A++++++++//+discard+most+items%0A++++++++let+mut+result:+Vec%3C_%3E+=+big_temporary.into_iter\(\).filter\(%7Ci%7C+i+%25+100+==+0\).collect\(\);%0A++++++++//+without+this+a+lot+of+unused+capacity+might+be+moved+into+the+global%0A++++++++result.shrink_to_fit\(\);%0A++++++++LONG_LIVED.lock\(\).unwrap\(\).push\(result\);%0A++++%7D%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3864)[§](#method.from_iter)

#### fn [from\_iter](../iter/trait.FromIterator.html#tymethod.from_iter)<I>(iter: I) -> [Vec](struct.Vec.html "struct std::vec::Vec")<T>

where I: [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")<Item = T>,

Creates a value from an iterator. [Read more](../iter/trait.FromIterator.html#tymethod.from_iter)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3791)[§](#impl-Hash-for-Vec%3CT,+A%3E)

### impl<T, A> [Hash](../hash/trait.Hash.html "trait std::hash::Hash") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Hash](../hash/trait.Hash.html "trait std::hash::Hash"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

The hash of a vector is the same as that of the corresponding slice, as required by the `core::borrow::Borrow` implementation.

```
use std::hash::BuildHasher;

let b = std::hash::RandomState::new();
let v: Vec<u8> = vec![0xa8, 0x3c, 0x09];
let s: &[u8] = &[0xa8, 0x3c, 0x09];
assert_eq!(b.hash_one(v), b.hash_one(s));
```

%5D%0Afn+main\(\)+%7B%0A++++use+std::hash::BuildHasher;%0A++++%0A++++let+b+=+std::hash::RandomState::new\(\);%0A++++let+v:+Vec%3Cu8%3E+=+vec!%5B0xa8,+0x3c,+0x09%5D;%0A++++let+s:+%26%5Bu8%5D+=+%26%5B0xa8,+0x3c,+0x09%5D;%0A++++assert_eq!\(b.hash_one\(v\),+b.hash_one\(s\)\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3793)[§](#method.hash)

#### fn [hash](../hash/trait.Hash.html#tymethod.hash)<H>(&self, state: [&mut H](../primitive.reference.html))

where H: [Hasher](../hash/trait.Hasher.html "trait std::hash::Hasher"),

Feeds this value into the given [`Hasher`](../hash/trait.Hasher.html "trait std::hash::Hasher"). [Read more](../hash/trait.Hash.html#tymethod.hash)

1.3.0 · [Source](../../src/core/hash/mod.rs.html#234-236)[§](#method.hash_slice)

#### fn [hash\_slice](../hash/trait.Hash.html#method.hash_slice)<H>(data: &\[Self\], state: [&mut H](../primitive.reference.html))

where H: [Hasher](../hash/trait.Hasher.html "trait std::hash::Hasher"), Self: [Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Feeds a slice of this type into the given [`Hasher`](../hash/trait.Hasher.html "trait std::hash::Hasher"). [Read more](../hash/trait.Hash.html#method.hash_slice)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3799)[§](#impl-Index%3CI%3E-for-Vec%3CT,+A%3E)

### impl<T, I, A> [Index](../ops/trait.Index.html "trait std::ops::Index")<I> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>, A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3800)[§](#associatedtype.Output)

#### type [Output](../ops/trait.Index.html#associatedtype.Output) = <I as [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>>::[Output](../slice/trait.SliceIndex.html#associatedtype.Output "type std::slice::SliceIndex::Output")

The returned type after indexing.

[Source](../../src/alloc/vec/mod.rs.html#3803)[§](#method.index)

#### fn [index](../ops/trait.Index.html#tymethod.index)(&self, index: I) -> &<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A> as [Index](../ops/trait.Index.html "trait std::ops::Index")<I>>::[Output](../ops/trait.Index.html#associatedtype.Output "type std::ops::Index::Output") [ⓘ](#)

Performs the indexing (`container[index]`) operation. [Read more](../ops/trait.Index.html#tymethod.index)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3809)[§](#impl-IndexMut%3CI%3E-for-Vec%3CT,+A%3E)

### impl<T, I, A> [IndexMut](../ops/trait.IndexMut.html "trait std::ops::IndexMut")<I> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where I: [SliceIndex](../slice/trait.SliceIndex.html "trait std::slice::SliceIndex")<[\[T\]](../primitive.slice.html)\>, A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3811)[§](#method.index_mut)

#### fn [index\_mut](../ops/trait.IndexMut.html#tymethod.index_mut)(&mut self, index: I) -> &mut <[Vec](struct.Vec.html "struct std::vec::Vec")<T, A> as [Index](../ops/trait.Index.html "trait std::ops::Index")<I>>::[Output](../ops/trait.Index.html#associatedtype.Output "type std::ops::Index::Output") [ⓘ](#)

Performs the mutable indexing (`container[index]`) operation. [Read more](../ops/trait.IndexMut.html#tymethod.index_mut)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3909)[§](#impl-IntoIterator-for-%26Vec%3CT,+A%3E)

### impl<'a, T, A> [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator") for &'a [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3910)[§](#associatedtype.Item-1)

#### type [Item](../iter/trait.IntoIterator.html#associatedtype.Item) = [&'a T](../primitive.reference.html)

The type of the elements being iterated over.

[Source](../../src/alloc/vec/mod.rs.html#3911)[§](#associatedtype.IntoIter-1)

#### type [IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter) = [Iter](../slice/struct.Iter.html "struct std::slice::Iter")<'a, T>

Which kind of iterator are we turning this into?

[Source](../../src/alloc/vec/mod.rs.html#3913)[§](#method.into_iter-1)

#### fn [into\_iter](../iter/trait.IntoIterator.html#tymethod.into_iter)(self) -> <&'a [Vec](struct.Vec.html "struct std::vec::Vec")<T, A> as [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")\>::[IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter "type std::iter::IntoIterator::IntoIter") [ⓘ](#)

Creates an iterator from a value. [Read more](../iter/trait.IntoIterator.html#tymethod.into_iter)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3919)[§](#impl-IntoIterator-for-%26mut+Vec%3CT,+A%3E)

### impl<'a, T, A> [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator") for &'a mut [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3920)[§](#associatedtype.Item-2)

#### type [Item](../iter/trait.IntoIterator.html#associatedtype.Item) = [&'a mut T](../primitive.reference.html)

The type of the elements being iterated over.

[Source](../../src/alloc/vec/mod.rs.html#3921)[§](#associatedtype.IntoIter-2)

#### type [IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter) = [IterMut](../slice/struct.IterMut.html "struct std::slice::IterMut")<'a, T>

Which kind of iterator are we turning this into?

[Source](../../src/alloc/vec/mod.rs.html#3923)[§](#method.into_iter-2)

#### fn [into\_iter](../iter/trait.IntoIterator.html#tymethod.into_iter)(self) -> <&'a mut [Vec](struct.Vec.html "struct std::vec::Vec")<T, A> as [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")\>::[IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter "type std::iter::IntoIterator::IntoIter") [ⓘ](#)

Creates an iterator from a value. [Read more](../iter/trait.IntoIterator.html#tymethod.into_iter)

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#3870)[§](#impl-IntoIterator-for-Vec%3CT,+A%3E)

### impl<T, A> [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#3891)[§](#method.into_iter)

#### fn [into\_iter](../iter/trait.IntoIterator.html#tymethod.into_iter)(self) -> <[Vec](struct.Vec.html "struct std::vec::Vec")<T, A> as [IntoIterator](../iter/trait.IntoIterator.html "trait std::iter::IntoIterator")\>::[IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter "type std::iter::IntoIterator::IntoIter") [ⓘ](#)

Creates a consuming iterator, that is, one that moves each value out of the vector (from start to end). The vector cannot be used after calling this.

##### [§](#examples-203)Examples

```
let v = vec!["a".to_string(), "b".to_string()];
let mut v_iter = v.into_iter();

let first_element: Option<String> = v_iter.next();

assert_eq!(first_element, Some("a".to_string()));
assert_eq!(v_iter.next(), Some("b".to_string()));
assert_eq!(v_iter.next(), None);
```

%5D%0Afn+main\(\)+%7B%0A++++let+v+=+vec!%5B%22a%22.to_string\(\),+%22b%22.to_string\(\)%5D;%0A++++let+mut+v_iter+=+v.into_iter\(\);%0A++++%0A++++let+first_element:+Option%3CString%3E+=+v_iter.next\(\);%0A++++%0A++++assert_eq!\(first_element,+Some\(%22a%22.to_string\(\)\)\);%0A++++assert_eq!\(v_iter.next\(\),+Some\(%22b%22.to_string\(\)\)\);%0A++++assert_eq!\(v_iter.next\(\),+None\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#3871)[§](#associatedtype.Item)

#### type [Item](../iter/trait.IntoIterator.html#associatedtype.Item) = T

The type of the elements being iterated over.

[Source](../../src/alloc/vec/mod.rs.html#3872)[§](#associatedtype.IntoIter)

#### type [IntoIter](../iter/trait.IntoIterator.html#associatedtype.IntoIter) = [IntoIter](struct.IntoIter.html "struct std::vec::IntoIter")<T, A>

Which kind of iterator are we turning this into?

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4210)[§](#impl-Ord-for-Vec%3CT,+A%3E)

### impl<T, A> [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Ord](../cmp/trait.Ord.html "trait std::cmp::Ord"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

Implements ordering of vectors, [lexicographically](../cmp/trait.Ord.html#lexicographical-comparison "trait std::cmp::Ord").

[Source](../../src/alloc/vec/mod.rs.html#4212)[§](#method.cmp)

#### fn [cmp](../cmp/trait.Ord.html#tymethod.cmp)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering")

This method returns an [`Ordering`](../cmp/enum.Ordering.html "enum std::cmp::Ordering") between `self` and `other`. [Read more](../cmp/trait.Ord.html#tymethod.cmp)

1.21.0 · [Source](../../src/core/cmp.rs.html#1033-1035)[§](#method.max)

#### fn [max](../cmp/trait.Ord.html#method.max)(self, other: Self) -> Self

where Self: [Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Compares and returns the maximum of two values. [Read more](../cmp/trait.Ord.html#method.max)

1.21.0 · [Source](../../src/core/cmp.rs.html#1072-1074)[§](#method.min)

#### fn [min](../cmp/trait.Ord.html#method.min)(self, other: Self) -> Self

where Self: [Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Compares and returns the minimum of two values. [Read more](../cmp/trait.Ord.html#method.min)

1.50.0 · [Source](../../src/core/cmp.rs.html#1098-1100)[§](#method.clamp)

#### fn [clamp](../cmp/trait.Ord.html#method.clamp)(self, min: Self, max: Self) -> Self

where Self: [Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Restrict a value to a certain interval. [Read more](../cmp/trait.Ord.html#method.clamp)

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#23)[§](#impl-PartialEq%3C%26%5BU%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<&[\[U\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#23)[§](#method.eq-6)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &&[\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#23)[§](#method.ne-6)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &&[\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#36)[§](#impl-PartialEq%3C%26%5BU;+N%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, U, A, const N: [usize](../primitive.usize.html)\> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<&[\[U; N\]](../primitive.array.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#36)[§](#method.eq-14)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &&[\[U; N\]](../primitive.array.html)) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#36)[§](#method.ne-14)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &&[\[U; N\]](../primitive.array.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#24)[§](#impl-PartialEq%3C%26mut+%5BU%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<&mut [\[U\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#24)[§](#method.eq-7)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &&mut [\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#24)[§](#method.ne-7)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &&mut [\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.48.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#27)[§](#impl-PartialEq%3C%5BU%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[\[U\]](../primitive.slice.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#27)[§](#method.eq-10)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#27)[§](#method.ne-10)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[\[U\]](../primitive.slice.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#35)[§](#impl-PartialEq%3C%5BU;+N%5D%3E-for-Vec%3CT,+A%3E)

### impl<T, U, A, const N: [usize](../primitive.usize.html)\> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[\[U; N\]](../primitive.array.html)\> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#35)[§](#method.eq-13)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[\[U; N\]](../primitive.array.html)) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#35)[§](#method.ne-13)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[\[U; N\]](../primitive.array.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

[Source](../../src/alloc/bstr.rs.html#663)[§](#impl-PartialEq%3CByteStr%3E-for-Vec%3Cu8%3E)

### impl [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[ByteStr](../bstr/struct.ByteStr.html "struct std::bstr::ByteStr")\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/bstr.rs.html#663)[§](#method.eq-3)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[ByteStr](../bstr/struct.ByteStr.html "struct std::bstr::ByteStr")) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · [Source](../../src/core/cmp.rs.html#264)[§](#method.ne-3)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

[Source](../../src/alloc/bstr.rs.html#519)[§](#impl-PartialEq%3CByteString%3E-for-Vec%3Cu8%3E)

### impl [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[ByteString](../bstr/struct.ByteString.html "struct std::bstr::ByteString")\> for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>

[Source](../../src/alloc/bstr.rs.html#519)[§](#method.eq-1)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[ByteString](../bstr/struct.ByteString.html "struct std::bstr::ByteString")) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · [Source](../../src/core/cmp.rs.html#264)[§](#method.ne-1)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.46.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#25)[§](#impl-PartialEq%3CVec%3CU,+A%3E%3E-for-%26%5BT%5D)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>> for &[\[T\]](../primitive.slice.html)

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#25)[§](#method.eq-8)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#25)[§](#method.ne-8)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.46.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#26)[§](#impl-PartialEq%3CVec%3CU,+A%3E%3E-for-%26mut+%5BT%5D)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>> for &mut [\[T\]](../primitive.slice.html)

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#26)[§](#method.eq-9)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#26)[§](#method.ne-9)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.48.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#28)[§](#impl-PartialEq%3CVec%3CU,+A%3E%3E-for-%5BT%5D)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>> for [\[T\]](../primitive.slice.html)

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#28)[§](#method.eq-11)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#28)[§](#method.ne-11)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#30)[§](#impl-PartialEq%3CVec%3CU,+A%3E%3E-for-Cow%3C'_,+%5BT%5D%3E)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>> for [Cow](../borrow/enum.Cow.html "enum std::borrow::Cow")<'\_, [\[T\]](../primitive.slice.html)\>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U> + [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/vec/partial_eq.rs.html#30)[§](#method.eq-12)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#30)[§](#method.ne-12)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.17.0 · [Source](../../src/alloc/collections/vec_deque/mod.rs.html#3585)[§](#impl-PartialEq%3CVec%3CU,+A%3E%3E-for-VecDeque%3CT,+A%3E)

### impl<T, U, A> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>> for [VecDeque](../collections/struct.VecDeque.html "struct std::collections::VecDeque")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/collections/vec_deque/mod.rs.html#3585)[§](#method.eq-4)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · [Source](../../src/core/cmp.rs.html#264)[§](#method.ne-4)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/partial_eq.rs.html#22)[§](#impl-PartialEq%3CVec%3CU,+A2%3E%3E-for-Vec%3CT,+A1%3E)

### impl<T, U, A1, A2> [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<U, A2>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A1>

where A1: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), A2: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), T: [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<U>,

[Source](../../src/alloc/vec/partial_eq.rs.html#22)[§](#method.eq-5)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A2>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

[Source](../../src/alloc/vec/partial_eq.rs.html#22)[§](#method.ne-5)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<U, A2>) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

[Source](../../src/alloc/bstr.rs.html#663)[§](#impl-PartialEq%3CVec%3Cu8%3E%3E-for-ByteStr)

### impl [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>> for [ByteStr](../bstr/struct.ByteStr.html "struct std::bstr::ByteStr")

[Source](../../src/alloc/bstr.rs.html#663)[§](#method.eq-2)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · [Source](../../src/core/cmp.rs.html#264)[§](#method.ne-2)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

[Source](../../src/alloc/bstr.rs.html#519)[§](#impl-PartialEq%3CVec%3Cu8%3E%3E-for-ByteString)

### impl [PartialEq](../cmp/trait.PartialEq.html "trait std::cmp::PartialEq")<[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>> for [ByteString](../bstr/struct.ByteString.html "struct std::bstr::ByteString")

[Source](../../src/alloc/bstr.rs.html#519)[§](#method.eq)

#### fn [eq](../cmp/trait.PartialEq.html#tymethod.eq)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>) -> [bool](../primitive.bool.html)

Tests for `self` and `other` values to be equal, and is used by `==`.

1.0.0 · [Source](../../src/core/cmp.rs.html#264)[§](#method.ne)

#### fn [ne](../cmp/trait.PartialEq.html#method.ne)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4193-4197)[§](#impl-PartialOrd%3CVec%3CT,+A2%3E%3E-for-Vec%3CT,+A1%3E)

### impl<T, A1, A2> [PartialOrd](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A2>> for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A1>

where T: [PartialOrd](../cmp/trait.PartialOrd.html "trait std::cmp::PartialOrd"), A1: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"), A2: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

Implements comparison of vectors, [lexicographically](../cmp/trait.Ord.html#lexicographical-comparison "trait std::cmp::Ord").

[Source](../../src/alloc/vec/mod.rs.html#4200)[§](#method.partial_cmp)

#### fn [partial\_cmp](../cmp/trait.PartialOrd.html#tymethod.partial_cmp)(&self, other: &[Vec](struct.Vec.html "struct std::vec::Vec")<T, A2>) -> [Option](../option/enum.Option.html "enum std::option::Option")<[Ordering](../cmp/enum.Ordering.html "enum std::cmp::Ordering")\>

This method returns an ordering between `self` and `other` values if one exists. [Read more](../cmp/trait.PartialOrd.html#tymethod.partial_cmp)

1.0.0 · [Source](../../src/core/cmp.rs.html#1410)[§](#method.lt)

#### fn [lt](../cmp/trait.PartialOrd.html#method.lt)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests less than (for `self` and `other`) and is used by the `<` operator. [Read more](../cmp/trait.PartialOrd.html#method.lt)

1.0.0 · [Source](../../src/core/cmp.rs.html#1428)[§](#method.le)

#### fn [le](../cmp/trait.PartialOrd.html#method.le)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests less than or equal to (for `self` and `other`) and is used by the `<=` operator. [Read more](../cmp/trait.PartialOrd.html#method.le)

1.0.0 · [Source](../../src/core/cmp.rs.html#1446)[§](#method.gt)

#### fn [gt](../cmp/trait.PartialOrd.html#method.gt)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests greater than (for `self` and `other`) and is used by the `>` operator. [Read more](../cmp/trait.PartialOrd.html#method.gt)

1.0.0 · [Source](../../src/core/cmp.rs.html#1464)[§](#method.ge)

#### fn [ge](../cmp/trait.PartialOrd.html#method.ge)(&self, other: [&Rhs](../primitive.reference.html)) -> [bool](../primitive.bool.html)

Tests greater than or equal to (for `self` and `other`) and is used by the `>=` operator. [Read more](../cmp/trait.PartialOrd.html#method.ge)

1.66.0 · [Source](../../src/alloc/boxed/convert.rs.html#282)[§](#impl-TryFrom%3CVec%3CT%3E%3E-for-Box%3C%5BT;+N%5D%3E)

### impl<T, const N: [usize](../primitive.usize.html)\> [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<[Vec](struct.Vec.html "struct std::vec::Vec")<T>> for [Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T; N\]](../primitive.array.html)\>

[Source](../../src/alloc/boxed/convert.rs.html#303)[§](#method.try_from)

#### fn [try\_from](../convert/trait.TryFrom.html#tymethod.try_from)( vec: [Vec](struct.Vec.html "struct std::vec::Vec")<T>, ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T; N\]](../primitive.array.html)\>, <[Box](../boxed/struct.Box.html "struct std::boxed::Box")<[\[T; N\]](../primitive.array.html)\> as [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<[Vec](struct.Vec.html "struct std::vec::Vec")<T>>>::[Error](../convert/trait.TryFrom.html#associatedtype.Error "type std::convert::TryFrom::Error")\>

Attempts to convert a `Vec<T>` into a `Box<[T; N]>`.

Like [`Vec::into_boxed_slice`](struct.Vec.html#method.into_boxed_slice "method std::vec::Vec::into_boxed_slice"), this is in-place if `vec.capacity() == N`, but will require a reallocation otherwise.

##### [§](#errors-6)Errors

Returns the original `Vec<T>` in the `Err` variant if `boxed_slice.len()` does not equal `N`.

##### [§](#examples-200)Examples

This can be used with [`vec!`](../macro.vec.html "macro std::vec") to create an array on the heap:

```
let state: Box<[f32; 100]> = vec![1.0; 100].try_into().unwrap();
assert_eq!(state.len(), 100);
```

%5D%0Afn+main\(\)+%7B%0A++++let+state:+Box%3C%5Bf32;+100%5D%3E+=+vec!%5B1.0;+100%5D.try_into\(\).unwrap\(\);%0A++++assert_eq!\(state.len\(\),+100\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/boxed/convert.rs.html#283)[§](#associatedtype.Error)

#### type [Error](../convert/trait.TryFrom.html#associatedtype.Error) = [Vec](struct.Vec.html "struct std::vec::Vec")<T>

The type returned in the event of a conversion error.

1.48.0 · [Source](../../src/alloc/vec/mod.rs.html#4437)[§](#impl-TryFrom%3CVec%3CT,+A%3E%3E-for-%5BT;+N%5D)

### impl<T, A, const N: [usize](../primitive.usize.html)\> [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<[Vec](struct.Vec.html "struct std::vec::Vec")<T, A>> for [\[T; N\]](../primitive.array.html)

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[Source](../../src/alloc/vec/mod.rs.html#4466)[§](#method.try_from-2)

#### fn [try\_from](../convert/trait.TryFrom.html#tymethod.try_from)(vec: [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>) -> [Result](../result/enum.Result.html "enum std::result::Result")<[\[T; N\]](../primitive.array.html), [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>>

Gets the entire contents of the `Vec<T>` as an array, if its size exactly matches that of the requested array.

##### [§](#examples-202)Examples

```
assert_eq!(vec![1, 2, 3].try_into(), Ok([1, 2, 3]));
assert_eq!(<Vec<i32>>::new().try_into(), Ok([]));
```

%5D%0Afn+main\(\)+%7B%0A++++assert_eq!\(vec!%5B1,+2,+3%5D.try_into\(\),+Ok\(%5B1,+2,+3%5D\)\);%0A++++assert_eq!\(%3CVec%3Ci32%3E%3E::new\(\).try_into\(\),+Ok\(%5B%5D\)\);%0A%7D&edition=2024 "Run code")

If the length doesn’t match, the input comes back in `Err`:

```
let r: Result<[i32; 4], _> = (0..10).collect::<Vec<_>>().try_into();
assert_eq!(r, Err(vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
```

%5D%0Afn+main\(\)+%7B%0A++++let+r:+Result%3C%5Bi32;+4%5D,+_%3E+=+\(0..10\).collect::%3CVec%3C_%3E%3E\(\).try_into\(\);%0A++++assert_eq!\(r,+Err\(vec!%5B0,+1,+2,+3,+4,+5,+6,+7,+8,+9%5D\)\);%0A%7D&edition=2024 "Run code")

If you’re fine with just getting a prefix of the `Vec<T>`, you can call [`.truncate(N)`](struct.Vec.html#method.truncate "method std::vec::Vec::truncate") first.

```
let mut v = String::from("hello world").into_bytes();
v.sort();
v.truncate(2);
let [a, b]: [_; 2] = v.try_into().unwrap();
assert_eq!(a, b' ');
assert_eq!(b, b'd');
```

%5D%0Afn+main\(\)+%7B%0A++++let+mut+v+=+String::from\(%22hello+world%22\).into_bytes\(\);%0A++++v.sort\(\);%0A++++v.truncate\(2\);%0A++++let+%5Ba,+b%5D:+%5B_;+2%5D+=+v.try_into\(\).unwrap\(\);%0A++++assert_eq!\(a,+b'+'\);%0A++++assert_eq!\(b,+b'd'\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/vec/mod.rs.html#4438)[§](#associatedtype.Error-2)

#### type [Error](../convert/trait.TryFrom.html#associatedtype.Error) = [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

The type returned in the event of a conversion error.

1.87.0 · [Source](../../src/alloc/string.rs.html#3323)[§](#impl-TryFrom%3CVec%3Cu8%3E%3E-for-String)

### impl [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>> for [String](../string/struct.String.html "struct std::string::String")

[Source](../../src/alloc/string.rs.html#3335)[§](#method.try_from-1)

#### fn [try\_from](../convert/trait.TryFrom.html#tymethod.try_from)( bytes: [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>, ) -> [Result](../result/enum.Result.html "enum std::result::Result")<[String](../string/struct.String.html "struct std::string::String"), <[String](../string/struct.String.html "struct std::string::String") as [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<[Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html)\>>>::[Error](../convert/trait.TryFrom.html#associatedtype.Error "type std::convert::TryFrom::Error")\>

Converts the given [`Vec<u8>`](struct.Vec.html "struct std::vec::Vec") into a [`String`](../string/struct.String.html "struct std::string::String") if it contains valid UTF-8 data.

##### [§](#examples-201)Examples

```
let s1 = b"hello world".to_vec();
let v1 = String::try_from(s1).unwrap();
assert_eq!(v1, "hello world");
```

%5D%0Afn+main\(\)+%7B%0A++++let+s1+=+b%22hello+world%22.to_vec\(\);%0A++++let+v1+=+String::try_from\(s1\).unwrap\(\);%0A++++assert_eq!\(v1,+%22hello+world%22\);%0A%7D&edition=2024 "Run code")

[Source](../../src/alloc/string.rs.html#3324)[§](#associatedtype.Error-1)

#### type [Error](../convert/trait.TryFrom.html#associatedtype.Error) = [FromUtf8Error](../string/struct.FromUtf8Error.html "struct std::string::FromUtf8Error")

The type returned in the event of a conversion error.

1.0.0 · [Source](../../src/std/io/impls.rs.html#480-518)[§](#impl-Write-for-Vec%3Cu8,+A%3E)

### impl<A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator")\> [Write](../io/trait.Write.html "trait std::io::Write") for [Vec](struct.Vec.html "struct std::vec::Vec")<[u8](../primitive.u8.html), A>

Write is implemented for `Vec<u8>` by appending to the vector. The vector will grow as needed.

[Source](../../src/std/io/impls.rs.html#482-485)[§](#method.write)

#### fn [write](../io/trait.Write.html#tymethod.write)(&mut self, buf: &\[[u8](../primitive.u8.html)\]) -> [Result](../io/type.Result.html "type std::io::Result")<[usize](../primitive.usize.html)\>

Writes a buffer into this writer, returning how many bytes were written. [Read more](../io/trait.Write.html#tymethod.write)

[Source](../../src/std/io/impls.rs.html#488-495)[§](#method.write_vectored)

#### fn [write\_vectored](../io/trait.Write.html#method.write_vectored)(&mut self, bufs: &\[[IoSlice](../io/struct.IoSlice.html "struct std::io::IoSlice")<'\_>\]) -> [Result](../io/type.Result.html "type std::io::Result")<[usize](../primitive.usize.html)\>

Like [`write`](../io/trait.Write.html#tymethod.write "method std::io::Write::write"), except that it writes from a slice of buffers. [Read more](../io/trait.Write.html#method.write_vectored)

[Source](../../src/std/io/impls.rs.html#498-500)[§](#method.is_write_vectored)

#### fn [is\_write\_vectored](../io/trait.Write.html#method.is_write_vectored)(&self) -> [bool](../primitive.bool.html)

🔬This is a nightly-only experimental API. (`can_vector` [#69941](https://github.com/rust-lang/rust/issues/69941))

Determines if this `Write`r has an efficient [`write_vectored`](../io/trait.Write.html#method.write_vectored "method std::io::Write::write_vectored") implementation. [Read more](../io/trait.Write.html#method.is_write_vectored)

[Source](../../src/std/io/impls.rs.html#503-506)[§](#method.write_all)

#### fn [write\_all](../io/trait.Write.html#method.write_all)(&mut self, buf: &\[[u8](../primitive.u8.html)\]) -> [Result](../io/type.Result.html "type std::io::Result")<[()](../primitive.unit.html)\>

Attempts to write an entire buffer into this writer. [Read more](../io/trait.Write.html#method.write_all)

[Source](../../src/std/io/impls.rs.html#509-512)[§](#method.write_all_vectored)

#### fn [write\_all\_vectored](../io/trait.Write.html#method.write_all_vectored)(&mut self, bufs: &mut \[[IoSlice](../io/struct.IoSlice.html "struct std::io::IoSlice")<'\_>\]) -> [Result](../io/type.Result.html "type std::io::Result")<[()](../primitive.unit.html)\>

🔬This is a nightly-only experimental API. (`write_all_vectored` [#70436](https://github.com/rust-lang/rust/issues/70436))

Attempts to write multiple buffers into this writer. [Read more](../io/trait.Write.html#method.write_all_vectored)

[Source](../../src/std/io/impls.rs.html#515-517)[§](#method.flush)

#### fn [flush](../io/trait.Write.html#tymethod.flush)(&mut self) -> [Result](../io/type.Result.html "type std::io::Result")<[()](../primitive.unit.html)\>

Flushes this output stream, ensuring that all intermediately buffered contents reach their destination. [Read more](../io/trait.Write.html#tymethod.flush)

1.0.0 · [Source](../../src/std/io/mod.rs.html#1990-1996)[§](#method.write_fmt)

#### fn [write\_fmt](../io/trait.Write.html#method.write_fmt)(&mut self, args: [Arguments](../fmt/struct.Arguments.html "struct std::fmt::Arguments")<'\_>) -> [Result](../io/type.Result.html "type std::io::Result")<[()](../primitive.unit.html)\>

Writes a formatted string into this writer, returning any error encountered. [Read more](../io/trait.Write.html#method.write_fmt)

1.0.0 · [Source](../../src/std/io/mod.rs.html#2020-2025)[§](#method.by_ref)

#### fn [by\_ref](../io/trait.Write.html#method.by_ref)(&mut self) -> &mut Self

where Self: [Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

Creates a “by reference” adapter for this instance of `Write`. [Read more](../io/trait.Write.html#method.by_ref)

[Source](../../src/alloc/vec/mod.rs.html#3742)[§](#impl-DerefPure-for-Vec%3CT,+A%3E)

### impl<T, A> [DerefPure](../ops/trait.DerefPure.html "trait std::ops::DerefPure") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

1.0.0 · [Source](../../src/alloc/vec/mod.rs.html#4206)[§](#impl-Eq-for-Vec%3CT,+A%3E)

### impl<T, A> [Eq](../cmp/trait.Eq.html "trait std::cmp::Eq") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where T: [Eq](../cmp/trait.Eq.html "trait std::cmp::Eq"), A: [Allocator](../alloc/trait.Allocator.html "trait std::alloc::Allocator"),

[§](#impl-Freeze-for-Vec%3CT,+A%3E)

### impl<T, A> [Freeze](../marker/trait.Freeze.html "trait std::marker::Freeze") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Freeze](../marker/trait.Freeze.html "trait std::marker::Freeze"),

[§](#impl-RefUnwindSafe-for-Vec%3CT,+A%3E)

### impl<T, A> [RefUnwindSafe](../panic/trait.RefUnwindSafe.html "trait std::panic::RefUnwindSafe") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [RefUnwindSafe](../panic/trait.RefUnwindSafe.html "trait std::panic::RefUnwindSafe"), T: [RefUnwindSafe](../panic/trait.RefUnwindSafe.html "trait std::panic::RefUnwindSafe"),

[§](#impl-Send-for-Vec%3CT,+A%3E)

### impl<T, A> [Send](../marker/trait.Send.html "trait std::marker::Send") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Send](../marker/trait.Send.html "trait std::marker::Send"), T: [Send](../marker/trait.Send.html "trait std::marker::Send"),

[§](#impl-Sync-for-Vec%3CT,+A%3E)

### impl<T, A> [Sync](../marker/trait.Sync.html "trait std::marker::Sync") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Sync](../marker/trait.Sync.html "trait std::marker::Sync"), T: [Sync](../marker/trait.Sync.html "trait std::marker::Sync"),

[§](#impl-Unpin-for-Vec%3CT,+A%3E)

### impl<T, A> [Unpin](../marker/trait.Unpin.html "trait std::marker::Unpin") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [Unpin](../marker/trait.Unpin.html "trait std::marker::Unpin"), T: [Unpin](../marker/trait.Unpin.html "trait std::marker::Unpin"),

[§](#impl-UnsafeUnpin-for-Vec%3CT,+A%3E)

### impl<T, A> [UnsafeUnpin](../marker/trait.UnsafeUnpin.html "trait std::marker::UnsafeUnpin") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [UnsafeUnpin](../marker/trait.UnsafeUnpin.html "trait std::marker::UnsafeUnpin"),

[§](#impl-UnwindSafe-for-Vec%3CT,+A%3E)

### impl<T, A> [UnwindSafe](../panic/trait.UnwindSafe.html "trait std::panic::UnwindSafe") for [Vec](struct.Vec.html "struct std::vec::Vec")<T, A>

where A: [UnwindSafe](../panic/trait.UnwindSafe.html "trait std::panic::UnwindSafe"), T: [UnwindSafe](../panic/trait.UnwindSafe.html "trait std::panic::UnwindSafe"),

[Source](../../src/core/any.rs.html#141)[§](#impl-Any-for-T)

### impl<T> [Any](../any/trait.Any.html "trait std::any::Any") for T

where T: 'static + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

[Source](../../src/core/any.rs.html#142)[§](#method.type_id)

#### fn [type\_id](../any/trait.Any.html#tymethod.type_id)(&self) -> [TypeId](../any/struct.TypeId.html "struct std::any::TypeId")

Gets the `TypeId` of `self`. [Read more](../any/trait.Any.html#tymethod.type_id)

[Source](../../src/core/borrow.rs.html#212)[§](#impl-Borrow%3CT%3E-for-T)

### impl<T> [Borrow](../borrow/trait.Borrow.html "trait std::borrow::Borrow")<T> for T

where T: ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

[Source](../../src/core/borrow.rs.html#214)[§](#method.borrow-1)

#### fn [borrow](../borrow/trait.Borrow.html#tymethod.borrow)(&self) -> [&T](../primitive.reference.html)

Immutably borrows from an owned value. [Read more](../borrow/trait.Borrow.html#tymethod.borrow)

[Source](../../src/core/borrow.rs.html#221)[§](#impl-BorrowMut%3CT%3E-for-T)

### impl<T> [BorrowMut](../borrow/trait.BorrowMut.html "trait std::borrow::BorrowMut")<T> for T

where T: ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

[Source](../../src/core/borrow.rs.html#222)[§](#method.borrow_mut-1)

#### fn [borrow\_mut](../borrow/trait.BorrowMut.html#tymethod.borrow_mut)(&mut self) -> [&mut T](../primitive.reference.html)

Mutably borrows from an owned value. [Read more](../borrow/trait.BorrowMut.html#tymethod.borrow_mut)

[Source](../../src/core/clone.rs.html#547)[§](#impl-CloneToUninit-for-T)

### impl<T> [CloneToUninit](../clone/trait.CloneToUninit.html "trait std::clone::CloneToUninit") for T

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/core/clone.rs.html#549)[§](#method.clone_to_uninit)

#### unsafe fn [clone\_to\_uninit](../clone/trait.CloneToUninit.html#tymethod.clone_to_uninit)(&self, dest: [\*mut](../primitive.pointer.html) [u8](../primitive.u8.html))

🔬This is a nightly-only experimental API. (`clone_to_uninit` [#126799](https://github.com/rust-lang/rust/issues/126799))

Performs copy-assignment from `self` to `dest`. [Read more](../clone/trait.CloneToUninit.html#tymethod.clone_to_uninit)

[Source](../../src/core/convert/mod.rs.html#785)[§](#impl-From%3CT%3E-for-T)

### impl<T> [From](../convert/trait.From.html "trait std::convert::From")<T> for T

[Source](../../src/core/convert/mod.rs.html#788)[§](#method.from-21)

#### fn [from](../convert/trait.From.html#tymethod.from)(t: T) -> T

Returns the argument unchanged.

[Source](../../src/core/convert/mod.rs.html#767-769)[§](#impl-Into%3CU%3E-for-T)

### impl<T, U> [Into](../convert/trait.Into.html "trait std::convert::Into")<U> for T

where U: [From](../convert/trait.From.html "trait std::convert::From")<T>,

[Source](../../src/core/convert/mod.rs.html#777)[§](#method.into)

#### fn [into](../convert/trait.Into.html#tymethod.into)(self) -> U

Calls `U::from(self)`.

That is, this conversion is whatever the implementation of `[From](../convert/trait.From.html "trait std::convert::From")<T> for U` chooses to do.

[Source](../../src/core/ops/deref.rs.html#378-380)[§](#impl-Receiver-for-P)

### impl<P, T> [Receiver](../ops/trait.Receiver.html "trait std::ops::Receiver") for P

where P: [Deref](../ops/trait.Deref.html "trait std::ops::Deref")<Target = T> + ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"), T: ?[Sized](../marker/trait.Sized.html "trait std::marker::Sized"),

[Source](../../src/core/ops/deref.rs.html#382)[§](#associatedtype.Target-1)

#### type [Target](../ops/trait.Receiver.html#associatedtype.Target) = T

🔬This is a nightly-only experimental API. (`arbitrary_self_types` [#44874](https://github.com/rust-lang/rust/issues/44874))

The target type on which the method may be called.

[Source](../../src/alloc/borrow.rs.html#72-74)[§](#impl-ToOwned-for-T)

### impl<T> [ToOwned](../borrow/trait.ToOwned.html "trait std::borrow::ToOwned") for T

where T: [Clone](../clone/trait.Clone.html "trait std::clone::Clone"),

[Source](../../src/alloc/borrow.rs.html#76)[§](#associatedtype.Owned)

#### type [Owned](../borrow/trait.ToOwned.html#associatedtype.Owned) = T

The resulting type after obtaining ownership.

[Source](../../src/alloc/borrow.rs.html#77)[§](#method.to_owned)

#### fn [to\_owned](../borrow/trait.ToOwned.html#tymethod.to_owned)(&self) -> T

Creates owned data from borrowed data, usually by cloning. [Read more](../borrow/trait.ToOwned.html#tymethod.to_owned)

[Source](../../src/alloc/borrow.rs.html#81)[§](#method.clone_into)

#### fn [clone\_into](../borrow/trait.ToOwned.html#method.clone_into)(&self, target: [&mut T](../primitive.reference.html))

Uses borrowed data to replace owned data, usually by cloning. [Read more](../borrow/trait.ToOwned.html#method.clone_into)

[Source](../../src/core/convert/mod.rs.html#827-829)[§](#impl-TryFrom%3CU%3E-for-T)

### impl<T, U> [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<U> for T

where U: [Into](../convert/trait.Into.html "trait std::convert::Into")<T>,

[Source](../../src/core/convert/mod.rs.html#831)[§](#associatedtype.Error-4)

#### type [Error](../convert/trait.TryFrom.html#associatedtype.Error) = [Infallible](../convert/enum.Infallible.html "enum std::convert::Infallible")

The type returned in the event of a conversion error.

[Source](../../src/core/convert/mod.rs.html#834)[§](#method.try_from-3)

#### fn [try\_from](../convert/trait.TryFrom.html#tymethod.try_from)(value: U) -> [Result](../result/enum.Result.html "enum std::result::Result")<T, <T as [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<U>>::[Error](../convert/trait.TryFrom.html#associatedtype.Error "type std::convert::TryFrom::Error")\>

Performs the conversion.

[Source](../../src/core/convert/mod.rs.html#811-813)[§](#impl-TryInto%3CU%3E-for-T)

### impl<T, U> [TryInto](../convert/trait.TryInto.html "trait std::convert::TryInto")<U> for T

where U: [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<T>,

[Source](../../src/core/convert/mod.rs.html#815)[§](#associatedtype.Error-3)

#### type [Error](../convert/trait.TryInto.html#associatedtype.Error) = <U as [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<T>>::[Error](../convert/trait.TryFrom.html#associatedtype.Error "type std::convert::TryFrom::Error")

The type returned in the event of a conversion error.

[Source](../../src/core/convert/mod.rs.html#818)[§](#method.try_into)

#### fn [try\_into](../convert/trait.TryInto.html#tymethod.try_into)(self) -> [Result](../result/enum.Result.html "enum std::result::Result")<U, <U as [TryFrom](../convert/trait.TryFrom.html "trait std::convert::TryFrom")<T>>::[Error](../convert/trait.TryFrom.html#associatedtype.Error "type std::convert::TryFrom::Error")\>

Performs the conversion.
