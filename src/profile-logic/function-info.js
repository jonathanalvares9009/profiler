/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

/**
 * Strip any function arguments from the given string.
 *
 * If the function fails to determine that there are any parentheses to strip
 * it will return the original string.
 */
export function stripFunctionArguments(functionCall: string): string {
  // Remove known data that can appear at the end of the string
  const s = functionCall.replace(/ \[clone [^]+\]$/, '').replace(/ const$/, '');
  if (s[s.length - 1] !== ')') {
    return functionCall;
  }

  // Start from the right parenthesis at the end of the string and
  // then iterate towards the beginning until we find the matching
  // left parenthesis.
  let depth = 0;
  for (let i = s.length - 1; i > 0; i--) {
    if (s[i] === ')') {
      depth++;
    } else if (s[i] === '(') {
      depth--;
      if (depth === 0) {
        return functionCall.substr(0, i);
      }
    }
  }
  return functionCall;
}
