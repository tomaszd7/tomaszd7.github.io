
<link rel="stylesheet" type="text/css" href="style.css"> 

<body>
	

	<div class="game">
	<div class="wrapper-game">
		<table>
			<thead>
				<tr>
				<!-- adding th row  -->
				<?php 
				for ($i=0; $i <=9 ; $i++) { 
					if ($i == 0 || $i == 9) {
						echo '<th></th>';
					} else {
						echo '<th>' . $i . '</th>';
					}

				}
				 ?>
				</tr>
			</thead>
			<tbody>

				<?php 
				/*adding 8 rows of fields */
				for ($y=1; $y <= 8 ; $y++) { 
					echo '<tr>';
					echo '<td>' . strval(8 - $y + 1) . '</td>';

					/*add 8 rows body cells */
					for ($x=1; $x <= 8; $x++) { 
						// echo '<td></td>';
						if ($y % 2 == 1) { /*biale zaczynaja z lewej */
							if ($x % 2 == 1) {
								echo '<td id=\'' . strval($x) . '-' . strval(8 - $y + 1) .'\' class=\'white\'></td>';
							} else {
								echo '<td id=\'' . strval($x) . '-' . strval(8 - $y + 1) .'\' class=\'black\'></td>';
							}
						} else { /*czarne zaczynaja */
							if ($x % 2 == 1) {
								echo '<td id=\'' . strval($x) . '-' . strval(8 - $y + 1) .'\' class=\'black\'></td>';
							} else {
								echo '<td id=\'' . strval($x) . '-' . strval(8 - $y + 1) .'\' class=\'white\'></td>';
							}
						}
					};
					echo '<td>' . strval(8 - $y + 1) . '</td>';

					echo '</tr>';
				}

				/* add last line of numbers */
				echo '<tr class=\'last-row\'>';
				for ($i=0; $i <=9 ; $i++) { 
					if ($i == 0 || $i == 9) {
						echo '<td></td>';
					} else {
						echo '<td>' . $i . '</td>';
					}
				}
				echo '</tr>';

				 ?>

			</tbody>
		</table>

	</div>
</div><!-- END GAME div -->



</body>