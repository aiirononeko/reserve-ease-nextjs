'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const containerValiants = cva('flex h-6 items-center space-x-2')

const spanVariants = cva(
  'rounded-xl bg-destructive px-2 py-0.5 text-center text-[10px] font-bold text-destructive-foreground',
)

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <div className={containerValiants()}>
    {props['aria-required'] && <span className={spanVariants()}>必須</span>}
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  </div>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
