/// LICENSE START
////////////////////////////////////////////////////////////////////////////////////
//
// This file is part of the CLU Library.
//
// 
// Copyright (C) 1997-2004  Christian B.U. Perwass
//
//    This program is free software; you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation; either version 2 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program; if not, write to the Free Software
//    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//
// The GNU Library General Public License can be found in the file
// license.txt distributed with this library.
//
// Please send all queries and comments to
//
// email: help@clucalc.info
// mail: Institut fuer Informatik, Olshausenstr. 40, 24098 Kiel, Germany.
//
////////////////////////////////////////////////////////////////////////////////////
/// LICENSE END

// Tensor Single Loop Library declaration

#ifndef _TENSOR_CONTRACT_LOOP_HH_
#define _TENSOR_CONTRACT_LOOP_HH_

#include <map>

#include "mem.h"
#include "makestr.h"
#include "cstr.h"
#include "mathelp.h"
#include "CLUException.h"
#include "TensorData.h"
#include "TensorIdx.h"
#include "TensorDoubleLoop.h"

using std::map;


template<class CType>
class CTensorContractLoop : public CTensorDoubleLoop<CType>
{
public:
	enum EConstants { MIN_CONTRACT_IDX = -255 };

public:
	CTensorContractLoop();

	// Set Tensor Idx over which to loop
	void Set(CTensorData<CType>& rTResult, CTensorIdx<CType>& rTLeft, CTensorIdx<CType>& rTRight) throw (CCLUException);

	// Initialize Loops. Returns number of cascaded loops.
	int Init() throw (CCLUException);

	// Step loop. Returns loop level, in which step was made.
	// Loop level starts at maximum for most inner loop (same value as returned from Init()).
	// If loop level is zero, all loops are finished.
	// No exceptions generated by this function!
	int Step();

	// Get number of steps at particular loop level.
	int StepCount(int iLevel) throw (CCLUException) { return CTensorDoubleLoop<CType>::StepCount(iLevel); }

	// Returns true if both loops are stepped at given loop level
	bool IsDoubleLoop(int iLevel) throw (CCLUException) { return CTensorDoubleLoop<CType>::IsDoubleLoop(iLevel); }

	// Get Reference to current element of result tensor in loop
	CType& GetResultRef() { return m_ResultTIdx.GetStepRef(); }

	// Get resultant tensor index
	const CTensorIdx<CType>& GetResultTensorIdx() { return m_ResultTIdx; }

protected:
	CTensorIdx<CType> m_ResultTIdx;
};


#endif