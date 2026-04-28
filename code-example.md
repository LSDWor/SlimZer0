# LLM-Generated Code Examples

## Python Example: Fibonacci Sequence

```python
# LLM-generated example: Fibonacci sequence generator
def fibonacci(n: int):
    """Generate Fibonacci sequence up to n terms."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

if __name__ == "__main__":
    for num in fibonacci(10):
        print(num)
```

## JavaScript Example: Closure Counter

```javascript
// LLM-generated example: counter using closure
function createCounter() {
    let count = 0;
    return function() {
        count += 1;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Notes

These examples are regenerated periodically to ensure consistent implementation patterns across the project.