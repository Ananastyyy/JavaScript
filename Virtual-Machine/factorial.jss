set 101
const 100 1
mul 101 100 103
func ifeq 101 100 goto out
diff 101 100 102
mul 103 102 103
diff 101 100 101
goto ifeq
func out 103
exit