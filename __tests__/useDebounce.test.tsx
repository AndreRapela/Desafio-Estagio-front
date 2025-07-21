import { renderHook, act } from "@testing-library/react"
import { useDebounce } from "@/hooks/use-debounce"
import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals"

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500))

    expect(result.current).toBe("initial")
  })

  test("debounces value changes", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    })

    expect(result.current).toBe("initial")

    // Change the value
    rerender({ value: "updated", delay: 500 })

    // Value should not change immediately
    expect(result.current).toBe("initial")

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now the value should be updated
    expect(result.current).toBe("updated")
  })

  test("resets timer on rapid changes", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    })

    // Change value multiple times rapidly
    rerender({ value: "change1", delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: "change2", delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: "final", delay: 500 })

    // Should still be initial value
    expect(result.current).toBe("initial")

    // Complete the debounce period
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should now be the final value
    expect(result.current).toBe("final")
  })
})
