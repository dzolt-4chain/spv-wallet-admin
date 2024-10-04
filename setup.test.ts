import { expect } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend({ toMatchImageSnapshot });

expect.extend(matchers);
