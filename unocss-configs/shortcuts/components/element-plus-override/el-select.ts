export const elSelect = {
  'el-select__input': `
    border-0
    bg-transparent
    text-gray
    w-full
    outline-none
  `,
  'el-select': `w-full
  `,
  'el-select__wrapper': `
    lg:[&[tabindex]]-h-form-item-lg
    md:[&[tabindex]]-h-form-item-md
    sm:[&[tabindex]]-h-form-item-sm
    xs:[&[tabindex]]-h-form-item-sm
    flex
    bg-white
    border-0
    rounded-16px
    px-17px
    items-center
    gap-12px
  `,
  'el-select__selection': `
    flex-grow
    relative
  `,
  'el-select__placeholder': `
    absolute
    top-0
    h-full
    flex
    items-center
    text-lg sm:text-sm
    text-gray-200
  `,
  'el-select__suffix': `
    w-1em h-1em text-gray relative
    [&_.is-reverse_svg]:duration-100 [&_.is-reverse_svg]:rotate-180
    [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-[currentColor]
    ![&_.el-button]:border-0
  `,
  'el-select-dropdown': `
  [&_ul]:p-0 [&_ul]:m-0 [&_ul]:flex [&_ul]:flex-col [&_ul]:bg-background [&_ul]:gap-2px [&_ul]:px-2px [&_ul]:py-1px
  [&_li]:list-none [&_li]:h-2em [&_li]:leading-2em [&_li]:px-10px [&_li]:bg-white
  `,
};
