export default {
  'radio-group':
    'flex flex-col gap-2.5 [&_[item-wrap]]:radio-group-item-wrap [&_[item]]:radio-group-item [&_[indicator]]:radio-group-indicator [&_[label]]:radio-group-label',
  'radio-group-item-wrap': 'flex items-center',
  'radio-group-item':
    'px-0 bg-white w-[1.125rem] h-[1.125rem] rounded-full border-0 data-[active=true]:border-primary data-[active=true]:bg-primary dark:data-[active=true]:bg-white shadow-sm shadow-[0_0_0_1px] shadow-stone outline-none cursor-default',
  'radio-group-indicator': `flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-stone-700 dark:after:bg-stone-700`,
  'radio-group-label': 'text-stone-700 dark:text-white text-sm leading-none pl-1 flex items-center vertical-middle gap-1',
};
