function serialize(numbers) {
    numbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
    if (numbers.length === 0) return "";

    let result = [];
    let start = numbers[0];
    let end = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === end + 1) {
            end = numbers[i];
        } else {
            if (start === end) {
                result.push(String(start));
            } else {
                result.push(`${start}-${end}`);
            }
            start = end = numbers[i];
        }
    }

    if (start === end) {
        result.push(String(start));
    } else {
        result.push(`${start}-${end}`);
    }

    return result.join(",");
}

function deserialize(s) {
    if (!s) return [];

    let result = [];
    for (let part of s.split(",")) {
        if (part.includes("-")) {
            let [start, end] = part.split("-").map(Number);
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
        } else {
            result.push(Number(part));
        }
    }
    return result;
}

function testCompression(name, numbers) {
    const serialized = serialize(numbers);
    const deserialized = deserialize(serialized);

    const uniqueSorted = Array.from(new Set(numbers)).sort((a, b) => a - b);
    const originalString = uniqueSorted.join(",");

    const originalLength = originalString.length;
    const compressedLength = serialized.length;
    const ratio = compressedLength / originalLength;
    const saved = ((1 - ratio) * 100).toFixed(1);

    console.log(`--- ${name} ---`);
    console.log(`Original:    ${originalString.slice(0, 100)}${originalString.length > 100 ? "..." : ""}`);
    console.log(`Serialized:  ${serialized.slice(0, 100)}${serialized.length > 100 ? "..." : ""}`);
    console.log(`Original length:   ${originalLength}`);
    console.log(`Serialized length: ${compressedLength}`);
    console.log(`Compression ratio: ${ratio.toFixed(2)} (${saved}% saved)`);
    console.log(`Deserialization correct:`, JSON.stringify(deserialized) === JSON.stringify(uniqueSorted) ? "True" : "False");
    console.log();
}

testCompression("Простой пример", [1, 2, 3, 5, 7, 8, 9]);
testCompression("Все числа 1–300", Array.from({ length: 300 }, (_, i) => i + 1));
testCompression("Случайные 50 чисел", Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1));
testCompression("Каждое число по 3 раза (900 чисел)", Array.from({ length: 300 }, (_, i) => [i + 1, i + 1, i + 1]).flat());
