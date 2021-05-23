(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (memory $0 0)
 (export "add" (func $assembly/index/add))
 (export "factorial" (func $assembly/index/factorial))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/index/factorial (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
   i32.const 1
   i32.sub
   call $assembly/index/factorial
   local.get $0
   i32.mul
  else
   i32.const 1
  end
 )
)
