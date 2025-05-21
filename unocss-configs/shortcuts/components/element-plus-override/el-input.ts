export const elInput = {
  'el-input': `!w-full
    [&_.el-input__inner]:border-0
    [&_.el-input__inner]:bg-transparent
    [&_.el-input__inner]:flex-grow
    [&_.el-input__wrapper]:flex
    [&_.el-input__wrapper]:bg-transparent
    [&_.el-input__wrapper]:border-0
  `,
  'el-input__inner': `
    border-0
    bg-transparent
    flex-grow
    outline-none
    !text-lg !sm:text-sm

  `,
  'el-input__wrapper': `
    flex
    bg-transparent
    lg:h-form-item-lg md:h-form-item-md sm:h-form-item-sm xs:h-form-item-sm
    !rounded-0
    px-17px
    items-center
    gap-12px

  `,
};
