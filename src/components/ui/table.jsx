import * as React from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg border [-webkit-overflow-scrolling:touch]">
      <table
        data-slot="table"
        className={cn(
          "w-full min-w-max border-collapse caption-bottom text-sm",
          className,
        )}
        {...props}
      />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent md:hidden" />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/40 [&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        `
        border-b
        transition-colors
        hover:bg-muted/50
        even:bg-muted/20
        data-[state=selected]:bg-muted
        `,
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `
        h-11
        px-3
        py-2
        text-left
        align-middle
        font-semibold
        whitespace-nowrap
        text-foreground

        first:pl-4
        last:pr-4

        [&:has([role=checkbox])]:pr-0
        `,
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        `
        px-3
        py-3
        align-middle
        whitespace-nowrap

        first:pl-4
        last:pr-4

        [&:has([role=checkbox])]:pr-0
        `,
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
