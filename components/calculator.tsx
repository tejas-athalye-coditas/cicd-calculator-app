"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Operation = "+" | "-" | "×" | "÷" | null

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay("0.")
      setShouldResetDisplay(false)
    } else if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleOperation = (op: Operation) => {
    const currentValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "×":
        return a * b
      case "÷":
        return a / b
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = Number.parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const handlePercentage = () => {
    const currentValue = Number.parseFloat(display)
    setDisplay(String(currentValue / 100))
  }

  const handleToggleSign = () => {
    const currentValue = Number.parseFloat(display)
    setDisplay(String(currentValue * -1))
  }

  return (
    <Card className="w-full max-w-sm p-6 shadow-2xl">
      <div className="space-y-4">
        <div className="text-center pb-2 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">Calculator</h1>
        </div>

        {/* Display */}
        <div className="bg-card rounded-lg p-6 min-h-24 flex flex-col items-end justify-end border border-border">
          <div className="text-sm font-mono text-muted-foreground h-6 mb-2">
            {previousValue !== null && operation ? `${previousValue} ${operation}` : "\u00A0"}
          </div>
          <div className="text-5xl font-mono font-semibold text-foreground text-right break-all">{display}</div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button variant="secondary" size="lg" onClick={handleClear} className="text-lg font-semibold h-16">
            AC
          </Button>
          <Button variant="secondary" size="lg" onClick={handleToggleSign} className="text-lg font-semibold h-16">
            +/−
          </Button>
          <Button variant="secondary" size="lg" onClick={handlePercentage} className="text-lg font-semibold h-16">
            %
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleOperation("÷")}
            className="text-lg font-semibold h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button variant="outline" size="lg" onClick={() => handleNumber("7")} className="text-lg font-semibold h-16">
            7
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("8")} className="text-lg font-semibold h-16">
            8
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("9")} className="text-lg font-semibold h-16">
            9
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleOperation("×")}
            className="text-lg font-semibold h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button variant="outline" size="lg" onClick={() => handleNumber("4")} className="text-lg font-semibold h-16">
            4
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("5")} className="text-lg font-semibold h-16">
            5
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("6")} className="text-lg font-semibold h-16">
            6
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleOperation("-")}
            className="text-lg font-semibold h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button variant="outline" size="lg" onClick={() => handleNumber("1")} className="text-lg font-semibold h-16">
            1
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("2")} className="text-lg font-semibold h-16">
            2
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNumber("3")} className="text-lg font-semibold h-16">
            3
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleOperation("+")}
            className="text-lg font-semibold h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleNumber("0")}
            className="text-lg font-semibold h-16 col-span-2"
          >
            0
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDecimal}
            className="text-lg font-semibold h-16 bg-transparent"
          >
            .
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleEquals}
            className="text-lg font-semibold h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            =
          </Button>
        </div>
      </div>
    </Card>
  )
}
