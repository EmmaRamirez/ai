fn main() {
    let mut vec = Vec::with_capacity(4);
    let x = false;
    if x {
        vec.push("yup");
    } else {
        vec.push("nope");
    }
    println!("hello, world");
    println!("{:?}", vec[0]);   
}